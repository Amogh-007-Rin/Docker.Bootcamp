# Docker CLI Cheatsheet
Quick reference for everyday `docker` commands grouped by resource type.

## Containers

| Command | Description |
|---|---|
| `docker run IMAGE` | Create and start a container |
| `docker run -d IMAGE` | Run detached (background) |
| `docker run --name NAME IMAGE` | Set container name |
| `docker run -p HOST:CONTAINER IMAGE` | Publish ports |
| `docker run -e KEY=VAL IMAGE` | Set environment variable |
| `docker run -v VOL:/path IMAGE` | Mount volume or bind path |
| `docker run --rm IMAGE` | Auto-remove on exit |
| `docker run --restart unless-stopped IMAGE` | Restart policy |
| `docker ps` | List running containers |
| `docker ps -a` | List all containers |
| `docker stop NAME` | Graceful stop (SIGTERM) |
| `docker kill NAME` | Force stop (SIGKILL) |
| `docker start NAME` | Start stopped container |
| `docker restart NAME` | Restart container |
| `docker rm NAME` | Remove stopped container |
| `docker rm -f NAME` | Force remove running container |
| `docker logs NAME` | View container logs |
| `docker logs -f NAME` | Follow logs |
| `docker exec -it NAME sh` | Interactive shell in running container |
| `docker inspect NAME` | JSON metadata |
| `docker cp SRC DEST` | Copy files host ↔ container |
| `docker stats` | Live CPU/memory usage |

## Images

| Command | Description |
|---|---|
| `docker pull REPO:TAG` | Download image from registry |
| `docker images` | List local images |
| `docker build -t NAME .` | Build from Dockerfile |
| `docker tag SRC DEST` | Create additional tag |
| `docker rmi IMAGE` | Remove image |
| `docker image prune` | Remove dangling images |
| `docker history IMAGE` | Show image layers |
| `docker inspect IMAGE` | Image metadata |

## Volumes

| Command | Description |
|---|---|
| `docker volume create NAME` | Create named volume |
| `docker volume ls` | List volumes |
| `docker volume inspect NAME` | Volume details |
| `docker volume rm NAME` | Delete volume |
| `docker volume prune` | Remove unused volumes |

## Networks

| Command | Description |
|---|---|
| `docker network ls` | List networks |
| `docker network create NAME` | Create user-defined network |
| `docker network inspect NAME` | Network details |
| `docker network connect NET CTR` | Attach container to network |
| `docker network disconnect NET CTR` | Detach container |
| `docker network rm NAME` | Remove network |

## System

| Command | Description |
|---|---|
| `docker info` | Daemon and storage info |
| `docker version` | Client and server versions |
| `docker system df` | Disk usage summary |
| `docker system prune` | Remove unused data |
| `docker login` | Authenticate to registry |
| `docker logout` | Log out of registry |
| `docker push REPO:TAG` | Upload image |
| `docker pull REPO:TAG` | Download image |

## Gotchas

1. **`docker ps` hides stopped containers** — Use `docker ps -a` when debugging exited containers.
2. **Port publish vs expose** — `-p` maps host ports; `EXPOSE` in Dockerfile does not publish by itself.
3. **`docker kill` vs `docker stop`** — `stop` allows graceful shutdown; `kill` sends SIGKILL immediately.
4. **Name conflicts** — Container names must be unique; remove old containers before reusing names.
5. **Default bridge DNS** — Containers on default bridge cannot resolve each other by name; use a user-defined network.

## Deeper reading

- [Module 05 — Containers](../modules/05-containers/README.md)
- [Module 04 — Images](../modules/04-images/README.md)
- [Module 07 — Networking](../modules/07-networking/README.md)
