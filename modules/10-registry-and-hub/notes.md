# Module 10 Notes — Docker Registry and Docker Hub
[Previous: Module 09 — Dockerfile Advanced](../09-dockerfile-advanced/README.md) | [Next: Module 11 — Security](../11-security/README.md)

## What a registry is
**Concept:** A registry stores Docker images and their layers.

**Why it exists:** You need a central place to distribute images.

**How it works internally:** The registry serves manifests and layer blobs over HTTP.

**Command/Syntax:**
```bash
docker pull registry:2
```
```text
Status: Downloaded newer image for registry:2
```

**Real example:**
```bash
docker run -d -p 5000:5000 --name local-registry registry:2
```
```text
1a2b3c4d5e6f
```

## Docker Hub free tier
**Concept:** Docker Hub provides a public registry with free pulls and pushes.

**Why it exists:** It makes sharing official and community images simple.

**How it works internally:** Docker Hub hosts images and enforces rate limits and auth.

**Command/Syntax:**
```bash
docker search hello-world | head -n 1
```
```text
NAME          DESCRIPTION
hello-world   Hello World! (an example of minimal Docker image)
```

**Real example:**
```bash
docker pull hello-world:latest
```
```text
Status: Downloaded newer image for hello-world:latest
```

## Authentication
**Concept:** `docker login` authenticates you to a registry.

**Why it exists:** Private repositories require credentials.

**How it works internally:** Docker stores an auth token in your config.json.

**Command/Syntax:**
```bash
docker login
```
```text
Login Succeeded
```

**Real example:**
```bash
docker logout
```
```text
Removing login credentials for https://index.docker.io/v1/
```

> 💡 **Pro Tip:** You use access tokens instead of passwords for better security.

## Tagging images
**Concept:** Tags associate an image with a registry and repository name.

**Why it exists:** Registries use the tag to locate and store your image.

**How it works internally:** Docker creates a new reference to the same image ID.

**Command/Syntax:**
```bash
docker tag local-app:1.0 username/local-app:1.0
```
```text
```

**Real example:**
```bash
docker images | head -n 2
```
```text
REPOSITORY            TAG     IMAGE ID
username/local-app    1.0     0123456789ab
```

## Pushing and pulling
**Concept:** `docker push` uploads and `docker pull` downloads images.

**Why it exists:** You move images between machines and environments.

**How it works internally:** The client uploads layers that are missing in the registry.

**Command/Syntax:**
```bash
docker push username/local-app:1.0
```
```text
Pushed
```

**Real example:**
```bash
docker pull username/local-app:1.0
```
```text
Status: Downloaded newer image for username/local-app:1.0
```

## Image naming convention
**Concept:** Image names follow `username/repo:tag`.

**Why it exists:** The name maps to a unique registry repository.

**How it works internally:** Docker resolves the registry and repository based on the name.

**Command/Syntax:**
```bash
docker tag app:1.0 myuser/app:1.0
```
```text
```

**Real example:**
```bash
docker tag app:1.0 registry.example.com/myuser/app:1.0
```
```text
```

## Automated builds (concept)
**Concept:** Automated builds rebuild images when source code changes.

**Why it exists:** It keeps images in sync with your repository.

**How it works internally:** The registry triggers a build pipeline on commits.

**Command/Syntax:**
```bash
docker build -t username/app:1.0 .
```
```text
Successfully built abcdef123456
```

**Real example:**
```bash
docker push username/app:1.0
```
```text
Pushed
```

## Private local registry
**Concept:** You can run a private registry with `registry:2`.

**Why it exists:** It supports offline or internal deployments.

**How it works internally:** The registry runs as a container and stores blobs locally.

**Command/Syntax:**
```bash
docker run -d -p 5000:5000 --name local-registry registry:2
```
```text
1a2b3c4d5e6f
```

**Real example:**
```bash
docker tag app:1.0 localhost:5000/app:1.0
```
```text
```

## Pushing to a private registry
**Concept:** You push and pull from the local registry like any other registry.

**Why it exists:** The workflow stays the same across environments.

**How it works internally:** Docker resolves the host in the image name and uses that registry.

**Command/Syntax:**
```bash
docker push localhost:5000/app:1.0
```
```text
Pushed
```

**Real example:**
```bash
docker pull localhost:5000/app:1.0
```
```text
Status: Downloaded newer image for localhost:5000/app:1.0
```

> ⚠️ **Common Mistake:** You forget to log in to Docker Hub before pushing.

## What’s Next?
You learn Docker security in Module 11.

[Previous: Module 09 — Dockerfile Advanced](../09-dockerfile-advanced/README.md) | [Next: Module 11 — Security](../11-security/README.md)
