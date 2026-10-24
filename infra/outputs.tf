output "site_url" {
  description = "Public URL of the site."
  value       = local.use_domain ? "https://${var.domain_name}" : "https://${aws_cloudfront_distribution.site.domain_name}"
}

output "cloudfront_domain" {
  value = aws_cloudfront_distribution.site.domain_name
}

output "distribution_id" {
  value = aws_cloudfront_distribution.site.id
}

output "site_bucket" {
  value = aws_s3_bucket.site.bucket
}

output "logs_bucket" {
  value = aws_s3_bucket.logs.bucket
}

output "deploy_role_arn" {
  value = aws_iam_role.deploy.arn
}

output "plan_role_arn" {
  value = aws_iam_role.plan.arn
}

# Paste these into GitHub → Settings → Secrets and variables → Actions → Variables.
output "github_variables" {
  description = "Repository variables the workflows expect."
  value = {
    AWS_REGION          = var.aws_region
    AWS_DEPLOY_ROLE_ARN = aws_iam_role.deploy.arn
    AWS_PLAN_ROLE_ARN   = aws_iam_role.plan.arn
    SITE_BUCKET         = aws_s3_bucket.site.bucket
    LOGS_BUCKET         = aws_s3_bucket.logs.bucket
    DISTRIBUTION_ID     = aws_cloudfront_distribution.site.id
    SITE_URL            = local.use_domain ? "https://${var.domain_name}" : "https://${aws_cloudfront_distribution.site.domain_name}"
  }
}
