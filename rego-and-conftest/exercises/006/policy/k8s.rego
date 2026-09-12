package main

###############################################################################
# K8S-01 · Exposed Services
#
# A Service of type NodePort or LoadBalancer exposes a workload outside the
# cluster. That is sometimes intended, so it should be flagged for review
# but must not block the pipeline.
###############################################################################
warn contains "[K8S-01] exposed workload" if {
	input.kind == "Service"
	input.spec.type in {"NodePort", "LoadBalancer"}
}

###############################################################################
# K8S-02 · Namespaces
#
# Every resource must declare its namespace explicitly, and that namespace
# must not be default.
###############################################################################
deny contains "[K8S-02] namespace must be present" if not input.metadata.namespace

deny contains "[K8S-02] namespace must not be the default" if input.metadata.namespace == "default"

###############################################################################
# K8S-03 · Replicas
#
# Deployments and StatefulSets must run at least two replicas.
# Kubernetes defaults an omitted replicas field to 1, so
# leaving it out is a violation too.
###############################################################################
deny contains "[K8S-03] must specify the replicas" if {
	input.kind in {"Deployment", "StatefulSet"}
	not input.spec.replicas
}

deny contains "[K8S-03] replicas must be at least 2" if {
	input.kind in {"Deployment", "StatefulSet"}
	input.spec.replicas < 2
}

###############################################################################
# K8S-04 · Floating image tags
#
# No container may use an image tagged :latest. The tag moves, so
# the same manifest can deploy different code on different days.
###############################################################################
# TODO: discover how to make these two rules a single block
deny contains msg if {
	some container in input.spec.template.spec.containers
	endswith(container.image, ":latest")
	msg := sprintf(
		"[K8S-04] container '%s' uses :latest tag: '%s'",
		[container.name, container.image],
	)
}

deny contains msg if {
	some container in input.spec.containers
	endswith(container.image, ":latest")
	msg := sprintf(
		"[K8S-04] container '%s' uses :latest tag: '%s'",
		[container.name, container.image],
	)
}
