variable "global_variables" {
  description = "Global variables"
  type        = any
  default = {
    prefix      = "ygg-"
    suffix      = "-tf"
    region      = "me-central-1"
    environment = "production"
    account     = "ygg"

    default_tags = {
      "Region"      = "UAE"
      "Environment" = "production"
      "CreatedBy"   = "Terraform"
      "Account"     = "YGG"
    }
  }
}
