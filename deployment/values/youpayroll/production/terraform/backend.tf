terraform {
  backend "s3" {
    dynamodb_table    = "ygag-production-terraform-state-tf"

    region = "us-east-1"
    bucket = "ygag-production-terraform-state-tf"

    key = "ygag/production/applications-v2/eks/youpayroll.tfstate"
  }
}
