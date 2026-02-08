output "rds_endpoint" {
  description = "RDS database endpoint"
  value       = try(aws_db_instance.mysql[0].endpoint, null)
  sensitive   = false
}

output "rds_port" {
  description = "RDS database port"
  value       = try(aws_db_instance.mysql[0].port, null)
}

output "ecs_cluster_name" {
  description = "ECS cluster name"
  value       = try(aws_ecs_cluster.main[0].name, null)
}

output "ecs_service_name" {
  description = "ECS service name"
  value       = try(aws_ecs_service.app[0].name, null)
}

output "alb_dns_name" {
  description = "ALB DNS name"
  value       = try(aws_lb.main[0].dns_name, null)
}

output "environment" {
  description = "Environment"
  value       = var.environment
}
