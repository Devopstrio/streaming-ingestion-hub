.PHONY: help build up down test lint migrate ingest-simulation process-stream route-events

help:
	@echo "Streaming Ingestion Hub - Management Commands"
	@echo "---------------------------------------------"
	@echo "build              : Build all service containers"
	@echo "up                 : Start all services in the background"
	@echo "down               : Stop all services"
	@echo "test               : Run all tests (Unit + Integration)"
	@echo "lint               : Run linting checks"
	@echo "migrate            : Run database migrations"
	@echo "ingest-simulation  : Run a simulation of real-time event ingestion"
	@echo "process-stream     : Trigger streaming processing engine (worker)"
	@echo "route-events       : Run event routing engine logic"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/unit tests/integration
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/worker core
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

ingest-simulation:
	docker-compose exec api python scripts/ingest/run.py

process-stream:
	docker-compose exec api python scripts/process/run.py

route-events:
	docker-compose exec api python scripts/route/run.py
