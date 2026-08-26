package main

# deny contains msg if {
# 	input.kind == "Deployment"
# 	input.spec.replicas < 2
# 	msg := sprintf(
# 		"%s/%s has %d replicas; at least 2 required",
# 		[input.kind, input.metadata.name, input.spec.replicas],
# 	)
# }
#
# deny contains msg if {
# 	input.kind == "StatefulSet"
# 	input.spec.replicas < 2
# 	msg := sprintf(
# 		"%s/%s has %d replicas; at least 2 required",
# 		[input.kind, input.metadata.name, input.spec.replicas],
# 	)
# }

deny contains msg if {
	input.kind in {"StatefulSet", "Deployment"}
	input.spec.replicas < 2
	msg := sprintf(
		"%s/%s has %d replicas; at least 2 required",
		[input.kind, input.metadata.name, input.spec.replicas],
	)
}

deny contains msg if {
	input.kind in {"Deployment", "StatefulSet"}
	not input.metadata.labels.owner
	msg := sprintf(
		"%s/%s missing the owner label",
		[input.kind, input.metadata.name],
	)
}

