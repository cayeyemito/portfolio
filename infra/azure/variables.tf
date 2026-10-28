variable "project" {
  description = "Name used in every resource name and as the project tag."
  type        = string
  default     = "portfolio"
}

variable "subscription_id" {
  description = "Azure subscription to deploy into. azurerm 4.x requires it explicitly."
  type        = string
}

variable "location" {
  description = "Region for every resource. West Europe was not accepting new customers."
  type        = string
  default     = "spaincentral"
}

variable "github_repository" {
  description = "owner/name of the GitHub repository whose workflows may sign in through OIDC."
  type        = string
  default     = "cayeyemito/portfolio"
}

variable "github_oidc_repository" {
  description = <<-EOT
    Repository as it appears in the GitHub OIDC token subject. GitHub uses immutable
    IDs (owner@id/repo@id), so a deleted or renamed repository can never be
    impersonated by a new one with the same name.
  EOT
  type        = string
  default     = "cayeyemito@46819817/portfolio@1432650297"
}

variable "tfstate_resource_group" {
  description = "Resource group of the hand-made Terraform state storage account."
  type        = string
  default     = "rg-portfolio-tfstate"
}

variable "tfstate_storage_account" {
  description = "Terraform state storage account (the plan identity needs to read it)."
  type        = string
  default     = "stportfoliotf9766eb"
}

variable "budget_email" {
  description = "Email that receives the budget alerts."
  type        = string
}

variable "budget_amount" {
  description = "Monthly budget for the resource group, in the billing currency."
  type        = number
  default     = 2
}

variable "budget_start_date" {
  description = "First month of the budget (must be the first day of a month)."
  type        = string
  default     = "2026-10-01T00:00:00Z"
}

variable "log_retention_days" {
  description = "Days the access logs are kept in Log Analytics (30 is the free minimum)."
  type        = number
  default     = 30
}
