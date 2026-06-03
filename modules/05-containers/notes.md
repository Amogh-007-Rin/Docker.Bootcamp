# Module 05 Notes — Containers
[Previous: Module 04 — Images](../04-images/README.md) | [Next: Module 06 — Volumes and Storage](../06-volumes-and-storage/README.md)

## `docker run` flags
**Concept:** `docker run` creates and starts a container with configurable flags.

**Why it exists:** Flags let you control naming, ports, environment, networks, and cleanup.

**How it works internally:** The daemon creates a container from an image and applies runtime configuration.

**Command/Syntax:**
```bash
docker run --name web -d -p 8080:80 nginx:1.27
```
```text
9a8b7c6d5e4f
```

**Real example:**
```bash
docker run --rm -it alpine:3.20 sh
```
```text
/ #
```

**Common flags you use:**
- `--name` sets a readable container name.
- `-d` runs in detached mode.
- `-it` allocates a TTY for interactive sessions.
- `-p` publishes ports to the host.
- `-e` sets environment variables.
- `--rm` removes the container on exit.
- `--restart` defines a restart policy.
- `--network` attaches to a network.
- `--volume` mounts storage.

> 💡 **Pro Tip:** You use `--rm` for one-off tasks to avoid leftover containers.

## Listing containers
**Concept:** You list running and stopped containers with `docker ps`.

**Why it exists:** You need visibility into what is running and what has exited.

**How it works internally:** Docker shows container metadata stored by the daemon.

**Command/Syntax:**
```bash
docker ps
```
```text
CONTAINER ID   NAMES   STATUS
9a8b7c6d5e4f   web     Up 2 minutes
```

**Real example:**
```bash
docker ps -a
```
```text
CONTAINER ID   NAMES   STATUS
1b2c3d4e5f6a   web     Exited (0) 1 minute ago
```

## Viewing logs
**Concept:** `docker logs` shows stdout and stderr from a container.

**Why it exists:** Logs help you debug runtime behavior.

**How it works internally:** Docker captures process output and stores it for retrieval.

**Command/Syntax:**
```bash
docker logs web
```
```text
2026/01/01 09:00:00 [notice] 1#1: start worker processes
```

**Real example:**
```bash
docker logs -f web
```
```text
2026/01/01 09:00:01 [notice] 1#1: start worker process 30
```

## Executing commands
**Concept:** `docker exec` runs a command inside a running container.

**Why it exists:** You need interactive access for debugging.

**How it works internally:** Docker starts a new process in the container’s namespaces.

**Command/Syntax:**
```bash
docker exec web nginx -v
```
```text
nginx version: nginx/1.27.0
```

**Real example:**
```bash
docker exec -it web sh
```
```text
/ #
```

## Stop vs kill
**Concept:** `docker stop` sends SIGTERM, while `docker kill` sends SIGKILL.

**Why it exists:** Graceful shutdown avoids data loss.

**How it works internally:** Docker signals the main process and waits before forcing exit.

**Command/Syntax:**
```bash
docker stop web
```
```text
web
```

**Real example:**
```bash
docker kill web
```
```text
web
```

> ⚠️ **Common Mistake:** You use `docker kill` by default and lose shutdown hooks.

## Inspecting containers
**Concept:** `docker inspect` returns full container metadata in JSON.

**Why it exists:** You need details such as IP, mounts, and config.

**How it works internally:** Docker stores a JSON document per container and exposes it via the API.

**Command/Syntax:**
```bash
docker inspect web --format '{{.NetworkSettings.IPAddress}}'
```
```text
172.17.0.2
```

**Real example:**
```bash
docker inspect web --format '{{.HostConfig.RestartPolicy.Name}}'
```
```text
no
```

## Copying files
**Concept:** `docker cp` copies files between host and container.

**Why it exists:** You move files in and out without rebuilding images.

**How it works internally:** Docker streams files to the container filesystem.

**Command/Syntax:**
```bash
docker cp web:/usr/share/nginx/html/index.html ./index.html
```
```text
```

**Real example:**
```bash
docker cp ./index.html web:/usr/share/nginx/html/index.html
```
```text
```

## Resource awareness (preview)
**Concept:** Containers share host resources but can be limited.

**Why it exists:** Limits prevent one container from starving others.

**How it works internally:** Docker uses cgroups to enforce CPU and memory limits.

**Command/Syntax:**
```bash
docker stats --no-stream
```
```text
CONTAINER ID   CPU %   MEM USAGE / LIMIT
9a8b7c6d5e4f   0.10%   5.2MiB / 1.0GiB
```

**Real example:**
```bash
docker run --rm --memory 256m alpine:3.20 sh -c "echo hi"
```
```text
hi
```

## What’s Next?
You learn how to persist data with volumes in Module 06.

[Previous: Module 04 — Images](../04-images/README.md) | [Next: Module 06 — Volumes and Storage](../06-volumes-and-storage/README.md)
