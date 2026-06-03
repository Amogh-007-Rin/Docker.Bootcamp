# Module 06 Notes — Volumes and Storage
[Previous: Module 05 — Containers](../05-containers/README.md) | [Next: Module 07 — Networking](../07-networking/README.md)

## Ephemeral container filesystem
**Concept:** Container filesystems are temporary by default.

**Why it exists:** Containers are designed to be disposable and replaceable.

**How it works internally:** Docker layers add a writable layer that is deleted when the container is removed.

**Command/Syntax:**
```bash
docker run --rm alpine:3.20 sh -c "echo data > /tmp/data.txt"
```
```text
```

**Real example:**
```bash
docker run --rm alpine:3.20 ls /tmp
```
```text
```

> ⚠️ **Common Mistake:** You store database data inside the container without a volume and lose it on removal.

## Storage types: bind mounts, named volumes, tmpfs
**Concept:** Docker provides three storage types: bind mounts, named volumes, and tmpfs.

**Why it exists:** Each type trades off performance, portability, and isolation.

**How it works internally:** Bind mounts map host paths, volumes live in Docker’s storage area, and tmpfs stays in memory.

**Command/Syntax:**
```bash
docker run --rm -v "$(pwd)/data:/data" alpine:3.20 ls /data
```
```text
```

**Real example:**
```bash
docker run --rm --tmpfs /cache alpine:3.20 sh -c "mount | grep tmpfs | head -n 1"
```
```text
tmpfs on /cache type tmpfs
```

## Volume management commands
**Concept:** You create, list, inspect, and remove named volumes.

**Why it exists:** Volumes persist data independent of containers.

**How it works internally:** Docker stores volumes under its managed data directory and tracks metadata.

**Command/Syntax:**
```bash
docker volume create app-data
```
```text
app-data
```

**Real example:**
```bash
docker volume inspect app-data --format '{{.Mountpoint}}'
```
```text
/var/lib/docker/volumes/app-data/_data
```

> 💡 **Pro Tip:** You use named volumes for databases and bind mounts for local dev source code.

## When to use each type
**Concept:** Bind mounts fit development, volumes fit production data, and tmpfs fits secrets or cache.

**Why it exists:** The right type prevents data loss and improves performance.

**How it works internally:** Docker treats each type differently at runtime and during cleanup.

**Command/Syntax:**
```bash
docker volume ls
```
```text
DRIVER    VOLUME NAME
local     app-data
```

**Real example:**
```bash
docker volume rm app-data
```
```text
app-data
```

## Named volumes with `docker run`
**Concept:** You attach a named volume using `-v` or `--mount`.

**Why it exists:** It keeps data persistent across container restarts.

**How it works internally:** Docker mounts the volume into the container at runtime.

**Command/Syntax:**
```bash
docker run -d --name pg -v pgdata:/var/lib/postgresql/data postgres:16
```
```text
6a5b4c3d2e1f
```

**Real example:**
```bash
docker inspect pg --format '{{json .Mounts}}'
```
```text
[{"Type":"volume","Name":"pgdata","Destination":"/var/lib/postgresql/data"}]
```

## Volume drivers (intro)
**Concept:** Volume drivers let you store data on external systems.

**Why it exists:** You need shared or cloud-backed storage in some environments.

**How it works internally:** Docker calls the driver to create and mount volumes.

**Command/Syntax:**
```bash
docker volume create --driver local local-data
```
```text
local-data
```

**Real example:**
```bash
docker volume ls --format '{{.Name}}'
```
```text
pgdata
local-data
```

## Backup and restore volume data
**Concept:** You back up volume data by mounting it into a temporary container.

**Why it exists:** Backups protect you from data loss and mistakes.

**How it works internally:** Docker mounts the volume and a backup directory into a container.

**Command/Syntax:**
```bash
docker run --rm -v pgdata:/data -v "$(pwd)/backup:/backup" alpine:3.20 sh -c "tar czf /backup/pgdata.tar.gz -C /data ."
```
```text
```

**Real example:**
```bash
docker run --rm -v pgdata:/data -v "$(pwd)/backup:/backup" alpine:3.20 sh -c "tar xzf /backup/pgdata.tar.gz -C /data"
```
```text
```

## Best practices for stateful apps
**Concept:** You treat stateful containers as disposable and externalize data.

**Why it exists:** It enables safe upgrades and recovery.

**How it works internally:** The app writes data to mounted volumes, not the container layer.

**Command/Syntax:**
```bash
docker run -d --name pg -v pgdata:/var/lib/postgresql/data postgres:16
```
```text
6a5b4c3d2e1f
```

**Real example:**
```bash
docker restart pg
```
```text
pg
```

## What’s Next?
You learn container networking in Module 07.

[Previous: Module 05 — Containers](../05-containers/README.md) | [Next: Module 07 — Networking](../07-networking/README.md)
