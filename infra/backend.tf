terraform {
  required_version = ">= 1.10"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  # State lives in a versioned S3 bucket created by hand (see README).
  # Bucket and region come from backend.hcl locally or -backend-config in CI.
  # use_lockfile = native S3 state locking, no DynamoDB table needed.
  backend "s3" {
    key          = "portfolio/terraform.tfstate"
    encrypt      = true
    use_lockfile = true
  }
}
