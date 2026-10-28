variable "project" {
  description = "Name used as a prefix for every resource and as the project tag."
  type        = string
  default     = "portfolio"
}

variable "aws_region" {
  description = "Region for the buckets and IAM. CloudFront and ACM are global (us-east-1)."
  type        = string
  default     = "eu-west-1"
}

variable "github_repository" {
  description = "owner/name of the GitHub repository allowed to assume the roles through OIDC."
  type        = string
  default     = "cayeyemito/portfolio"
}

variable "budget_email" {
  description = "Email that receives the AWS Budgets alerts."
  type        = string
}

variable "budget_limit_usd" {
  description = "Monthly budget. AWS Budgets works in USD."
  type        = number
  default     = 5
}

variable "domain_name" {
  description = "Optional custom domain (e.g. cayetanoyeste.dev). Empty = use the cloudfront.net URL."
  type        = string
  default     = ""
}

variable "route53_zone_name" {
  description = "Route 53 hosted zone that contains domain_name. Required when domain_name is set."
  type        = string
  default     = ""
}

variable "log_retention_days" {
  description = "Days CloudFront access logs are kept."
  type        = number
  default     = 30
}
