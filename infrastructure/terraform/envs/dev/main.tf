module "stream_db" {
  source = "./modules/database"

  db_name = "streaming_hub_metadata"
}

module "message_broker_cache" {
  source = "./modules/redis"

  cluster_mode = true
}

module "cluster_monitoring" {
  source = "./modules/monitoring"

  retention_days = 30
}

resource "kubernetes_namespace" "streaming_ops" {
  metadata {
    name = "streaming-ingestion-hub"
    labels = {
      "streaming.ops/managed" = "true"
    }
  }
}

resource "kubernetes_config_map" "streaming_configs" {
  metadata {
    name      = "streaming-global-configs"
    namespace = kubernetes_namespace.streaming_ops.metadata[0].name
  }

  data = {
    "broker-engine"        = "redis-sim"
    "max-partitions"       = "128"
    "retention-policy"     = "P24H"
    "compression-enabled"  = "true"
  }
}
