# Quiz Module 03 — Answer Key

## Multiple Choice

| # | Answer | Explanation |
|---|---|---|
| 1 | B | An image is an immutable template; a container is a running instance created from that template. |
| 2 | B | When a container starts, Docker adds a thin writable layer on top of the read-only image layers. |
| 3 | B | `docker images` lists images stored locally; `docker ps` lists containers. |
| 4 | A | Union/overlay file systems stack read-only layers and present them as one filesystem. |
| 5 | C | **Exited** means the main process stopped but the container record still exists. |
| 6 | B | `docker pull` downloads an image from a registry to your local machine. |
| 7 | A | `docker ps -a` shows state (created, running, exited) for all containers. |
| 8 | C | Docker Hub is a public registry for sharing and pulling images. |
| 9 | B | A specific version tag (e.g. `nginx:1.27`) is more repeatable than `latest`. |
| 10 | B | Images are templates; containers are runtime instances with their own writable layer. |

## Short Answer — Model Answers

**1. Template vs instance:** An image is like a class or blueprint—it defines filesystem and metadata but does not run by itself. A container is like an object instance—you create it from an image when you `docker run`, and it has its own lifecycle and writable layer.

**2. Container states:** `docker run` creates and starts a container (running). `docker pause` moves it to paused. `docker stop` sends SIGTERM and moves it to exited. `docker start` can move an exited container back to running. `docker rm` removes the container record.
