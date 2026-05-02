from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_quality():
    return {'status': 'ok', 'component': 'quality'}
