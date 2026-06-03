# Module 19 — Real-World Projects
[Previous: Module 18 — CI/CD Pipelines](../18-cicd-pipelines/README.md) | [Next: Module 20 — Interview Prep](../20-interview-prep/README.md)

## What this module is
Module 19 is a **hub**, not a lecture. You have already learned Docker fundamentals, Compose, security, orchestration, and CI/CD in Modules 00–18. Here you apply that knowledge in eight production-style projects under [`projects/`](../../projects/).

Each project includes a `README.md`, runnable app code, optimized `Dockerfile`(s), `docker-compose.yml`, and a step-by-step [`docs/walkthrough.md`](../../projects/project-01-nodejs-app/docs/walkthrough.md).

## Prerequisites
- You finish Module 18 (or at minimum Modules 04–10 and 18 for registry/CI topics).
- Docker Engine **25+** and Compose **v2** plugin installed (`docker compose version`).
- Enough disk space for multiple images (~2–4 GB total).

## Recommended order

| Order | Project | Docker concepts you practice |
|---|---|---|
| 1 | [Project 01 — Node.js Web App](../../projects/project-01-nodejs-app/README.md) | Multi-stage build, non-root user, health checks, Postgres in Compose |
| 2 | [Project 02 — Python Flask App](../../projects/project-02-python-flask-app/README.md) | Gunicorn, Redis cache, multi-stage Python image |
| 3 | [Project 03 — React App](../../projects/project-03-react-app/README.md) | Build-time `ARG`/`ENV`, nginx static serving |
| 4 | [Project 04 — Microservices](../../projects/project-04-microservices/README.md) | User-defined networks, API gateway, inter-service DNS |
| 5 | [Project 05 — ML Model Serving](../../projects/project-05-ml-serving/README.md) | Larger images, GPU-optional patterns, inference API |
| 6 | [Project 06 — GitHub Actions CI/CD](../../projects/project-06-cicd-github-actions/README.md) | Workflow secrets, build/test/push on push |
| 7 | [Project 07 — Jenkins CI/CD](../../projects/project-07-cicd-jenkins/README.md) | Local Jenkins in Compose, `Jenkinsfile`, registry push |
| 8 | [Project 08 — Cloud Deployment](../../projects/project-08-cloud-deployment/README.md) | ECS Fargate, Cloud Run, Azure Container Instances |

Projects 06–07 extend Project 01’s app. Project 08 deploys the microservices stack from Project 04.

## How to work through a project

1. Read the project `README.md` for goals and architecture diagram.
2. Follow `docs/walkthrough.md` command by command—do not skip verification steps.
3. Change one variable at a time (port, env, replica count) and observe behavior.
4. Break something on purpose (wrong `DATABASE_URL`, stopped dependency) and fix it using Module 13 troubleshooting habits.
5. Optional: fork the pattern into your own repository and wire your registry credentials.

## Estimated time
- **Per project:** 60–120 minutes
- **All eight projects:** 12–20 hours (spread over several days)

## Project index

### Project 01 — Node.js Web App
**Link:** [projects/project-01-nodejs-app/README.md](../../projects/project-01-nodejs-app/README.md)

Dockerize an Express REST API with a multi-stage Dockerfile, non-root user, container health check, and Compose stack including PostgreSQL.

### Project 02 — Python Flask App
**Link:** [projects/project-02-python-flask-app/README.md](../../projects/project-02-python-flask-app/README.md)

Run Flask behind Gunicorn in a slim production image, with Redis for caching and a full Compose file for local development.

### Project 03 — React App
**Link:** [projects/project-03-react-app/README.md](../../projects/project-03-react-app/README.md)

Build the SPA with Node in stage one, serve static assets with nginx in stage two, and inject build-time configuration via `ARG` and `ENV`.

### Project 04 — Microservices Architecture
**Link:** [projects/project-04-microservices/README.md](../../projects/project-04-microservices/README.md)

Three services—nginx gateway, Node user service, Python order service—on a user-defined bridge network with service discovery by name.

### Project 05 — ML Model Serving
**Link:** [projects/project-05-ml-serving/README.md](../../projects/project-05-ml-serving/README.md)

Package a model inference API, manage heavier dependencies, and expose predictable HTTP endpoints for batch or real-time scoring.

### Project 06 — CI/CD with GitHub Actions
**Link:** [projects/project-06-cicd-github-actions/README.md](../../projects/project-06-cicd-github-actions/README.md)

Automate build, test, and push for the Node app using GitHub Actions secrets and the patterns from Module 18.

### Project 07 — CI/CD with Jenkins
**Link:** [projects/project-07-cicd-jenkins/README.md](../../projects/project-07-cicd-jenkins/README.md)

Run Jenkins locally via Compose, configure credentials, and execute a `Jenkinsfile` pipeline equivalent to Project 06.

### Project 08 — Cloud Deployment
**Link:** [projects/project-08-cloud-deployment/README.md](../../projects/project-08-cloud-deployment/README.md)

Deploy the microservices system to AWS ECS (Fargate), Google Cloud Run, and Azure Container Instances—each with scripts and a provider-specific walkthrough.

## After the projects
When all eight projects run cleanly on your machine, move to [Module 20 — Interview Prep](../20-interview-prep/README.md) for structured Q&A and scenario practice.

[Previous: Module 18 — CI/CD Pipelines](../18-cicd-pipelines/README.md) | [Next: Module 20 — Interview Prep](../20-interview-prep/README.md)
