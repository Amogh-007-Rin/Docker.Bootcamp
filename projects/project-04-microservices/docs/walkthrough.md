# Project 04 Walkthrough

```bash
cd projects/project-04-microservices
docker compose up -d --build
curl -s http://localhost:8080/users/
curl -s http://localhost:8080/orders/
docker compose down
```

The gateway routes by path to internal DNS names `user-service` and `order-service`.
