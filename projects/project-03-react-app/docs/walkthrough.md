# Project 03 Walkthrough

```bash
cd projects/project-03-react-app
docker compose up -d --build
curl -s http://localhost:8080/ | head
docker compose down
```

Change `REACT_APP_API_URL` in `docker-compose.yml` and rebuild to see the baked value in HTML.
