import sys
import time
import random
from core.broker.engine import BrokerEngine, ProcessingEngine, RoutingEngine, QualityEngine
from core.observability.engine import ObservabilityEngine

def run_streaming_simulation():
    # 1. Initialize Engines
    broker = BrokerEngine()
    processor = ProcessingEngine()
    router = RoutingEngine()
    quality = QualityEngine()
    obs = ObservabilityEngine()
    
    print("--- Streaming Ingestion Hub Simulation ---")
    
    # 2. Simulate High-Throughput Ingestion
    topics = ["user-clicks", "billing-events", "system-logs"]
    
    print(f"\n[INGESTION] Starting multi-topic event production...")
    for i in range(10):
        topic = random.choice(topics)
        event = {"event_id": i, "user_id": f"user-{i}", "value": random.randint(10, 500)}
        
        # Produce to Broker
        payload = broker.produce(topic, 0, event)
        print(f"  Produced {payload['id']} to {topic}")
        
        # Record Metric
        obs.record_metric(topic, 1, random.uniform(2.0, 10.0))
        
        time.sleep(0.1)

    # 3. Simulate Stream Processing
    print(f"\n[PROCESSING] Triggering real-time transformation pipeline...")
    for topic in topics:
        consumed = broker.consume(topic, 0, "analytics-group")
        if consumed:
            # Transformation
            processed = processor.transform(consumed)
            print(f"  Processed {processed['id']} | Latency: {processed['processed_at']}")
            
            # Routing
            router.route(processed, ["data-warehouse", "metrics-sink"])

    # 4. Display Cluster Health
    print(f"\n[OBSERVABILITY] Cluster Health Summary:")
    summary = obs.get_summary()
    print(f"  Status: {summary['status']}")
    print(f"  Avg Latency: {summary['avg_latency_ms']}ms")
    print(f"  Active Topics: {summary['active_topics']}")

if __name__ == "__main__":
    run_streaming_simulation()
