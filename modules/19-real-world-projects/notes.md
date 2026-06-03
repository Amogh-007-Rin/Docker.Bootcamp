# Module 19 Notes — Real-World Projects
[Previous: Module 18 — CI/CD Pipelines](../18-cicd-pipelines/notes.md) | [Next: Module 20 — Interview Prep](../20-interview-prep/notes.md)

## Purpose of real-world projects as a learning tool
**Concept:** Module 19 is a project hub—eight production-style Docker repositories that combine everything from Modules 00–18 into hands-on practice.

**Why it exists:** Reading about multi-stage builds, Compose, networks, and CI/CD is not the same as debugging a broken `docker compose up` or tracing why two containers cannot talk. Projects force you to apply each concept, encounter realistic failures, and develop muscle memory for the Docker CLI.

**How it works internally:** Each project ships a README with architecture, a walkthrough of sequential commands, a Dockerfile (or multiple), a `docker-compose.yml`, and application code. You build, run, test, tear down, and optionally extend each one.

**Command/Syntax:**
```bash
cd projects/project-01-nodejs-app
docker compose up -d --build
curl http://localhost:3000/health
```
```text
{"status":"ok"}
```

**Real example:** After completing Project 01, you have run a multi-stage Node.js image, mounted a Postgres volume, set up a health check, and used Compose to orchestrate two services—exactly the pattern your future team's microservice will follow.

> 💡 **Pro Tip:** After each project, `docker system df` to see space used by images, containers, and build cache. Run `docker system prune -a --volumes` between projects to reclaim 2–4 GB.

---

## How to approach project-based learning

**Concept:** Follow the walkthrough exactly once, then break and fix things deliberately.

**Why it exists:** Passive reading produces shallow understanding. Deliberate practice—changing one variable, observing the outcome, and debugging—builds durable skill.

**How it works internally:**

1. **Read** the project README and architecture diagram first.
2. **Run** every walkthrough command without skipping verification steps.
3. **Tweak** one thing: change a port mapping, rename a network, use a different base image tag.
4. **Break** something on purpose: set a wrong `DATABASE_URL`, stop a dependency container, remove a volume while the app is running.
5. **Document** what you observed in a notebook or markdown file.

**Command/Syntax:**
```bash
# Break approach: stop Postgres while the app runs
docker compose stop db
curl http://localhost:3000/users
```
```text
{"error":"ECONNREFUSED"}
```

**Real example:** Many learners discover that `depends_on` does Not wait for Postgres readiness until they remove a health check and see the API crash-loop on startup.

> ⚠️ **Common Mistake:** You rush through all eight projects in one sitting. Space them over several days; your brain consolidates skill during sleep. Aim for one project per session.

---

## Docker patterns used across all 8 projects

### Multi-stage builds
Every application project uses at least two stages: a **deps** or **build** stage for dependencies and compilation, and a **runtime** stage with only what is needed to run.

| Project | Stages | Runtime base | User |
|---|---|---|---|
| 01 — Node.js | `deps` → `runtime` | `node:22-alpine` | Non-root `app` |
| 02 — Flask | `deps` → (implicit runtime) | `python:3.12-slim` | Non-root `appuser` |
| 03 — React | `build` → (nginx stage) | `nginx:1.27-alpine` | Default (nginx) |
| 04 — Microservices | Varies per service | `node:22-alpine` / `python:3.12-slim` | Non-root |
| 05 — ML Serving | `deps` → `runtime` | `python:3.12-slim` | Non-root |
| 06 — CI/CD (GH Actions) | Builds the Project 01 image in CI | `node:22-alpine` | Non-root |
| 07 — CI/CD (Jenkins) | Same via Jenkinsfile | `node:22-alpine` | Non-root |
| 08 — Cloud Deployment | Reuses microservices images | — | — |

**Why it exists:** Multi-stage images are 5–10× smaller than single-stage dev images, reducing pull time, attack surface, and registry storage cost.

### Docker Compose
All eight projects define or reference a Compose file for local development. Common services: app, database (Postgres, Redis), reverse proxy (nginx), and CI tools (Jenkins).

**How it works internally:** Compose creates a user-defined network on `up` so services resolve each other by DNS name. Named volumes persist database data across restarts.

### Networking
Projects 04 and 08 demonstrate user-defined bridge networks with service discovery. The gateway (nginx) is the only service that publishes a host port; backend services communicate over the internal network.

### CI/CD
Projects 06 and 07 wire the Project 01 app into automated build-test-push pipelines. Key patterns:
- Build a `test` image stage in CI, run tests, then build the production image only on main branch pushes.
- Use short-lived registry tokens stored as secrets.
- Tag images with the Git commit SHA for immutable traceability.

### Cloud deployment
Project 08 deploys the microservices stack to AWS ECS Fargate, Google Cloud Run, and Azure Container Instances. Patterns:
- Push images to a cloud registry (ECR, Artifact Registry, ACR).
- Use cloud-specific Compose or `ecs-cli` / `gcloud run` / `az container` commands.
- Each provider walkthrough includes IAM/service-account setup.

> 💡 **Pro Tip:** Pick one project (01 or 04) and containerize a real side project you own. Forking the pattern to your own code cements the skill better than any walkthrough.

---

## Tips for extending each project

| Project | Extension idea | Skills practiced |
|---|---|---|
| 01 — Node.js | Add a second API endpoint (`PUT /users/:id`) | Dockerfile rebuild, port mapping |
| 02 — Flask | Add Celery worker + Redis queue | Multi-service Compose, worker pattern |
| 03 — React | Add a second build `ARG` for analytics ID | Build args, rebuild, nginx config |
| 04 — Microservices | Add a fourth service (Go or Rust API) | Cross-language Dockerfile, network DNS |
| 05 — ML Serving | Switch to ONNX runtime or TensorFlow Serving | Heavier dependencies, model versioning |
| 06 — GH Actions | Add a `docker scout` scan step | CI security scanning, GitHub secrets |
| 07 — Jenkins | Add a Slack notification stage | Jenkins plugins, post-build actions |
| 08 — Cloud | Deploy the Node.js app instead of microservices | Adapting walkthroughs to new app |

---

## Module 19 reference table

| Concept | Key command / file |
|---|---|
| Start a project stack | `docker compose up -d --build` |
| Tear down | `docker compose down -v` |
| Rebuild single service | `docker compose up -d --build <service>` |
| Follow logs | `docker compose logs -f <service>` |
| Exec into service | `docker compose exec <service> sh` |
| Validate Compose file | `docker compose config` |
| Clean up disk | `docker system prune -a --volumes` |
| Image history | `docker history <image>:<tag>` |
| Image layers | `docker inspect <image>` |

---

## What's Next?
After completing all eight projects (or at least Projects 01, 04, and 06–07), move to [Module 20 — Interview Prep](../20-interview-prep/notes.md). You will have concrete, hands-on stories to tell when interviewers ask "Tell me about a time you used Docker in a project."

[Previous: Module 18 — CI/CD Pipelines](../18-cicd-pipelines/notes.md) | [Next: Module 20 — Interview Prep](../20-interview-prep/notes.md)
