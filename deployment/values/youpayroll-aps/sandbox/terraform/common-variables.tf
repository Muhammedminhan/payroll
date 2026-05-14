variable "global_variables" {
  description = "Global variables"
  type        = any
  default = {
    prefix      = "ygag-"
    suffix      = "-tf"
    region      = "ap-south-1"
    environment = "sandbox"
    account     = "ygag"

    default_tags = {
      "Region"      = "Mumbai"
      "Environment" = "sandbox"
      "CreatedBy"   = "Terraform"
      "Account"     = "YGAG"
    }
  }
}
