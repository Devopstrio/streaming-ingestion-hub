from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_routing():
    return {'status': 'ok', 'component': 'routing'}
