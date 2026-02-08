.PHONY: help up down logs restart ps build clean db-init

help:
	@echo "🐳 Ddalkak Docker Compose Commands"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  up              - Start all services (production)"
	@echo "  up-dev          - Start all services (development with hot reload)"
	@echo "  down            - Stop all services"
	@echo "  down-clean      - Stop all services and remove volumes"
	@echo "  logs            - View all service logs"
	@echo "  logs-backend    - View backend logs only"
	@echo "  logs-frontend   - View frontend logs only"
	@echo "  logs-mysql      - View MySQL logs only"
	@echo "  ps              - Show running containers"
	@echo "  restart         - Restart all services"
	@echo "  restart-backend - Restart backend service"
	@echo "  restart-frontend- Restart frontend service"
	@echo "  restart-mysql   - Restart MySQL service"
	@echo "  build           - Build all images"
	@echo "  clean           - Remove all containers and volumes"
	@echo "  db-init         - Initialize database with sample data"
	@echo "  shell-backend   - Access backend container shell"
	@echo "  shell-mysql     - Access MySQL container shell"
	@echo "  mysql-cli       - Connect to MySQL via CLI"
	@echo ""

up:
	docker-compose up -d
	@echo "✅ Services started! Check http://localhost:3000"

up-dev:
	docker-compose -f docker-compose.yml -f docker-compose.development.yml up
	@echo "✅ Development environment started with hot reload!"

down:
	docker-compose down
	@echo "✅ Services stopped"

down-clean:
	docker-compose down -v
	@echo "✅ Services stopped and volumes cleaned"

logs:
	docker-compose logs -f

logs-backend:
	docker-compose logs -f backend

logs-frontend:
	docker-compose logs -f frontend

logs-mysql:
	docker-compose logs -f mysql

ps:
	docker-compose ps

restart:
	docker-compose restart
	@echo "✅ Services restarted"

restart-backend:
	docker-compose restart backend
	@echo "✅ Backend restarted"

restart-frontend:
	docker-compose restart frontend
	@echo "✅ Frontend restarted"

restart-mysql:
	docker-compose restart mysql
	@echo "✅ MySQL restarted"

build:
	docker-compose build --no-cache
	@echo "✅ All images built"

clean:
	docker-compose down -v
	docker system prune -f
	@echo "✅ All containers and volumes removed"

db-init:
	docker-compose exec mysql mysql -u root -p"$$(grep DB_PASSWORD .env | cut -d '=' -f 2)" ddalkak < backend/init.sql
	@echo "✅ Database initialized with sample data"

shell-backend:
	docker-compose exec backend /bin/bash

shell-mysql:
	docker-compose exec mysql /bin/bash

mysql-cli:
	docker-compose exec mysql mysql -u ddalkak -p"$$(grep DB_PASSWORD .env | cut -d '=' -f 2)" ddalkak

.DEFAULT_GOAL := help
