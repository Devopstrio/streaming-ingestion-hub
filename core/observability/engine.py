from typing import List, Dict, Any
from datetime import datetime

class ObservabilityEngine:
    """Monitors throughput, latency, and stream health."""
    
    def __init__(self):
        self.metrics = []

    def record_metric(self, topic: str, throughput: int, latency_ms: float):
        metric = {
            "topic": topic,
            "throughput": throughput,
            "latency_ms": latency_ms,
            "timestamp": datetime.utcnow().isoformat()
        }
        self.metrics.append(metric)
        return metric

    def get_summary(self) -> Dict[str, Any]:
        if not self.metrics:
            return {"status": "IDLE", "avg_latency": 0}
        
        avg_latency = sum(m["latency_ms"] for m in self.metrics) / len(self.metrics)
        return {
            "status": "HEALTHY",
            "active_topics": len(set(m["topic"] for m in self.metrics)),
            "avg_latency_ms": round(avg_latency, 2),
            "total_events": len(self.metrics)
        }
