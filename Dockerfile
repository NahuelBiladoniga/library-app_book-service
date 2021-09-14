FROM golang:1.17-alpine as builder

WORKDIR /app

COPY go.* ./
RUN ["go", "mod", "download"]

COPY ./cmd ./cmd
RUN ["go", "build", "./cmd/api/main.go"]

FROM alpine

COPY --from=builder /app/main /usr/bin/server

CMD ["server"]
