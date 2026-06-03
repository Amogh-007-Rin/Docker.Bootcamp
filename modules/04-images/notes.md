# Module 04 Notes — Docker Images
[Previous: Module 03 — Core Concepts](../03-core-concepts/README.md) | [Next: Module 05 — Containers](../05-containers/README.md)

## Pulling images
**Concept:** You download images from a registry with `docker pull`.

**Why it exists:** Pulling ensures you have the exact image needed to run a container.

**How it works internally:** The daemon downloads image layers and verifies their digests.

**Command/Syntax:**
```bash
docker pull nginx:1.27
```
```text
Status: Downloaded newer image for nginx:1.27
```

**Real example:**
```bash
docker pull nginx:1.27-alpine
```
```text
Status: Downloaded newer image for nginx:1.27-alpine
```

## Listing images
**Concept:** You list local images with `docker images`.

**Why it exists:** You need to audit what is stored on your machine.

**How it works internally:** The daemon reports metadata from its local image store.

**Command/Syntax:**
```bash
docker images
```
```text
REPOSITORY   TAG     IMAGE ID
nginx        1.27    0123456789ab
```

**Real example:**
```bash
docker images --digests
```
```text
REPOSITORY   TAG     DIGEST
nginx        1.27    sha256:abc123...
```

## Tags and digests
**Concept:** Tags are human-friendly labels, while digests are immutable hashes.

**Why it exists:** Tags are convenient, and digests guarantee exact content.

**How it works internally:** The digest is computed from the image manifest and layers.

**Command/Syntax:**
```bash
docker pull nginx@sha256:abc123...
```
```text
Status: Downloaded newer image for nginx@sha256:abc123...
```

**Real example:**
```bash
docker inspect nginx:1.27 --format '{{.RepoDigests}}'
```
```text
[nginx@sha256:abc123...]
```

> 💡 **Pro Tip:** You use digests in production for immutable deployments.

## Base images
**Concept:** A base image provides the starting layer for your Dockerfile.

**Why it exists:** You reuse common OS or runtime layers to avoid duplication.

**How it works internally:** Docker builds new layers on top of the base image layers.

**Command/Syntax:**
```bash
docker pull alpine:3.20
```
```text
Status: Downloaded newer image for alpine:3.20
```

**Real example:**
```bash
docker run --rm alpine:3.20 cat /etc/os-release
```
```text
NAME="Alpine Linux"
VERSION_ID=3.20.0
```

## Official vs community images
**Concept:** Official images are curated by Docker, while community images are user-maintained.

**Why it exists:** Official images provide trust and best practices for common software.

**How it works internally:** Docker Hub marks official images and signs their metadata.

**Command/Syntax:**
```bash
docker search --filter=is-official=true nginx
```
```text
NAME   DESCRIPTION              STARS
nginx  Official build of Nginx. 20000
```

**Real example:**
```bash
docker search --filter=is-official=false nginx | head -n 1
```
```text
NAME            DESCRIPTION
bitnami/nginx   Bitnami nginx image
```

> ⚠️ **Common Mistake:** You pull random images without checking the publisher and update history.

## Inspecting images
**Concept:** `docker inspect` and `docker history` show image metadata and layers.

**Why it exists:** You need to audit image size, commands, and labels.

**How it works internally:** Docker exposes stored metadata from the image manifest.

**Command/Syntax:**
```bash
docker inspect nginx:1.27 --format '{{.Config.ExposedPorts}}'
```
```text
map[80/tcp:{}]
```

**Real example:**
```bash
docker history nginx:1.27
```
```text
IMAGE          CREATED        CREATED BY
0123456789ab   2 weeks ago    /bin/sh -c #(nop)  CMD ["nginx" "-g" "daemon off;"]
```

## Removing images
**Concept:** You delete images with `docker rmi`.

**Why it exists:** Removing unused images saves disk space.

**How it works internally:** Docker removes references and deletes unneeded layers.

**Command/Syntax:**
```bash
docker rmi nginx:1.27
```
```text
Untagged: nginx:1.27
```

**Real example:**
```bash
docker image prune -f
```
```text
Deleted Images:
```

## Dangling images
**Concept:** Dangling images are untagged layers left after builds.

**Why it exists:** They consume disk space but are not referenced by any tag.

**How it works internally:** The daemon tracks images with `<none>` tags as dangling.

**Command/Syntax:**
```bash
docker images -f dangling=true
```
```text
REPOSITORY   TAG     IMAGE ID
<none>       <none>  89abcdef0123
```

**Real example:**
```bash
docker image prune -f
```
```text
Total reclaimed space: 120MB
```

## What’s Next?
You learn to run and manage containers in Module 05.

[Previous: Module 03 — Core Concepts](../03-core-concepts/README.md) | [Next: Module 05 — Containers](../05-containers/README.md)
