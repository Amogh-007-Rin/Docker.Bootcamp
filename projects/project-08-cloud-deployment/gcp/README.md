# Google Cloud Run — Project 04 Deploy

## Prerequisites
- `gcloud` CLI authenticated
- Artifact Registry or Container Registry enabled

## Deploy user-service

```bash
gcloud auth configure-docker REGION-docker.pkg.dev
docker tag user-service:latest REGION-docker.pkg.dev/PROJECT_ID/repo/user-service:latest
docker push REGION-docker.pkg.dev/PROJECT_ID/repo/user-service:latest

gcloud run deploy user-service \
  --image REGION-docker.pkg.dev/PROJECT_ID/repo/user-service:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 3001
```

Repeat for `order-service`. Use Cloud Load Balancing or API Gateway for path-based routing like nginx.

See `deploy.sh`.
