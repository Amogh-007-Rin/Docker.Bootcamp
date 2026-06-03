# Lab 10 Solution

Cloud deployment patterns covered:

| Service | Build | Push | Runtime |
|---|---|---|---|
| **AWS ECS (Fargate)** | `docker build` | `aws ecr push` | Task definition with CPU/memory, env vars, port mappings, IAM roles |
| **Google Cloud Run** | `gcloud builds submit` | Artifact Registry | `gcloud run deploy` — auto-scaling, managed HTTPS, pay-per-request |
| **Azure ACI** | `docker build` | `az acr push` | `az container create` with public IP, env vars, restart policy |

Common workflow: build image → tag → push to registry → define runtime (CPU, memory, env, ports) → create service. See `projects/project-08-cloud-deployment/` for provider-specific commands.
