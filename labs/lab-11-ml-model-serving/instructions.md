# Lab 11 Instructions

1. Build the image (trains model at build time).
   ```bash
   cd labs/lab-11-ml-model-serving
   docker build -t lab11-ml .
   ```

2. Run the container.
   ```bash
   docker run -d --name lab11 -p 8000:8000 lab11-ml
   ```

3. Health check.
   ```bash
   curl -s http://localhost:8000/health
   ```
   ```text
   {"status":"ok"}
   ```

4. Predict.
   ```bash
   curl -s -X POST http://localhost:8000/predict -H "Content-Type: application/json" -d "{\"sepal_length\":5.1,\"sepal_width\":3.5,\"petal_length\":1.4,\"petal_width\":0.2}"
   ```
   ```text
   {"class_id":0}
   ```

5. Clean up.
   ```bash
   docker rm -f lab11
   ```
