from fastapi import APIRouter, Body
router = APIRouter()
@router.post('/')
def ingest_event(data: dict = Body(...)):
    return {'status': 'INGESTED', 'correlation_id': 'corr-456'}
