# Module 18 — CI/CD Pipelines with Docker
[Previous: Module 17 — Kubernetes Intro](../17-kubernetes-intro/README.md) | [Next: Module 19 — Real-World Projects](../19-real-world-projects/README.md)

## What you learn
- You automate image builds and pushes with GitHub Actions.
- You use Buildx, layer caching, and multi-platform builds in CI.
- You run containerized tests as pipeline steps.
- You build equivalent pipelines in Jenkins with a `Jenkinsfile`.
- You compare Docker-in-Docker with mounting the Docker socket.

## Prerequisites
- You finish Module 17 (or Modules 09–10 if you are focusing on delivery only).
- You have a Docker Hub account (or another OCI registry) for push exercises.
- You understand tagging, registries, and multi-stage Dockerfiles from earlier modules.

## Estimated time
- 150–180 minutes (including optional Jenkins local setup)

## Files in this module

| File | Purpose |
|---|---|
| [notes.md](notes.md) | Full guide: GitHub Actions, Jenkins, DinD vs socket, diagrams |
| [examples/docker.yml](examples/docker.yml) | Annotated GitHub Actions workflow |
| [examples/Jenkinsfile](examples/Jenkinsfile) | Annotated Jenkins declarative pipeline |
| [exercises.md](exercises.md) | Hands-on CI/CD exercises |

[Previous: Module 17 — Kubernetes Intro](../17-kubernetes-intro/README.md) | [Next: Module 19 — Real-World Projects](../19-real-world-projects/README.md)
