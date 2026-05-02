from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, ingest, broker, processing, routing, quality, observability
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(ingest.router, prefix="/ingest", tags=["ingest"])
api_router.include_router(broker.router, prefix="/broker", tags=["broker"])
api_router.include_router(processing.router, prefix="/processing", tags=["processing"])
api_router.include_router(routing.router, prefix="/routing", tags=["routing"])
api_router.include_router(quality.router, prefix="/quality", tags=["quality"])
api_router.include_router(observability.router, prefix="/metrics", tags=["observability"])
