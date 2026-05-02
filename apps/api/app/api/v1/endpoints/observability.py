from fastapi import APIRouter
router = APIRouter()
@router.get('/summary')
def get_metrics_summary():
    return {'throughput': 1250, 'latency_ms': 4.2, 'status': 'HEALTHY'}
