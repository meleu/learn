package kubernetes.deployment

deny contains "Deployment is missing an explicit namespace" if not input.metadata.namespace

deny contains "Deployment must not run on the default namespace" if input.metadata.namespace == "default"

deny contains "Deployment must have at least 2 replicas" if input.spec.replicas < 2

deny contains "Deployment is missing the app label" if not input.metadata.labels.app

warn contains "Deployment is missing the owner label" if not input.metadata.labels.owner
