terraform {
  backend "s3" {
    dynamodb_table    = "ygag-sandbox-terraform-state-tf"

    region = "us-east-1"
    bucket = "ygag-sandbox-terraform-state-tf"

    key = "ygag/sandbox/applications-v2/eks/youpayroll.tfstate"
  }
}
