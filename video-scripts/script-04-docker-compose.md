# Video Script: Docker Compose
**Estimated Duration:** 11 minutes
**Module Reference:** Module 08

---

## [HOOK — 0:00–0:30]
"Three terminals for web, database, and cache? Compose runs your whole stack with one file and one command."

## [INTRO — 0:30–1:00]
You will read `compose.yaml`, use `docker compose up`, and scale a stateless service.

## [SECTION 1 — Why Compose exists — 1:00–3:00]
Multi-container apps need networks, volumes, and env—Compose declares desired state.

## [SECTION 2 — File anatomy — 3:00–6:00]
[SHOW compose-full-stack.yaml from Module 08] services, networks, volumes, depends_on, healthcheck.

## [DEMO — 6:00–9:30]
```bash
docker compose config
docker compose up -d --build
docker compose ps
docker compose logs -f web
docker compose down
```

## [RECAP — 9:30–10:30]
Compose v2 plugin, `.env` substitution, profiles for optional services.

## [OUTRO]
Lab 06 and Module 09 Dockerfile optimization next.
