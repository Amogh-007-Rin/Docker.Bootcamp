# Module 09 Notes — Dockerfile Advanced
[Previous: Module 08 — Docker Compose](../08-docker-compose/README.md) | [Next: Module 10 — Registry and Hub](../10-registry-and-hub/README.md)

## Dockerfile instruction reference
**Concept:** Dockerfiles use a fixed set of instructions to build images.

**Why it exists:** A standard syntax keeps builds predictable and portable.

**How it works internally:** Docker executes each instruction as a layer during build.

**Command/Syntax:**
```dockerfile
FROM alpine:3.20
RUN apk add --no-cache curl
COPY app/ /app
ADD https://example.com/file.txt /app/file.txt
ENV APP_ENV=production
ARG APP_VERSION=1.0
EXPOSE 8080
WORKDIR /app
USER 1000
ENTRYPOINT ["sh", "-c"]
CMD ["echo hello"]
LABEL org.opencontainers.image.source="https://example.com/repo"
HEALTHCHECK CMD curl -f http://localhost:8080/health || exit 1
ONBUILD COPY . /onbuild
STOPSIGNAL SIGTERM
SHELL ["/bin/sh", "-c"]
```

**Real example:**
```bash
docker build -t demo-instructions:1.0 .
```
```text
Successfully built abcdef123456
```

## ENTRYPOINT vs CMD
**Concept:** ENTRYPOINT defines the container’s main executable, CMD provides default arguments.

**Why it exists:** You control whether users can override the command.

**How it works internally:** Docker merges ENTRYPOINT and CMD at run time.

**Command/Syntax:**
```dockerfile
ENTRYPOINT ["node", "server.js"]
CMD ["--port", "8080"]
```

**Real example:**
```bash
docker run demo-instructions:1.0 --port 9090
```
```text
Server listening on 9090
```

> ⚠️ **Common Mistake:** You use shell form for ENTRYPOINT and lose signal handling.

## Build context and `.dockerignore`
**Concept:** The build context is the directory sent to the Docker daemon.

**Why it exists:** Docker needs access to files referenced by COPY and ADD.

**How it works internally:** Docker tars the context and streams it to the daemon.

**Command/Syntax:**
```bash
docker build -t demo-context:1.0 .
```
```text
Sending build context to Docker daemon  12.3kB
```

**Real example:**
```bash
docker build -t demo-context:1.0 -f Dockerfile .
```
```text
Successfully built abcdef123456
```

## Layer caching
**Concept:** Docker caches layers to speed up repeated builds.

**Why it exists:** Cached layers reduce build times and network usage.

**How it works internally:** Each instruction creates a layer keyed by its inputs.

**Command/Syntax:**
```bash
docker build -t demo-cache:1.0 .
```
```text
Using cache
```

**Real example:**
```bash
docker build -t demo-cache:1.0 .
```
```text
Using cache
```

> 💡 **Pro Tip:** You copy dependency files first to maximize cache reuse.

## Multi-stage builds
**Concept:** Multi-stage builds produce smaller runtime images.

**Why it exists:** You keep build tools out of production images.

**How it works internally:** Docker builds multiple stages and copies artifacts into the final stage.

**Command/Syntax:**
```dockerfile
FROM golang:1.22 AS build
WORKDIR /src
COPY . .
RUN go build -o /out/app

FROM gcr.io/distroless/base
COPY --from=build /out/app /app
ENTRYPOINT ["/app"]
```

**Real example:**
```bash
docker build -t demo-multistage:1.0 .
```
```text
Successfully built abcdef123456
```

## BuildKit features
**Concept:** BuildKit adds caching and secret mounts to builds.

**Why it exists:** It speeds up builds and keeps secrets out of images.

**How it works internally:** BuildKit mounts caches and secrets during a build step only.

**Command/Syntax:**
```dockerfile
RUN --mount=type=cache,target=/root/.cache pip install -r requirements.txt
```

**Real example:**
```bash
DOCKER_BUILDKIT=1 docker build -t demo-buildkit:1.0 .
```
```text
Successfully built abcdef123456
```

## Image size optimization
**Concept:** Smaller images start faster and reduce attack surface.

**Why it exists:** Lean images improve CI speed and deployment times.

**How it works internally:** Fewer layers and smaller files reduce image size.

**Command/Syntax:**
```bash
docker image ls demo-multistage:1.0 --format '{{.Size}}'
```
```text
18.2MB
```

**Real example:**
```bash
docker image ls demo-instructions:1.0 --format '{{.Size}}'
```
```text
120MB
```

## What’s Next?
You learn how to tag and push images to registries in Module 10.

[Previous: Module 08 — Docker Compose](../08-docker-compose/README.md) | [Next: Module 10 — Registry and Hub](../10-registry-and-hub/README.md)
