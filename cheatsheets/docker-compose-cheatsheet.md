# Docker Compose Cheatsheet
Compose file keys and `docker compose` CLI commands for multi-container apps.

## Compose file structure

```yaml
services:
  web:
    image: nginx:1.27
    build: ./web          # or build: { context: ., dockerfile: Dockerfile }
    ports:
      - "8080:80"
    environment:
      NODE_ENV: production
    env_file: .env
    volumes:
      - app-data:/data
    depends_on:
      - db
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost"]
      interval: 30s
      timeout: 5s
      retries: 3
    networks:
      - backend
    command: ["nginx", "-g", "daemon off;"]
    entrypoint: ["/docker-entrypoint.sh"]

networks:
  backend:
    driver: bridge

volumes:
  app-data:
```

## Common service keys

| Key | Purpose |
|---|---|
| `image` | Use pre-built image |
| `build` | Build from Dockerfile |
| `ports` | Publish `host:container` |
| `expose` | Expose port to linked services only |
| `environment` / `env_file` | Env vars |
| `volumes` | Named volumes or bind mounts |
| `depends_on` | Startup order (not readiness) |
| `restart` | Restart policy |
| `healthcheck` | Service health probe |
| `networks` | Attach to networks |
| `profiles` | Optional service groups |
| `deploy.replicas` | Scale (Swarm / compatible setups) |
| `secrets` / `configs` | Swarm-style secrets (where supported) |

## CLI commands

| Command | Description |
|---|---|
| `docker compose up` | Create and start services |
| `docker compose up -d` | Detached mode |
| `docker compose down` | Stop and remove containers/networks |
| `docker compose ps` | List service containers |
| `docker compose logs -f SERVICE` | Follow logs |
| `docker compose exec SERVICE sh` | Shell into service |
| `docker compose build` | Build images |
| `docker compose pull` | Pull images |
| `docker compose config` | Validate and print resolved config |
| `docker compose -f file.yml up` | Use alternate compose file |
| `docker compose --profile dev up` | Start profile services |

## `.env` file

```env
POSTGRES_PASSWORD=secret
APP_PORT=3000
```

Reference in compose: `${POSTGRES_PASSWORD}`

## Gotchas

1. **`depends_on` is not health-aware** — Use `healthcheck` + `condition: service_healthy` where supported, or retry logic in apps.
2. **Compose v2 plugin** — Use `docker compose`, not deprecated standalone `docker-compose` v1.
3. **Relative paths** — Volume bind paths resolve from the compose file directory.
4. **Project name** — Defaults to directory name; override with `-p` or `COMPOSE_PROJECT_NAME`.
5. **Rebuild after Dockerfile changes** — Run `docker compose build` or `up --build`.

## Deeper reading

- [Module 08 — Docker Compose](../modules/08-docker-compose/README.md)
- [Module 16 — Docker Swarm](../modules/16-docker-swarm/README.md)
