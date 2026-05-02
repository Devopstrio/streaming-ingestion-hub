import time
import json
import uuid
import collections
from typing import List, Dict, Any, Optional
from datetime import datetime

class BrokerEngine:
    """Kafka-like message broker simulation."""
    
    def __init__(self):
        self.topics = collections.defaultdict(lambda: collections.defaultdict(list))
        self.offsets = collections.defaultdict(lambda: collections.defaultdict(int))

    def produce(self, topic: str, partition: int, message: Dict[str, Any]):
        timestamp = datetime.utcnow().isoformat()
        payload = {
            "id": str(uuid.uuid4()),
            "timestamp": timestamp,
            "data": message
        }
        self.topics[topic][partition].append(payload)
        return payload

    def consume(self, topic: str, partition: int, group_id: str) -> Optional[Dict[str, Any]]:
        current_offset = self.offsets[group_id][f"{topic}-{partition}"]
        partition_data = self.topics[topic][partition]
        
        if current_offset < len(partition_data):
            message = partition_data[current_offset]
            self.offsets[group_id][f"{topic}-{partition}"] += 1
            return message
        return None

class ProcessingEngine:
    """Real-time stream processing and transformation engine."""
    
    def transform(self, message: Dict[str, Any]) -> Dict[str, Any]:
        # Simulation: Enrich with processing metadata
        message["processed_at"] = datetime.utcnow().isoformat()
        message["quality_score"] = 1.0 # Default
        return message

    def filter(self, message: Dict[str, Any], rule: str) -> bool:
        # Simple rule-based filtering
        if rule == "high_value":
            return message.get("data", {}).get("value", 0) > 100
        return True

class RoutingEngine:
    """Routes processed streams to multiple destinations."""
    
    def route(self, message: Dict[str, Any], destinations: List[str]):
        results = []
        for dest in destinations:
            results.append({
                "destination": dest,
                "status": "DELIVERED",
                "timestamp": datetime.utcnow().isoformat()
            })
        return results

class QualityEngine:
    """Validates schemas and data quality for streaming events."""
    
    def validate_schema(self, message: Dict[str, Any], schema: Dict[str, Any]) -> bool:
        # Simplified schema validation logic
        required_fields = schema.get("required", [])
        for field in required_fields:
            if field not in message.get("data", {}):
                return False
        return True

if __name__ == "__main__":
    # Simulation Run
    broker = BrokerEngine()
    processor = ProcessingEngine()
    router = RoutingEngine()
    quality = QualityEngine()
    
    print("--- Streaming Ingestion Hub Simulation ---")
    
    # 1. Produce
    event = {"user_id": "123", "action": "purchase", "value": 150}
    payload = broker.produce("user-actions", 0, event)
    print(f"[PRODUCER] Sent Event: {payload['id']} to topic 'user-actions'")
    
    # 2. Consume & Process
    consumed = broker.consume("user-actions", 0, "billing-group")
    if consumed:
        print(f"[CONSUMER] Received Event: {consumed['id']}")
        
        # Quality check
        is_valid = quality.validate_schema(consumed, {"required": ["user_id", "value"]})
        print(f"[QUALITY] Schema Valid: {is_valid}")
        
        # Transformation
        processed = processor.transform(consumed)
        print(f"[PROCESSOR] Transformed Event at: {processed['processed_at']}")
        
        # Routing
        routing_report = router.route(processed, ["data-warehouse", "real-time-dashboard"])
        print(f"[ROUTER] Delivered to: {[r['destination'] for r in routing_report]}")
