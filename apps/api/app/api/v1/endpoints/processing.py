from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_processing():
    return {'status': 'ok', 'component': 'processing'}
