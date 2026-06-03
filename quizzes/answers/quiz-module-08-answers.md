# Quiz Module 08 — Answer Key

## Multiple Choice

| # | Answer | Explanation |
|---|---|---|
| 1 | A | `docker compose up` creates networks/volumes and starts all defined services. |
| 2 | B | Compose defines multi-container applications in a declarative YAML file. |
| 3 | B | `depends_on` expresses startup order between services (not full readiness). |
| 4 | B | `docker compose config` validates and prints the resolved compose file. |
| 5 | A | Compose automatically loads variables from a `.env` file in the project directory. |
| 6 | A | The `ports` key maps host ports to container ports. |
| 7 | B | `docker compose ps` lists containers for the project. |
| 8 | C | `build` tells Compose to build an image from a Dockerfile and context. |
| 9 | B | `docker compose up --scale web=3` runs multiple replicas of a service. |
| 10 | B | Profiles enable optional services (e.g. debug tools) with `--profile`. |

## Short Answer — Model Answers

**1. down vs stop:** `docker compose stop` stops containers but keeps them and project networks/volumes. `docker compose down` stops containers and removes containers, default networks, and optionally volumes (`-v`).

**2. Multiple compose files:** You use `-f docker-compose.yml -f docker-compose.prod.yml` to override settings per environment—base file for dev, second file for production replicas, secrets, or resource limits.
