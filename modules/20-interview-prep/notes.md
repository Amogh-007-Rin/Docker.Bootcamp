# Module 20 Notes — Interview Preparation
[Previous: Module 19 — Real-World Projects](../19-real-world-projects/README.md)

Study guide for Docker interviews. Target stack: **Docker Engine 25+**, **Compose v2** (`docker compose`). Each answer is concise but complete; expand with examples from your own project work when speaking aloud.

---

## 1. Docker fundamentals (10 Q&As)

**Q: What is Docker?**
A: Docker is a platform for packaging applications and dependencies into portable **images**, running them as isolated **containers** on a shared OS kernel. It uses OS-level virtualization (namespaces, cgroups) rather than full hardware VMs.

**Q: What problem does Docker solve?**
A: It eliminates “works on my machine” by shipping the same filesystem and runtime everywhere. Developers, CI, and production run the same image digest, differing only by configuration (env vars, secrets, orchestration).

**Q: Explain the Docker client–server architecture.**
A: The **Docker CLI** (`docker`) talks to the **Docker daemon** (`dockerd`) over a REST API (Unix socket or TCP). The daemon creates containers, manages images/networks/volumes, and delegates to **containerd** and **runc** to start OCI bundles.

**Q: How is a container different from a VM?**
A: A VM runs a guest OS on a hypervisor with separate kernels. A container shares the host kernel and isolates process, network, mount, and other namespaces. Containers start faster and use less memory; VMs provide stronger hardware-level isolation.

**Q: What is the Docker ecosystem beyond Engine?**
A: **Docker Hub** (registry), **Docker Compose** (multi-container apps), **Buildx/BuildKit** (advanced builds), **Docker Scout** (supply chain), **Docker Desktop** (dev UI on Mac/Windows), and orchestrators (**Swarm**, **Kubernetes**) for multi-host scheduling.

**Q: What happens when you run `docker run nginx`?**
A: The client asks the daemon to pull `nginx:latest` if missing, creates a container from the image config, sets up namespaces and cgroups, applies the default bridge network unless overridden, runs the image `CMD`, and returns the container ID (or attaches to stdout in foreground mode).

**Q: What is an OCI image?**
A: An OCI-compliant image is a stack of read-only **layers** plus a **config** JSON (metadata, env, entrypoint). Registries store layers addressed by digest; tags are mutable pointers to manifests.

**Q: Why do companies adopt Docker in CI/CD?**
A: Builds are reproducible, tests run in production-like environments, and promoted artifacts are immutable image digests. Pipelines build once, scan, sign, and deploy the same image across stages.

**Q: What is the difference between Docker Engine and Docker Desktop?**
A: **Engine** is the open-source daemon and CLI on Linux (and the backend on Desktop). **Desktop** adds a GUI, Kubernetes single-node, integrations, and licensing terms on Mac/Windows while using Engine under WSL2/Hyper-V.

**Q: Name three reasons containers are “ephemeral.”**
A: (1) Writable container layer is discarded when the container is removed unless data is in a volume. (2) Replacing a container for deploy is normal—state lives outside. (3) Scaling adds new container instances rather than mutating one long-lived VM disk.

---

## 2. Images and Dockerfile (10 Q&As)

**Q: What is the difference between an image and a container?**
A: An **image** is an immutable template (layers + config). A **container** is a runnable instance of an image with a writable layer, process(es), and runtime settings (name, ports, env).

**Q: What are image layers and why do they matter?**
A: Each Dockerfile instruction that modifies the filesystem creates a layer. Layers are shared and cached; changing an early instruction invalidates cache for later steps. Smaller, ordered layers mean faster builds and pulls.

**Q: Explain `FROM`, `RUN`, `COPY`, and `CMD`.**
A: `FROM` sets the base image. `RUN` executes commands at build time (new layer). `COPY`/`ADD` place files into the image. `CMD` (or `ENTRYPOINT`) defines the default process at **container start** (can be overridden at `docker run`).

**Q: What is a multi-stage build?**
A: Multiple `FROM` stages in one Dockerfile; you copy artifacts from a build stage into a minimal runtime stage. You ship only binaries/assets, not compilers or dev dependencies—smaller attack surface and image size.

**Q: How do tags and digests differ?**
A: A **tag** (e.g. `nginx:1.27`) is a human-readable label that can move. A **digest** (`nginx@sha256:...`) is content-addressable and immutable. Production deploys should pin digests for reproducibility.

**Q: What is BuildKit and when is it used?**
A: BuildKit is the modern build backend in Engine 25+ (default). It enables parallel stages, cache mounts (`RUN --mount=type=cache`), secrets, and improved Dockerfile features. `docker buildx build` exposes multi-platform and remote builders.

**Q: How do you reduce image size in interviews?**
A: Use slim bases (`alpine`, `distroless`), multi-stage builds, combine `RUN` lines, `.dockerignore` to exclude context junk, avoid installing dev tools in the final stage, and remove package manager caches in the same layer.

**Q: What is `.dockerignore` for?**
A: It excludes files from the build **context** sent to the daemon—faster builds, smaller context, and prevents leaking secrets or `node_modules` from the host into unintended layers.

**Q: What is the difference between `CMD` and `ENTRYPOINT`?**
A: `ENTRYPOINT` defines the main executable; `CMD` supplies default arguments. With `ENTRYPOINT`, `docker run image arg` passes `arg` to the entrypoint. `CMD` alone is fully replaceable by `docker run image other-cmd`.

**Q: How do you inspect image history and metadata?**
A: `docker history <image>` shows layers and sizes. `docker inspect <image>` returns JSON config (env, labels, architecture). `docker image ls` lists local images; `docker pull` fetches from a registry.

---

## 3. Containers and lifecycle (10 Q&As)

**Q: List common container states.**
A: **created** (exists, not started), **running**, **paused** (cgroups frozen), **restarted**, **exited** (stopped with exit code), **dead** (daemon could not remove, rare). `docker ps -a` shows non-running containers.

**Q: Explain important `docker run` flags.**
A: `-d` detached, `--name`, `-p host:container` publish ports, `-e` env, `-v` volume, `--network`, `--rm` auto-remove on stop, `--restart` policy, `-it` interactive TTY, `--memory` / `--cpus` limits (see Module 12).

**Q: What is the difference between `docker stop` and `docker kill`?**
A: `stop` sends SIGTERM, waits (default 10s), then SIGKILL—graceful shutdown. `kill` sends SIGKILL immediately—use when the process is hung; risk of corrupting unsaved state.

**Q: How do you get a shell inside a running container?**
A: `docker exec -it <name> sh` (or `bash` if present). `exec` starts a new process in the **existing** namespaces; it is not SSH and does not create a new container.

**Q: How do you view and follow container logs?**
A: `docker logs <container>` shows stdout/stderr. `-f` follows, `--tail 100` limits, `--since 1h` filters. Logging drivers (json-file default, syslog, etc.) configure where logs go at daemon level.

**Q: What does `--restart unless-stopped` do?**
A: The daemon restarts the container on failure or daemon reboot unless you explicitly stopped it. Policies: `no`, `on-failure`, `always`, `unless-stopped`.

**Q: How do you copy files between host and container?**
A: `docker cp container:/path /host/path` and reverse. For development, bind mounts are preferred; `cp` suits one-off recovery or artifacts.

**Q: What is a health check?**
A: Dockerfile `HEALTHCHECK` or Compose `healthcheck` runs a probe command periodically. Orchestrators and load balancers use **healthy** status before sending traffic—important for databases and APIs that need warm-up time.

**Q: Why run containers as a non-root user?**
A: A process running as UID 0 inside the container has more capabilities within the container namespace; combined with kernel bugs or misconfigured mounts, that raises risk. `USER app` in the Dockerfile drops privileges.

**Q: How do you clean up stopped containers and unused images?**
A: `docker container prune`, `docker image prune`, `docker system prune -a` (aggressive—removes unused images). Engine 25+ supports `docker system df` to see reclaimable space first.

---

## 4. Networking (10 Q&As)

**Q: What is the default bridge network?**
A: `bridge` is the default network driver on a single host. Containers get private IPs; published ports map to the host. The default bridge does **not** provide automatic DNS between containers by name—use a **user-defined bridge**.

**Q: Why use a user-defined bridge network?**
A: Containers on the same user-defined network resolve each other by **name** via embedded DNS. Isolation is clearer than linking legacy `--link`.

**Q: Explain `docker network create` and connecting containers.**
A: `docker network create app-net` creates a network. `docker run --network app-net --name api ...` attaches at start, or `docker network connect app-net existing` attaches a running container.

**Q: What is the difference between expose and publish?**
A: `EXPOSE` in a Dockerfile documents a port; **publish** (`-p 8080:80` or Compose `ports`) maps host traffic into the container. Unpublished ports are reachable only on Docker networks, not from the host LAN.

**Q: Name Docker network drivers and one use case each.**
A: **bridge** (single-host apps), **host** (container uses host network stack—performance, no NAT), **none** (no networking), **overlay** (multi-host Swarm/Kubernetes underlay), **macvlan** (container appears as LAN MAC).

**Q: How does DNS work between containers?**
A: Docker’s internal DNS resolver (127.0.0.11 on bridge networks) resolves service/container names to container IPs on that network. Compose service names become DNS names.

**Q: What is a network alias?**
A: An extra DNS name for a container on a network (`docker run --network net --network-alias db ...`). Compose `networks: aliases:` does the same for service discovery.

**Q: When would you use `host` network mode?**
A: When you need maximum network performance or must bind many ports without publishing—common for monitoring agents or legacy apps. You lose network isolation between containers on that host.

**Q: How do you troubleshoot “connection refused” between containers?**
A: Verify both on the same network (`docker inspect`), ping by **service name** not `localhost`, check the app listens on `0.0.0.0` not `127.0.0.1`, confirm target port and health, and check firewall on the host for published ports only.

**Q: How does port publishing work with Compose?**
A: Short syntax `"8080:80"` maps host 8080 to container 80. Long syntax can set `protocol`, `mode: host`. Only the **host** port needs to be unique; container ports can overlap across containers if not published to the same host port.

---

## 5. Volumes and storage (10 Q&As)

**Q: Why is the container filesystem alone insufficient for databases?**
A: Data in the writable layer is lost when the container is removed. Databases need durable storage survives redeploys and image upgrades.

**Q: Compare bind mounts, named volumes, and tmpfs.**
A: **Bind mount** maps a host path into the container—great for dev hot-reload. **Named volume** is managed by Docker—portable, backup-friendly, preferred for DB data in prod. **tmpfs** is memory-backed—fast, non-persistent, good for secrets/cache.

**Q: How do you create and inspect a volume?**
A: `docker volume create pgdata`, `docker volume ls`, `docker volume inspect pgdata` shows mountpoint on the host (Linux: under `/var/lib/docker/volumes/...`).

**Q: How do you mount a volume in `docker run`?**
A: `-v pgdata:/var/lib/postgresql/data` named volume, or `-v /host/data:/app/data` bind mount. Compose uses top-level `volumes:` and service `volumes:` keys.

**Q: Can two containers share one volume?**
A: Yes—attach the same named volume to multiple containers (read/write caution for databases; use DB clustering instead of dual-write unless designed for it).

**Q: How do you back up a named volume?**
A: Run a temporary container that mounts the volume and archives: `docker run --rm -v pgdata:/data -v $(pwd):/backup alpine tar czf /backup/pgdata.tgz /data`. Restore by extracting into a new volume.

**Q: What is a volume driver?**
A: Plugins (local default, cloud NFS, etc.) implement how volume data is stored. Swarm and enterprise setups use drivers for shared storage across nodes.

**Q: What goes wrong if you bind-mount over application binaries?**
A: You hide image files with host directories—empty host folders make the app “vanish.” Mount only data directories, not the entire `/app` unless dev workflow requires it.

**Q: How does Compose declare persistent storage?**
A: Define `volumes: db_data:` at file root; under service `volumes: - db_data:/var/lib/postgresql/data`. `docker compose down -v` **deletes** named volumes—dangerous in prod scripts.

**Q: When use tmpfs mounts?**
A: Sensitive temp files, test scratch space, or reducing disk I/O. Data disappears when the container stops—never sole store for business data.

---

## 6. Docker Compose (10 Q&As)

**Q: What is Docker Compose?**
A: A tool (v2 CLI plugin: `docker compose`) for defining and running multi-container applications in YAML—services, networks, volumes, configs, secrets—on a single Docker host (or Swarm stack deploy with compose spec).

**Q: Compose v1 vs v2—what should you say in 2026?**
A: Use **v2** (`docker compose`). v1 standalone `docker-compose` is legacy; Engine 25+ documentation assumes the plugin.

**Q: What are the main keys in a Compose file?**
A: `services` (containers), `image`/`build`, `ports`, `environment`/`env_file`, `volumes`, `networks`, `depends_on`, `healthcheck`, `deploy` (Swarm), `profiles` for optional services.

**Q: What does `depends_on` do—and not do?**
A: It controls **start order** only. It does **not** wait until Postgres accepts connections—use `healthcheck` + `depends_on: condition: service_healthy` (Compose spec v2+) or retry logic in the app.

**Q: How do you override files for dev vs prod?**
A: Multiple files: `docker compose -f compose.yml -f compose.prod.yml up`. Later files merge/override. `.env` supplies variable defaults for interpolation.

**Q: How do you scale a service with Compose?**
A: `docker compose up -d --scale api=3` on a single host (port conflicts if publishing same host port—use a load balancer service). Swarm uses `deploy.replicas`.

**Q: Useful Compose commands for interviews?**
A: `docker compose up -d`, `down`, `ps`, `logs -f service`, `exec service sh`, `config` (validate/render), `pull`, `build`, `run --rm service cmd` for one-off tasks.

**Q: How are environment variables set?**
A: `environment:` map, `env_file:`, or shell interpolation `${VAR}` from `.env`. Build-time args use `build.args` not service `environment` for image build.

**Q: What is a Compose profile?**
A: `profiles: [debug]` on a service; it starts only when you `docker compose --profile debug up`—keeps optional tools out of default stacks.

**Q: How do you debug a failing Compose stack?**
A: `docker compose ps`, `docker compose logs api`, `docker compose config`, inspect individual containers, verify networks/volumes, recreate with `docker compose up -d --force-recreate`.

---

## 7. Security (10 Q&As)

**Q: Why is “containers are not VMs” a security talking point?**
A: Shared kernel means a container escape or kernel CVE can affect the host. Defense in depth: minimal images, non-root, read-only rootfs, seccomp/AppArmor profiles, no unnecessary capabilities.

**Q: What is `--read-only` on `docker run`?**
A: Root filesystem is read-only; writable paths need tmpfs or mounted volumes. Reduces malware persistence and accidental writes.

**Q: What capabilities does dropping `CAP_NET_RAW` help with?**
A: Reduces risk of raw packet tricks (some ARP/spoofing attacks). Use `--cap-drop ALL` and add only required caps, or default profiles in orchestrators.

**Q: Why is mounting the Docker socket dangerous?**
A: Any process with socket access can instruct the host daemon to start **privileged** containers, mount host paths, and effectively gain root on the host—common CI/CD risk.

**Q: How do you scan images for vulnerabilities?**
A: `docker scout cves myimage:tag`, Trivy (`trivy image`), or registry-side scanning. Fix by rebuilding base images and upgrading dependencies; pin digests after verification.

**Q: What are secrets in Compose/Swarm context?**
A: Swarm **secrets** are encrypted at rest and mounted as files in memory-backed tmpfs in services. In plain Compose on one host, prefer external secret managers—not plain `.env` in git.

**Q: What is rootless Docker?**
A: `dockerd` runs as an unprivileged user mapping UIDs with subuid/subgid. Stronger host isolation; some features (certain ports <1024, GPUs) need extra setup.

**Q: How do you avoid leaking secrets in images?**
A: Use BuildKit secret mounts (`RUN --mount=type=secret`), never `ENV API_KEY=...` for real keys, multi-stage builds so secrets never reach final layers, and scan history with `docker history`.

**Q: What is image signing?**
A: Docker Content Trust / Notation signs images so consumers verify publisher identity before pull—supply chain control in regulated environments.

**Q: Name three production security habits.**
A: Pin base image digests, run as non-root, scan in CI on every build, network segmentation (DB not on public network), least-privilege registry tokens, and regular Engine patches.

---

## 8. Orchestration — Swarm and Kubernetes basics (10 Q&As)

**Q: When is single-host Docker enough?**
A: Dev, small internal tools, and simple Compose deployments. You need orchestration when you require multi-host scheduling, rolling updates across many nodes, self-healing replicas, and declarative desired state.

**Q: What is Docker Swarm mode?**
A: Native clustering: managers run Raft consensus; workers run tasks. `docker swarm init`, `docker service create`, overlay networks span nodes. Simpler than Kubernetes, less ecosystem depth.

**Q: What is a Swarm service vs container?**
A: A **service** is the desired state (image, replicas, update config); the scheduler places **tasks** (containers) on nodes. `docker service ls` / `docker service ps`.

**Q: What is Kubernetes relative to Docker?**
A: Kubernetes schedules **pods** (one or more containers) across a cluster using CRI runtimes (containerd). Docker knowledge maps to: image, workload, Service, Ingress, ConfigMap, Secret, PersistentVolume.

**Q: What is an overlay network in Swarm?**
A: Multi-host virtual network; VXLAN encapsulation lets services on different nodes communicate by name on the same overlay.

**Q: Explain rolling updates in Swarm.**
A: `docker service update --image myapp:v2` replaces tasks incrementally per `update-config` (parallelism, delay, failure action `rollback`).

**Q: What is a Kubernetes Pod?**
A: Smallest deploy unit—shared network namespace and optional volumes. Interview line: “Pod wraps one or more containers that must co-locate.”

**Q: How does Docker Desktop Kubernetes help learners?**
A: Enables a local single-node cluster (kind/kubeadm-based depending on version) to practice `kubectl` without cloud cost—bridge from `docker compose` to K8s manifests.

**Q: What is the role of a container runtime in K8s?**
A: kubelet talks CRI to **containerd** (or others); containerd pulls images and starts containers—same OCI images Docker builds.

**Q: Swarm vs Kubernetes—quick comparison?**
A: Swarm: integrated with Docker CLI, faster learning curve, declining greenfield use. Kubernetes: industry standard, vast ecosystem, steeper ops—choose K8s for large platform teams; Swarm for legacy Docker shops or learning stepping stone.

---

## 9. CI/CD with Docker (5 Q&As)

**Q: What should a minimal Docker CI pipeline do?**
A: Checkout → build test image → run tests in container → build production image → scan (optional) → push tagged image to registry on protected branch → deploy by digest.

**Q: Why run tests inside a container in CI?**
A: The test environment matches the image you ship—same libc, Node version, and env as production—not whatever packages happen to be on the Jenkins/GitHub runner host.

**Q: How do GitHub Actions cache Docker layers?**
A: `docker/build-push-action` with `cache-from` / `cache-to` `type=gha` or registry cache tags; BuildKit stores layer metadata between workflow runs.

**Q: DinD vs Docker socket in CI—interview answer?**
A: **Socket**: fast, uses host daemon, but untrusted jobs can compromise the host. **DinD**: isolated daemon per job, needs privileged mode, more ops overhead. Alternatives: Kaniko, remote BuildKit, or cloud-native builders.

**Q: What registry credentials pattern is correct?**
A: Short-lived access tokens in CI secrets (`DOCKERHUB_TOKEN`), login via `docker/login-action` or Jenkins credentials binding—never commit passwords; tag with git SHA for traceability.

---

## 10. Scenario-based / system design (10 questions)

**Q1: Design Docker deployment for a three-tier web app (React, API, PostgreSQL).**
A: **Images:** multi-stage React→nginx frontend; API multi-stage with non-root `USER`; official or slim Postgres with volume. **Compose:** three services on `app-net`; only frontend publishes `443:443` or `8080:80`; API internal; DB no published ports. **Volumes:** named `pgdata` for Postgres. **Config:** env for `DATABASE_URL`, secrets via env file not in git. **Ops:** healthchecks on API and DB; `depends_on` with healthy condition; CI builds/pushes API and frontend images; deploy pinned digests. **Scale path:** move to K8s Ingress + Deployment + StatefulSet or managed RDS instead of containerized DB at scale.

**Q2: A container exits immediately with code 0—how do you debug?**
A: Check `CMD`/`ENTRYPOINT`—app may have nothing to run. `docker logs container`, `docker inspect` → `State` and `Config.Cmd`. Run interactively: `docker run -it --entrypoint sh image` and start the process manually. For Compose, verify command override and that the process is foregrounded (PID 1).

**Q3: Production API is slow after Docker migration—what do you check?**
A: Resource limits too low (`docker stats`), missing connection pooling to DB, logging driver overhead, overlay network MTU issues, volume I/O on bind mounts vs local SSD, image too large causing slow pulls on scale-out, and misconfigured `localhost` instead of service DNS for dependencies.

**Q4: How would you achieve zero-downtime deploy with Docker?**
A: Single host: blue/green with two Compose projects and switch reverse proxy upstream, or rolling `docker compose up` with two API containers behind nginx upstream and health checks. Multi-host: Swarm `update-config` or Kubernetes RollingUpdate with readiness probes—never rely on `docker stop` alone without a load balancer drain.

**Q5: Your CI pipeline pushes `latest` only—what is wrong?**
A: `latest` is mutable—you cannot know what runs in prod or roll back precisely. Push immutable tags (`git SHA`, semver) and deploy by digest; keep `latest` optional for dev only.

**Q6: Security audit found containers running as root—remediation plan?**
A: Add `USER` in Dockerfile, fix filesystem permissions with `chown` in build stage, read-only rootfs where possible, drop caps, scan images, enforce policy in admission (K8s PSP/OPA) or CI lint (hadolint, conftest).

**Q7: Two microservices cannot communicate—walkthrough?**
A: Confirm same user-defined network, correct DNS name (`orders` not `localhost`), target port matches `EXPOSE`/listen address `0.0.0.0`, firewall, and that neither crashed (`docker compose ps`). `docker exec api ping orders` or `wget orders:5000/health`.

**Q8: How do you handle secrets for twelve microservices?**
A: Avoid baking into images; use orchestrator secrets (Swarm secrets, K8s Secrets + external vault), inject at runtime; rotate tokens; separate CI registry creds from app DB passwords; audit `.env` not in VCS.

**Q9: When would you not containerize a database?**
A: When you need managed backups, HA failover, and DBA tooling—use RDS/Cloud SQL/Azure Database. Containerized Postgres is fine for dev, CI, and small prod with clear backup/restore discipline.

**Q10: Explain how you would migrate a VM monolith to Docker incrementally.**
A: Phase 1: Dockerfile for the monolith, run on Compose with existing VM DB connection. Phase 2: extract stateless pieces into separate images behind nginx. Phase 3: introduce registry + CI. Phase 4: orchestrator for multi-instance. Always measure parity (load test, logs) before cutover; keep rollback VM snapshot until digests are proven.

---

## Quick Revision Cheatsheet

| Topic | Must-know |
|---|---|
| **Architecture** | CLI → dockerd → containerd → runc; images vs containers |
| **Lifecycle** | pull → create → start → stop → rm; `stop` vs `kill` |
| **Images** | Layers, cache order, multi-stage, digest > tag for prod |
| **Dockerfile** | `FROM RUN COPY CMD ENTRYPOINT USER HEALTHCHECK` |
| **Run flags** | `-d -p -e -v --name --rm --network --restart` |
| **Networking** | User-defined bridge = DNS by name; publish vs expose |
| **Storage** | Named volume for DB; bind for dev; `down -v` deletes data |
| **Compose** | `docker compose up/down/ps/logs/config`; `depends_on` ≠ ready |
| **Security** | Non-root, scan, no socket in untrusted CI, read-only FS |
| **Orchestration** | Swarm services/tasks; K8s pods/deployments/services |
| **CI/CD** | Test in image; Buildx cache; push SHA; registry tokens |
| **Engine 25+** | BuildKit default; `docker compose` v2 plugin |
| **Cleanup** | `docker system df`; prune containers/images carefully |
| **Troubleshooting** | `logs`, `inspect`, `exec`, `ps -a`, network DNS |

**One-liners interviewers love:**
- “Image is template, container is instance.”
- “Default bridge has no name DNS—use custom network.”
- “Data survives in volumes, not container layer.”
- “CI should push immutable tags, not only `latest`.”
- “Docker socket in CI ≈ root on the host.”

---

## What’s Next?
You have completed the linear **Docker Mastery** curriculum. Revisit weak modules, redo [real-world projects](../19-real-world-projects/README.md), contribute fixes via [CONTRIBUTING.md](../../CONTRIBUTING.md), and keep Engine updated—note breaking changes in release notes when moving past 25.x.

[Previous: Module 19 — Real-World Projects](../19-real-world-projects/README.md)
