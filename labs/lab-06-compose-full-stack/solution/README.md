# Lab 06 Solution

Full Compose stack with web, Postgres, and Redis services. Run with `docker compose up -d` from the lab root.

- **web** — Node.js Express app on port 3000, connects to `db` and `redis` via Compose DNS.
- **db** — PostgreSQL 16 with password `labpass`, database `labdb`.
- **redis** — Redis 7 Alpine, no persistence needed for the demo.

Environment variables `REDIS_URL` and `DATABASE_URL` let the app resolve the backing services without hardcoded hostnames.
