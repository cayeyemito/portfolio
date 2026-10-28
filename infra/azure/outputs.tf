locals {
  site_url = trimsuffix(azurerm_storage_account.site.primary_web_endpoint, "/")
}

output "site_url" {
  description = "Public URL of the site (static website endpoint)."
  value       = local.site_url
}

output "site_storage_account" {
  value = azurerm_storage_account.site.name
}

output "log_workspace_id" {
  description = "Log Analytics workspace (customer) ID used in KQL queries."
  value       = azurerm_log_analytics_workspace.site.workspace_id
}

output "deploy_client_id" {
  value = azuread_application.deploy.client_id
}

output "plan_client_id" {
  value = azuread_application.plan.client_id
}

# Paste these into GitHub → Settings → Secrets and variables → Actions → Variables.
# None of them is a secret: OIDC needs IDs, not passwords.
output "github_variables" {
  description = "Repository variables the workflows expect (plus BUDGET_EMAIL)."
  value = {
    AZURE_TENANT_ID        = data.azuread_client_config.current.tenant_id
    AZURE_SUBSCRIPTION_ID  = var.subscription_id
    AZURE_DEPLOY_CLIENT_ID = azuread_application.deploy.client_id
    AZURE_PLAN_CLIENT_ID   = azuread_application.plan.client_id
    SITE_STORAGE_ACCOUNT   = azurerm_storage_account.site.name
    LOG_WORKSPACE_ID       = azurerm_log_analytics_workspace.site.workspace_id
    SITE_URL               = local.site_url
  }
}
