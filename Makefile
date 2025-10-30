.PHONY: help install dev build test clean docker-up docker-down docker-logs

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install dependencies
	pnpm install

dev: ## Start development servers (API + Web)
	pnpm dev

dev-web: ## Start web app only
	pnpm dev:web

dev-api: ## Start API server only
	pnpm dev:api

build: ## Build all apps for production
	pnpm build

test: ## Run tests
	pnpm test

lint: ## Lint code
	pnpm lint

format: ## Format code
	pnpm format

clean: ## Clean build artifacts and dependencies
	pnpm clean
	rm -rf node_modules apps/*/node_modules packages/*/node_modules

docker-up: ## Start all Docker services
	docker-compose up -d

docker-down: ## Stop all Docker services
	docker-compose down

docker-logs: ## View Docker logs
	docker-compose logs -f

docker-restart: ## Restart all Docker services
	docker-compose restart

docker-clean: ## Remove all Docker containers and volumes
	docker-compose down -v
	docker system prune -f

db-migrate: ## Run database migrations
	@echo "Database migrations coming soon..."

db-seed: ## Seed database with sample data
	@echo "Database seeding coming soon..."

setup: install docker-up ## Setup the project (install + start Docker)
	@echo "✅ Setup complete! You can now run 'make dev' to start development."
