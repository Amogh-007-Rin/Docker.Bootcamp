# Quiz Module 07 — Answer Key

## Multiple Choice

| # | Answer | Explanation |
|---|---|---|
| 1 | B | The default bridge driver connects containers on a single Docker host. |
| 2 | B | User-defined bridges embed an internal DNS server so containers resolve each other by name. |
| 3 | A | `docker network create` creates a new network. |
| 4 | B | `-p 8080:80` publishes container port 80 to host port 8080. |
| 5 | C | The overlay driver spans multiple hosts in Swarm mode. |
| 6 | B | `--network-alias` registers an extra DNS name for the container on that network. |
| 7 | B | `docker network ls` lists all networks. |
| 8 | A | The default bridge does not provide automatic DNS between containers by name. |
| 9 | B | `docker network connect` attaches a running container to a network. |
| 10 | B | `EXPOSE` documents intended ports; it does not publish them to the host. |

## Short Answer — Model Answers

**1. Expose vs publish:** `EXPOSE` (or Compose `expose`) documents which ports the service uses and may expose them to linked services on the same network. Publishing (`-p` or Compose `ports`) creates a NAT rule so traffic on the host reaches the container.

**2. DNS-based discovery:** Microservices need stable hostnames. User-defined networks let containers reach `http://api:3000` instead of hard-coding IPs that change on every restart.
