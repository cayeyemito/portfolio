provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
  # Shared keys are disabled on every storage account: data plane calls
  # (static website settings) go with the caller's Entra ID identity.
  storage_use_azuread = true
}

provider "azuread" {}

# Who runs Terraform (az login locally, the plan identity in CI).
data "azuread_client_config" "current" {}

locals {
  tags = {
    project    = var.project
    managed_by = "terraform"
    repository = var.github_repository
  }

  # Storage account names are global: 3-24 lowercase letters and digits.
  site_account_name = "st${var.project}${substr(replace(var.subscription_id, "-", ""), 0, 8)}"

  tfstate_account_id = "/subscriptions/${var.subscription_id}/resourceGroups/${var.tfstate_resource_group}/providers/Microsoft.Storage/storageAccounts/${var.tfstate_storage_account}"

  github_issuer   = "https://token.actions.githubusercontent.com"
  github_audience = "api://AzureADTokenExchange"
}

resource "azurerm_resource_group" "site" {
  name     = "rg-${var.project}"
  location = var.location
  tags     = local.tags
}

# -----------------------------------------------------------------------------
# Site: storage account with the static website feature. Files go to the $web
# container and are served at https://<account>.<zone>.web.core.windows.net
# with index.html in every folder and 404.html for missing paths.
# -----------------------------------------------------------------------------

resource "azurerm_storage_account" "site" {
  name                            = local.site_account_name
  resource_group_name             = azurerm_resource_group.site.name
  location                        = azurerm_resource_group.site.location
  account_tier                    = "Standard"
  account_replication_type        = "LRS"
  account_kind                    = "StorageV2"
  https_traffic_only_enabled      = true
  min_tls_version                 = "TLS1_2"
  shared_access_key_enabled       = false
  default_to_oauth_authentication = true
  # Blob API stays private; the site is public only through the web endpoint.
  allow_nested_items_to_be_public = false
  tags                            = local.tags
}

# Whoever applies Terraform needs data plane access to configure the static
# website, since there are no account keys to fall back to.
resource "azurerm_role_assignment" "operator_site_data" {
  scope                = azurerm_storage_account.site.id
  role_definition_name = "Storage Blob Data Contributor"
  principal_id         = data.azuread_client_config.current.object_id
}

resource "azurerm_storage_account_static_website" "site" {
  storage_account_id = azurerm_storage_account.site.id
  index_document     = "index.html"
  error_404_document = "404.html"

  depends_on = [azurerm_role_assignment.operator_site_data]
}

# -----------------------------------------------------------------------------
# Access logs: every read of the site lands in Log Analytics (StorageBlobLogs
# table), where site_health.py and logs.sh query 4xx/5xx with KQL.
# -----------------------------------------------------------------------------

resource "azurerm_log_analytics_workspace" "site" {
  name                = "log-${var.project}"
  resource_group_name = azurerm_resource_group.site.name
  location            = azurerm_resource_group.site.location
  sku                 = "PerGB2018"
  retention_in_days   = var.log_retention_days
  # Cost guard: ingestion stops for the day after 100 MB.
  daily_quota_gb = 0.1
  tags           = local.tags
}

resource "azurerm_monitor_diagnostic_setting" "site_reads" {
  name                       = "access-logs"
  target_resource_id         = "${azurerm_storage_account.site.id}/blobServices/default"
  log_analytics_workspace_id = azurerm_log_analytics_workspace.site.id

  enabled_log {
    category = "StorageRead"
  }
}

# -----------------------------------------------------------------------------
# GitHub Actions sign-in with OIDC: no secrets stored in GitHub. Each workflow
# gets a short-lived token from GitHub, and Entra ID exchanges it only when the
# repository and branch match a federated credential.
# -----------------------------------------------------------------------------

# Deploy and health workflows: pushes to main only.
resource "azuread_application" "deploy" {
  display_name = "${var.project}-github-deploy"
  owners       = [data.azuread_client_config.current.object_id]
}

resource "azuread_service_principal" "deploy" {
  client_id = azuread_application.deploy.client_id
  owners    = [data.azuread_client_config.current.object_id]
}

resource "azuread_application_federated_identity_credential" "deploy_main" {
  application_id = azuread_application.deploy.id
  display_name   = "github-main"
  issuer         = local.github_issuer
  audiences      = [local.github_audience]
  subject        = "repo:${var.github_repository}:ref:refs/heads/main"
}

# Upload the site and the /status report to $web, nothing else.
resource "azurerm_role_assignment" "deploy_site_data" {
  scope                = azurerm_storage_account.site.id
  role_definition_name = "Storage Blob Data Contributor"
  principal_id         = azuread_service_principal.deploy.object_id
}

# The health check reads the access logs.
resource "azurerm_role_assignment" "deploy_logs_reader" {
  scope                = azurerm_log_analytics_workspace.site.id
  role_definition_name = "Log Analytics Reader"
  principal_id         = azuread_service_principal.deploy.object_id
}

# Terraform plan on pull requests: read-only.
resource "azuread_application" "plan" {
  display_name = "${var.project}-github-plan"
  owners       = [data.azuread_client_config.current.object_id]
}

resource "azuread_service_principal" "plan" {
  client_id = azuread_application.plan.client_id
  owners    = [data.azuread_client_config.current.object_id]
}

resource "azuread_application_federated_identity_credential" "plan_pull_request" {
  application_id = azuread_application.plan.id
  display_name   = "github-pull-request"
  issuer         = local.github_issuer
  audiences      = [local.github_audience]
  subject        = "repo:${var.github_repository}:pull_request"
}

resource "azurerm_role_assignment" "plan_reader" {
  scope                = "/subscriptions/${var.subscription_id}"
  role_definition_name = "Reader"
  principal_id         = azuread_service_principal.plan.object_id
}

resource "azurerm_role_assignment" "plan_state_reader" {
  scope                = local.tfstate_account_id
  role_definition_name = "Storage Blob Data Reader"
  principal_id         = azuread_service_principal.plan.object_id
}

# Refreshing the azuread_* resources above in a plan needs to read app
# registrations in Microsoft Graph: Application.Read.All, read-only.
data "azuread_service_principal" "msgraph" {
  client_id = "00000003-0000-0000-c000-000000000000"
}

resource "azuread_app_role_assignment" "plan_graph_read" {
  app_role_id         = data.azuread_service_principal.msgraph.app_role_ids["Application.Read.All"]
  principal_object_id = azuread_service_principal.plan.object_id
  resource_object_id  = data.azuread_service_principal.msgraph.object_id
}

# -----------------------------------------------------------------------------
# Budget alerts for this resource group (the billing account has its own one).
# Azure pay-as-you-go has no hard spending cap: these only notify.
# -----------------------------------------------------------------------------

resource "azurerm_consumption_budget_resource_group" "site" {
  name              = "budget-${var.project}"
  resource_group_id = azurerm_resource_group.site.id
  amount            = var.budget_amount
  time_grain        = "Monthly"

  time_period {
    start_date = var.budget_start_date
  }

  notification {
    threshold      = 50
    threshold_type = "Actual"
    operator       = "GreaterThanOrEqualTo"
    contact_emails = [var.budget_email]
  }

  notification {
    threshold      = 100
    threshold_type = "Actual"
    operator       = "GreaterThanOrEqualTo"
    contact_emails = [var.budget_email]
  }

  notification {
    threshold      = 100
    threshold_type = "Forecasted"
    operator       = "GreaterThan"
    contact_emails = [var.budget_email]
  }
}
