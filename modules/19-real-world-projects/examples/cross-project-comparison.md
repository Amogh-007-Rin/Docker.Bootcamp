# Cross-Project Dockerfile Comparison

A side-by-side comparison of Dockerfile patterns across the 8 projects in this repository.

## Stage structure

| Project | Stages | Base image(s) | Final image size (approx) |
|---|---|---|---|
| 01 — Node.js | `deps` → `runtime` | `node:22-alpine` | ~180 MB |
| 02 — Flask | `deps` → runtime (same FROM) | `python:3.12-slim` | ~170 MB |
| 03 — React | `build` → (nginx stage) | `node:22-alpine` + `nginx:1.27-alpine` | ~45 MB |
| 04 — Microservices | 1–2 stages per service | `node:22-alpine`, `python:3.12-slim`, `nginx:1.27-alpine` | 45–180 MB each |
| 05 — ML Serving | `deps` → `runtime` | `python:3.12-slim` | ~400 MB |
| 06 — GH Actions | Reuses 01's Dockerfile | `node:22-alpine` | ~180 MB |
| 07 — Jenkins | Reuses 01's Dockerfile | `node:22-alpine` | ~180 MB |
| 08 — Cloud | Reuses 04's images | — | — |

## Layer ordering analysis

Projects 01, 02, and 05 follow the recommended pattern: **least-changing layers first** (package manifests), then source code. This maximizes BuildKit cache reuse.

| Layer order | 01 Node.js | 02 Flask | 03 React |
|---|---|---|---|
| 1 | Base image | Base image | Base image |
| 2 | `package.json` (cache buddy) | `requirements.txt` | `ARG` / `ENV` |
| 3 | `npm install` | `pip install` | Source copy |
| 4 | Source copy | Source copy | `npm run build` |
| 5 | `USER`, `HEALTHCHECK`, `CMD` | `USER`, `CMD` | — |

**Observation:** Project 03 places `ARG`/`ENV` early because build-time config rarely changes between builds; source code changes trigger only the final layer.

## Non-root user presence

| Project | Non-root user | Instruction |
|---|---|---|
| 01 — Node.js | Yes | `RUN addgroup -S app && adduser -S app -G app` → `USER app` |
| 02 — Flask | Yes | `RUN useradd -r appuser` → `USER appuser` |
| 03 — React | Implicit | nginx official image runs as `nginx` user by default |
| 04 — Microservices | Yes | Varies per service (follows 01/02 pattern) |
| 05 — ML Serving | Yes | `RUN useradd -r modeluser` → `USER modeluser` |
| 06–08 | Inherits from upstream | — |

## HEALTHCHECK usage

| Project | HEALTHCHECK present | Probe command |
|---|---|---|
| 01 — Node.js | Yes | `wget -qO- http://127.0.0.1:3000/health \|\| exit 1` |
| 02 — Flask | No | — |
| 03 — React | No | — |
| 04 — Microservices | Depends on service | nginx has no healthcheck; API services vary |
| 05 — ML Serving | No | — |

> 💡 **Pro Tip:** Add `HEALTHCHECK` to projects 02, 03, and 05 as an exercise. Use `curl` (install if missing) or `wget` against the app's health endpoint.

## ENTRYPOINT vs CMD

| Project | Command pattern |
|---|---|
| 01 — Node.js | `CMD ["node", "server.js"]` |
| 02 — Flask | `CMD ["gunicorn", "-b", "0.0.0.0:5000", "wsgi:app"]` |
| 03 — React | Default nginx `CMD` (no override) |
| 04 — Microservices | Varies per service |
| 05 — ML Serving | `CMD ["python", "serve.py"]` |

None of the projects override `ENTRYPOINT`; they all use `CMD` alone. An `ENTRYPOINT` could be useful for adding a wrapper script that checks environment prerequisites before starting the app.

## BuildKit cache mounts (RUN --mount=type=cache)

None of the current projects use BuildKit cache mounts. This is a optimization opportunity for learners:

```dockerfile
RUN --mount=type=cache,target=/root/.cache/pip pip install --no-cache-dir -r requirements.txt
```

Adding `--mount=type=cache` would speed up rebuilds when `requirements.txt` changes by preserving the pip download cache across builds.

## Summary

- The consistent pattern across all projects: **multi-stage, slim base, non-root user**.
- Projects 01 and 04 are the most feature-complete (health checks, Compose, multiple services).
- Projects 03 and 05 have the most room for improvement (add health check, cache mounts).
- CI/CD projects (06–07) and cloud (08) inherit from the application Dockerfiles, proving the value of a well-structured base image.
