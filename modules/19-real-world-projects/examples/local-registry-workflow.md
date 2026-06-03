# Local Registry Workflow — Push / Pull All Project Images

This guide walks through running a local Docker registry, building all 8 project images, and pushing/pulling them from the local registry instead of Docker Hub.

## Why a local registry?
- Test registry workflows without an internet connection or Hub account.
- Practice image tagging, push, pull, and `docker buildx` with a local endpoint.
- Speed up repeated rebuilds by eliminating network pull latency.

## Step 1 — Start a local registry

```bash
docker run -d -p 5000:5000 --restart always --name local-registry registry:2
```

```text
Unable to find image 'registry:2' locally
2: Pulling from library/registry...
Status: Downloaded newer image for registry:2
<container-id>
```

## Step 2 — Tag and push each project image

```bash
# Project 01
docker build -t localhost:5000/project-01-nodejs:latest projects/project-01-nodejs-app
docker push localhost:5000/project-01-nodejs:latest

# Project 02
docker build -t localhost:5000/project-02-flask:latest projects/project-02-python-flask-app
docker push localhost:5000/project-02-flask:latest

# Project 03
docker build -t localhost:5000/project-03-react:latest projects/project-03-react-app
docker push localhost:5000/project-03-react:latest

# Project 04 — build each service image and push separately
docker build -t localhost:5000/project-04-gateway:latest projects/project-04-microservices/gateway
docker push localhost:5000/project-04-gateway:latest
docker build -t localhost:5000/project-04-users:latest projects/project-04-microservices/users
docker push localhost:5000/project-04-users:latest
docker build -t localhost:5000/project-04-orders:latest projects/project-04-microservices/orders
docker push localhost:5000/project-04-orders:latest

# Project 05
docker build -t localhost:5000/project-05-ml:latest projects/project-05-ml-serving
docker push localhost:5000/project-05-ml:latest
```

```text
The push refers to repository [localhost:5000/project-01-nodejs]
...
latest: digest: sha256:... size: ...
```

Projects 06–07 do not have their own Dockerfile (they build the Project 01 image in CI). Project 08 reuses Project 04 images.

## Step 3 — List contents of the local registry

```bash
curl -s http://localhost:5000/v2/_catalog | jq .
```

```json
{
  "repositories": [
    "project-01-nodejs",
    "project-02-flask",
    "project-03-react",
    "project-04-gateway",
    "project-04-users",
    "project-04-orders",
    "project-05-ml"
  ]
}
```

List tags for one repository:

```bash
curl -s http://localhost:5000/v2/project-01-nodejs/tags/list | jq .
```

```json
{"name":"project-01-nodejs","tags":["latest"]}
```

## Step 4 — Pull from the local registry (simulating another host)

```bash
# Clear the local image
docker rmi localhost:5000/project-01-nodejs:latest

# Pull from the local registry
docker pull localhost:5000/project-01-nodejs:latest
```

```text
latest: Pulling from project-01-nodejs
Digest: sha256:...
Status: Downloaded newer image for localhost:5000/project-01-nodejs:latest
```

## Step 5 — Clean up

```bash
# Stop and remove the registry container
docker container stop local-registry
docker container rm local-registry

# Remove the registry data volume
docker volume prune -f
```

## Tips
- Use `docker buildx build --push` with the local registry for multi-platform testing before pushing to Docker Hub.
- The local registry is insecure (HTTP) by default. Add `"insecure-registries": ["localhost:5000"]` to the Docker Engine daemon config if Docker complains about HTTPS.
- For a persistent registry across restarts: `docker run -d -p 5000:5000 -v registry-data:/var/lib/registry --name local-registry registry:2`.
