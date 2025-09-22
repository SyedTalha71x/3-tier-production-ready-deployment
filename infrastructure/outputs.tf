output "app_url" {
  value = "http://${aws_instance.app_server.public_ip}"
}

output "rds_endpoint" {
  value = aws_db_instance.mysql.endpoint
}