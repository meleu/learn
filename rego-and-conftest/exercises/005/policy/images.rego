package main

deny contains msg if {
	some container in input.spec.template.spec.containers
	endswith(container.image, ":latest")
	msg := sprintf(
		"container %s uses a floating tag: %s",
		[container.name, container.image],
	)
}

