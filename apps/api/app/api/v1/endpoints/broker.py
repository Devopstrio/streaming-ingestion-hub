from fastapi import APIRouter, Body
router = APIRouter()
@router.get('/topics')
def list_topics():
    return {'topics': [{'id': 'user-actions', 'partitions': 3}]}
@router.post('/produce')
def produce_message(data: dict = Body(...)):
    return {'status': 'PRODUCED', 'id': 'msg-123'}
@router.post('/consume')
def consume_message(data: dict = Body(...)):
    return {'status': 'CONSUMED', 'data': {'event': 'purchase', 'value': 50}}
