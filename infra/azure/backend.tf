terraform {
  required_version = ">= 1.10"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 3.0"
    }
  }

  # State lives in a storage account created by hand (see README), with
  # versioning, soft delete and shared keys disabled. use_azuread_auth = access
  # with an Entra ID identity (az login locally, OIDC in CI), never account keys.
  # The blob lease is the state lock.
  backend "azurerm" {
    resource_group_name  = "rg-portfolio-tfstate"
    storage_account_name = "stportfoliotf9766eb"
    container_name       = "tfstate"
    key                  = "portfolio/azure.tfstate"
    use_azuread_auth     = true
  }
}
