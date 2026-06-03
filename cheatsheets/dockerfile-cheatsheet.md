# Dockerfile Cheatsheet
Reference for Dockerfile instructions, build flags, and optimization patterns.

## Instructions

| Instruction | Purpose | Example |
|---|---|---|
| `FROM` | Base image (first instruction) | `FROM node:22-alpine` |
| `RUN` | Execute command at build time | `RUN npm ci` |
| `COPY` | Copy files from build context | `COPY package.json .` |
| `ADD` | Copy + optional tar extraction | `ADD app.tar.gz /app` |
| `ENV` | Runtime environment variable | `ENV NODE_ENV=production` |
| `ARG` | Build-time variable | `ARG VERSION=1.0` |
| `WORKDIR` | Set working directory | `WORKDIR /app` |
| `EXPOSE` | Document listening port | `EXPOSE 3000` |
| `USER` | Run as non-root user | `USER node` |
| `ENTRYPOINT` | Fixed executable | `ENTRYPOINT ["node"]` |
| `CMD` | Default args / command | `CMD ["server.js"]` |
| `LABEL` | Metadata | `LABEL version="1.0"` |
| `HEALTHCHECK` | Container health probe | `HEALTHCHECK CMD curl -f http://localhost/` |
| `VOLUME` | Declare mount point | `VOLUME /data` |
| `ONBUILD` | Trigger on child build | `ONBUILD COPY . .` |
| `STOPSIGNAL` | Stop signal | `STOPSIGNAL SIGTERM` |
| `SHELL` | Default shell for RUN | `SHELL ["/bin/bash", "-c"]` |

## ENTRYPOINT vs CMD

| Form | Behavior |
|---|---|
| `CMD ["a","b"]` | Default command; overridden by `docker run` args |
| `ENTRYPOINT ["a"]` + `CMD ["b"]` | Fixed entrypoint; `docker run` args append to CMD |
| Shell form `CMD a b` | Runs via `/bin/sh -c`; no JSON exec form |

## Build commands

```bash
docker build -t myapp:1.0 .
docker build --target build-stage -t myapp:build .
docker build --no-cache -t myapp:1.0 .
DOCKER_BUILDKIT=1 docker build .
```

## Multi-stage pattern

```dockerfile
FROM golang:1.22 AS builder
WORKDIR /src
COPY . .
RUN go build -o /out/app .

FROM alpine:3.20
COPY --from=builder /out/app /usr/local/bin/app
USER nobody
ENTRYPOINT ["/usr/local/bin/app"]
```

## BuildKit cache mount

```dockerfile
RUN --mount=type=cache,target=/root/.npm npm ci
```

## Gotchas

1. **Order matters for cache** — Put rarely changing instructions (`COPY package*.json`) before frequently changing ones (`COPY .`).
2. **`.dockerignore`** — Exclude `node_modules`, `.git`, and secrets from the build context.
3. **`EXPOSE` does not publish** — You still need `-p` or Compose `ports` to reach the service from the host.
4. **Shell vs exec form** — Prefer JSON exec form (`["node","app.js"]`) so signals reach your process.
5. **`latest` tag** — Pin base images with a digest or version tag for reproducible builds.

## Deeper reading

- [Module 09 — Dockerfile Advanced](../modules/09-dockerfile-advanced/README.md)
- [Module 11 — Security](../modules/11-security/README.md)
