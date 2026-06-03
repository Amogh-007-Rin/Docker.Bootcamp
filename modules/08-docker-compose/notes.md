# Module 08 Notes — Docker Compose
[Previous: Module 07 — Networking](../07-networking/README.md) | [Next: Module 09 — Dockerfile Advanced](../09-dockerfile-advanced/README.md)

## What Docker Compose is
**Concept:** Docker Compose defines multi-container apps in a single YAML file.

**Why it exists:** You manage related services together instead of running many CLI commands.

**How it works internally:** Compose translates the YAML into Docker API calls.

**Command/Syntax:**
```bash
docker compose up -d
```
```text
[+] Running 3/3
```

**Real example:**
```bash
docker compose ps
```
```text
NAME           STATUS
web            running
```

## Compose v2 vs v1
**Concept:** Compose v2 is the Docker CLI plugin. v1 is the legacy standalone binary.

**Why it exists:** v2 aligns with Docker CLI and receives active support.

**How it works internally:** The plugin runs as `docker compose`, not `docker-compose`.

**Command/Syntax:**
```bash
docker compose version
```
```text
Docker Compose version v2.24.6
```

**Real example:**
```bash
docker-compose --version
```
```text
bash: docker-compose: command not found
```

> ⚠️ **Common Mistake:** You install the v1 binary and copy commands from old guides.

## Compose file structure
**Concept:** A Compose file defines services, networks, volumes, configs, and secrets.

**Why it exists:** It keeps app infrastructure in one declarative file.

**How it works internally:** Compose reads the file and creates networks and volumes before services.

**Command/Syntax:**
```bash
docker compose config
```
```text
services:
  web:
    image: nginx
```

**Real example:**
```bash
docker compose config --services
```
```text
web
db
cache
```

## Major service keys
**Concept:** Service keys define how each container is built and run.

**Why it exists:** Keys replace long `docker run` commands with a clear config.

**How it works internally:** Compose maps keys to Docker API fields.

**Command/Syntax:**
```bash
docker compose config --profiles
```
```text
default
```

**Real example:**
```bash
docker compose config --volumes
```
```text
db-data
```

Key list you use often:
- `image`, `build`
- `ports`, `environment`, `env_file`
- `volumes`, `depends_on`, `restart`
- `healthcheck`, `networks`, `command`, `entrypoint`

> 💡 **Pro Tip:** You keep secrets in files and reference them via Compose secrets.

## Compose commands
**Concept:** You manage the app lifecycle with `docker compose` commands.

**Why it exists:** It simplifies start, stop, logs, and exec operations.

**How it works internally:** Compose tracks service containers by project name.

**Command/Syntax:**
```bash
docker compose up -d
```
```text
[+] Running 3/3
```

**Real example:**
```bash
docker compose down
```
```text
[+] Removing 3/3
```

## Override files with `-f`
**Concept:** You can combine multiple Compose files for overrides.

**Why it exists:** You separate base config from dev or prod config.

**How it works internally:** Compose merges YAML files in order.

**Command/Syntax:**
```bash
docker compose -f compose.yaml -f compose.dev.yaml up -d
```
```text
[+] Running 3/3
```

**Real example:**
```bash
docker compose -f compose.yaml -f compose.dev.yaml config
```
```text
services:
  web:
    environment:
      NODE_ENV: development
```

## `.env` file usage
**Concept:** Compose loads environment variables from a `.env` file by default.

**Why it exists:** It keeps configuration out of the YAML.

**How it works internally:** Compose interpolates `${VAR}` values when rendering config.

**Command/Syntax:**
```bash
docker compose config
```
```text
environment:
  APP_PORT: "8080"
```

**Real example:**
```bash
docker compose config --services
```
```text
web
```

## Profiles
**Concept:** Profiles let you enable optional services.

**Why it exists:** You can run only the services you need.

**How it works internally:** Compose filters services by profile at runtime.

**Command/Syntax:**
```bash
docker compose --profile debug up -d
```
```text
[+] Running 1/1
```

**Real example:**
```bash
docker compose --profile debug ps
```
```text
NAME     STATUS
debugger running
```

## Scaling services
**Concept:** You run multiple replicas of a service for testing or load.

**Why it exists:** Scaling helps you verify stateless design and load behavior.

**How it works internally:** Compose creates multiple containers with indexed names.

**Command/Syntax:**
```bash
docker compose up -d --scale web=3
```
```text
[+] Running 3/3
```

**Real example:**
```bash
docker compose ps --services
```
```text
web
db
cache
```

## What’s Next?
You learn advanced Dockerfile techniques in Module 09.

[Previous: Module 07 — Networking](../07-networking/README.md) | [Next: Module 09 — Dockerfile Advanced](../09-dockerfile-advanced/README.md)
