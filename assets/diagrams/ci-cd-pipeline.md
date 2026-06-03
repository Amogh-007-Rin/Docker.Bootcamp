# CI/CD Pipeline with Docker

A continuous integration and deployment pipeline. Code pushed to GitHub triggers a build → test → package → deploy workflow. Both GitHub Actions and Jenkins are shown as parallel automation options.

```mermaid
flowchart TB
    subgraph Trigger
        PUSH[Developer pushes code<br/>git push origin main]
    end

    PUSH --> CHECKOUT

    subgraph "GitHub Actions (cloud-native)"
        GHA_CHECKOUT["1. Checkout<br/>actions/checkout@v4"]
        GHA_BUILD["2. Build Image<br/>docker build -t app ."]
        GHA_TEST["3. Run Tests<br/>docker compose run tests"]
        GHA_PUSH["4. Push Image<br/>docker push ghcr.io/org/app:latest"]
        GHA_DEPLOY["5. Deploy<br/>kubectl set image / ssh deploy"]

        GHA_CHECKOUT --> GHA_BUILD --> GHA_TEST --> GHA_PUSH --> GHA_DEPLOY
    end

    subgraph "Jenkins (self-hosted)"
        JENK_CHECKOUT["1. Checkout<br/>git clone / SCM plugin"]
        JENK_BUILD["2. Build Image<br/>docker build -t app:\${BUILD_TAG}"]
        JENK_TEST["3. Run Tests<br/>docker compose run tests"]
        JENK_PUSH["4. Push Image<br/>docker push registry.local/app:\${BUILD_TAG}"]
        JENK_DEPLOY["5. Deploy<br/>Ansible / SSH / k8s plugin"]

        JENK_CHECKOUT --> JENK_BUILD --> JENK_TEST --> JENK_PUSH --> JENK_DEPLOY
    end

    PUSH --> JENK_CHECKOUT

    subgraph Artifacts
        REGISTRY[Container Registry<br/>Docker Hub / ghcr.io<br/>ECR / Self-Hosted]
        INFRA[Target Environment<br/>VM / Kubernetes / Swarm]
    end

    GHA_PUSH --> REGISTRY
    JENK_PUSH --> REGISTRY
    REGISTRY --> INFRA
```

**Stage breakdown:**

| # | Stage | Docker Role | What Happens |
|---|---|---|---|
| 1 | **Checkout** | — | Source code is pulled from the repository |
| 2 | **Build** | `docker build` | Multi-stage Dockerfile compiles code and produces a slim runtime image |
| 3 | **Test** | `docker compose run` | Integration tests spin up ephemeral services (DB, Redis, etc.) and run against the freshly built image |
| 4 | **Push** | `docker push` | Tagged image is uploaded to a registry (`latest`, `v1.2.3`, `sha-abc123`) |
| 5 | **Deploy** | `docker pull` + restart | Target host pulls the new image and replaces running containers (zero-downtime via blue/green or rolling update) |

**Docker-specific benefits in CI/CD:**
- **Reproducible environments** — "Works on my machine" is eliminated by using the same image from build through production
- **Immutable artifacts** — The image tested is the exact same image deployed (no recompilation)
- **Parallelism** — Multiple CI agents can build and test without interfering
- **Ephemeral test infrastructure** — `docker compose up --abort-on-container-exit` tears down automatically
