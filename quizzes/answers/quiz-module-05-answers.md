# Quiz Module 05 — Answer Key

## Multiple Choice

| # | Answer | Explanation |
|---|---|---|
| 1 | B | The `-d` (detach) flag runs the container in the background. |
| 2 | B | `-p HOST:CONTAINER` maps host port 8080 to container port 80. |
| 3 | B | `docker logs` streams stdout/stderr from a container. |
| 4 | A | `docker stop` sends SIGTERM and waits; `docker kill` sends SIGKILL immediately. |
| 5 | B | `docker exec -it NAME sh` runs a command inside a running container. |
| 6 | B | `--rm` automatically removes the container when it exits. |
| 7 | B | `docker cp` copies files between host and container filesystems. |
| 8 | C | `docker inspect` returns detailed JSON metadata for containers or images. |
| 9 | A | `--network` attaches the container to a network at create time. |
| 10 | B | `-i` keeps STDIN open; `-t` allocates a pseudo-TTY for interactive shells. |

## Short Answer — Model Answers

**1. stop vs kill in production:** `docker stop` allows the application to handle SIGTERM, flush buffers, and close connections gracefully. `docker kill` should be reserved for hung processes because it can cause data loss or corrupt state.

**2. Use case for docker cp:** You copy logs or config files out of a container for debugging without rebuilding the image, or copy hotfix files into a container temporarily (not recommended for production workflows—prefer volumes or rebuilt images).
