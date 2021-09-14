install-swagger:
	swagger version || go get -u github.com/go-swagger/go-swagger/cmd/swagger

generate-swagger: install-swagger
	swagger generate spec -o ./cmd/api/static/swagger.yaml --scan-models

run-prod-image: generate-swagger
	docker compose up

run-dev-image: generate-swagger
	docker compose -f docker-compose.dev.yaml up

install-air:
	air -v || curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s -- -b $(go env GOPATH)/bin

run-local: install-air  generate-swagger
	air
