# Resource Limits with Docker Compose

Compose v2 maps service-level limits to the same cgroup controls as `docker run`.

## compose.yaml

Use `compose-limits.yaml` in this folder (or copy the snippet below):

```yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    deploy:
      resources:
        limits:
          cpus: "0.50"
          memory: 128M
        reservations:
          memory: 64M
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://127.0.0.1/"]
      interval: 10s
      timeout: 3s
      retries: 3

  stress:
    image: alpine:3.20
    command: ["sh", "-c", "while true; do :; done"]
    deploy:
      resources:
        limits:
          cpus: "0.25"
          memory: 32M
```

> Note: `deploy.resources` limits apply fully in Swarm mode. On plain `docker compose up`, use extension fields or `mem_limit` / `cpus` if your Compose version maps them—verify with `docker compose config`.

## Plain Compose alternative (engine-local limits)

```yaml
services:
  web:
    image: nginx:alpine
    mem_limit: 128m
    cpus: 0.5
```

## Start stack

```bash
docker compose -f compose-limits.yaml up -d
```
```text
[+] Running 2/2
 ✔ Container examples-web-1     Started
 ✔ Container examples-stress-1  Started
```

## Watch stats

```bash
docker stats --no-stream
```
```text
CONTAINER ID   NAME                CPU %     MEM USAGE / LIMIT
...
```

## Validate config

```bash
docker compose -f compose-limits.yaml config --quiet
```
```text
```

## Tear down

```bash
docker compose -f compose-limits.yaml down
```
```text
[+] Running 2/2
 ✔ Container examples-web-1     Removed
 ✔ Container examples-stress-1  Removed
```
