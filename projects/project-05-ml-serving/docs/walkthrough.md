# Project 05 Walkthrough

```bash
cd projects/project-05-ml-serving
docker compose up -d --build
curl -s http://localhost:8000/health
curl -s -X POST http://localhost:8000/predict -H "Content-Type: application/json" \
  -d '{"sepal_length":5.1,"sepal_width":3.5,"petal_length":1.4,"petal_width":0.2}'
docker compose down
```

For large models, mount weights as a volume or download at startup instead of baking into every layer.
