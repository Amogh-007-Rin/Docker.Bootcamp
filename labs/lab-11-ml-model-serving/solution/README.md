# Lab 11 Solution

Multi-stage build for ML model training + serving:

| Stage | Base | Action |
|---|---|---|
| **builder** | `python:3.12-slim` | Install deps, run `train.py` — produces `model.joblib` (~400 KB) |
| **runtime** | `python:3.12-slim` | Install only inference deps, copy `model.joblib` + `main.py`, create non-root user |

The runtime image excludes scikit-learn build artifacts, pip cache, and training code — keeping it lean (~250 MB vs >1 GB with build deps). The FastAPI app exposes `GET /health` and `POST /predict` on port 8000.

Run with `docker compose up -d` and test:

```powershell
curl http://localhost:8000/health
curl -X POST http://localhost:8000/predict -H "Content-Type: application/json" -d '{\"sepal_length\":5.1,\"sepal_width\":3.5,\"petal_length\":1.4,\"petal_width\":0.2}'
```
