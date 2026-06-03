FROM golang:1.22 AS build

WORKDIR /src
COPY go-app/go.mod go-app/main.go ./
RUN go mod tidy
RUN go build -o /out/app main.go

FROM gcr.io/distroless/base
COPY --from=build /out/app /app
EXPOSE 8080
ENTRYPOINT ["/app"]
