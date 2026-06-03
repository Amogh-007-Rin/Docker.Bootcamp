# Interview Flashcards — Quick Reference Cards

Cut these out (or copy to index cards / Anki) for rapid recall. Each card has a question on one side and the answer on the other.

---

## Card 1 — Architecture
**Front:** What are the four main components of the Docker architecture?
**Back:** **CLI** → **dockerd** (daemon) → **containerd** (container lifecycle) → **runc** (OCI runtime). The CLI sends REST API commands to the daemon; the daemon manages images, networks, volumes, and delegates to containerd to create containers via runc.

---

## Card 2 — Image vs Container
**Front:** Explain the difference between an image and a container in one sentence.
**Back:** An **image** is an immutable template (layers + config); a **container** is a runnable instance with a writable layer, process, and resource limits.

---

## Card 3 — Multi-stage builds
**Front:** What problem does a multi-stage Dockerfile solve?
**Back:** It produces a small production image by copying only build artifacts into a minimal runtime stage, excluding compilers, dev dependencies, and intermediate files. Attack surface and image size shrink dramatically.

---

## Card 4 — Dockerfile key instructions
**Front:** Name five essential Dockerfile instructions and what they do.
**Back:** `FROM` (base image), `RUN` (build-time command, new layer), `COPY` (add files), `CMD` (default runtime command), `ENTRYPOINT` (main executable, can receive `CMD` args). Bonus: `USER` for non-root, `HEALTHCHECK` for readiness.

---

## Card 5 — Layer caching
**Front:** How does Docker cache layers and how do you maximize cache hits?
**Back:** Each instruction produces a cached layer. Order from least-changing to most-changing: base image → package manifests → `RUN install` → source code → final config. Changing an early instruction invalidates all downstream cache.

---

## Card 6 — BuildKit
**Front:** What is BuildKit and why does it matter in Engine 25+?
**Back:** BuildKit is the default build backend that enables parallel stage execution, cache mounts (`RUN --mount=type=cache`), secret mounts, multi-platform builds, and improved Dockerfile feature support via `docker buildx`.

---

## Card 7 — Container lifecycle
**Front:** List the states a container can be in.
**Back:** `created`, `running`, `paused`, `restarted`, `exited` (exit code), `dead`. `docker ps -a` shows all states; `docker ps` shows only running.

---

## Card 8 — docker stop vs docker kill
**Front:** What is the difference between `docker stop` and `docker kill`?
**Back:** `stop` sends SIGTERM, waits 10s (configurable), then SIGKILL—graceful shutdown. `kill` sends SIGKILL immediately; use when the process is hung and you accept potential state loss.

---

## Card 9 — User-defined bridge vs default bridge
**Front:** Why should you create a user-defined bridge network for multi-container apps?
**Back:** Containers on a user-defined bridge resolve each other by **DNS name**. The default bridge requires `--link` (legacy) or IP lookups, and does not provide automatic name resolution.

---

## Card 10 — Port publish vs expose
**Front:** What is the difference between `EXPOSE` and `-p` / `ports:`?
**Back:** `EXPOSE` is documentation only (no network effect). `-p 8080:80` or Compose `ports:` **publishes** the port on the host, making the container reachable from outside Docker.

---

## Card 11 — Named volumes vs bind mounts
**Front:** When would you use a named volume instead of a bind mount?
**Back:** Named volumes are managed by Docker (portable, backup-friendly) and preferred for database data in production. Bind mounts map a specific host path and are best for development hot-reload.

---

## Card 12 — Docker Compose depends_on
**Front:** What does `depends_on` guarantee—and what does it not guarantee?
**Back:** It guarantees **start order** only. It does **not** wait for the service to be ready (accept connections). Combine with `healthcheck` + `condition: service_healthy` for true readiness.

---

## Card 13 — Security: non-root user
**Front:** Why should you run containers as a non-root user even though they are "isolated"?
**Back:** A process running as UID 0 inside the container has elevated capabilities within the kernel namespace. Combined with a kernel CVE or misconfigured mount, an attacker can escape or damage the host.

---

## Card 14 — Docker socket risk
**Front:** Why is mounting `/var/run/docker.sock` into a container dangerous?
**Back:** Any process with socket access can instruct the daemon to start privileged containers, mount host paths, and effectively execute arbitrary commands as root on the host. Socket access ≈ root access.

---

## Card 15 — CI/CD immutable tags
**Front:** Why should CI/CD pipelines tag images with the Git commit SHA instead of `latest`?
**Back:** `latest` is mutable—you cannot know what exact code runs in production or roll back to a known good version. A SHA tag (`app:abc123`) is immutable and traceable to the exact source commit.

---

## Card 16 — Rootless Docker
**Front:** What is rootless Docker and what tradeoff does it make?
**Back:** `dockerd` runs as an unprivileged user using subuid/subgid mapping. It improves host security isolation but loses some features: ports <1024 require extra setup, overlay networks and some storage drivers have limitations.

---

## Card 17 — HEALTHCHECK endpoint
**Front:** What does `HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost/health` do?
**Back:** Docker pings the `/health` endpoint every 30s. If the command exits non-zero for 3 consecutive checks, the container state becomes `unhealthy`. Orchestrators use this to stop routing traffic and restart the container.

---

## Card 18 — Container exit code 0 immediately
**Front:** A container exits immediately with code 0. What do you check?
**Back:** Check `CMD`/`ENTRYPOINT`—the process may exit immediately (e.g., a script that runs and finishes). Run `docker logs <container>`, inspect `State` and `Config.Cmd` in `docker inspect`. Test interactively: `docker run -it --entrypoint sh <image>`.

---

## Card 19 — Between-container communication failure
**Front:** Two Compose services cannot connect. What is your first debug step?
**Back:** Confirm they are on the same user-defined network (`docker compose config`), use the correct DNS name (service name, not `localhost`), the target app listens on `0.0.0.0`, and both are healthy. `docker exec <service> sh` and `wget` / `ping` the other service name.

---

## Card 20 — Zero-downtime deploy
**Front:** How do you deploy a new image version with zero downtime on a single host?
**Back:** Blue/green: run two Compose projects or two containers behind an nginx reverse proxy. Update the proxy upstream to point to the new version, health-check, then remove the old. Rolling: `docker compose up -d --scale api=2` with health checks and a load balancer.

---

## Card 21 — Production-ready Dockerfile checklist
**Front:** Name five things a production Dockerfile should have beyond basic instructions.
**Back:** (1) Multi-stage build, (2) non-root `USER`, (3) `HEALTHCHECK`, (4) `.dockerignore`, (5) no secrets in layers. Bonus: pin base image digests, use `COPY --chown`, order install layers by change frequency.

---

## Card 22 — docker system prune
**Front:** What does `docker system prune -a --volumes` do—and what is the risk?
**Back:** It removes all stopped containers, unused networks, dangling and unreferenced images, and **all volumes** not used by at least one container. Risk: you permanently lose database data or cached build artifacts that live only in volumes. Run `docker system df` first.

---

## Card 23 — Engine 25+ differences
**Front:** What Docker changes should you be aware of in Engine 25+?
**Back:** BuildKit is the default builder; `docker build` now behaves like `docker buildx build`. Compose v2 (`docker compose`) replaces the legacy v1 (`docker-compose`). The `docker scout` CLI is integrated for CVE scanning.

---

## Card 24 — Registry TLS and insecure registries
**Front:** Why does `docker push localhost:5000/myimage` fail with an HTTPS error?
**Back:** Docker requires TLS for all registry communication except localhost. Add `"insecure-registries": ["my-registry.example.com:5000"]` to the daemon config, or (preferred) configure TLS on the registry with a certificate.

---

## Card 25 — OCI image layers
**Front:** What are OCI image layers and how are they stored?
**Back:** Each layer is a tar archive of filesystem changes, addressed by a content-addressable digest (SHA-256). Layers are stored in the registry as blobs and assembled at pull time into a merged filesystem using overlay2 (or another snapshotter).
