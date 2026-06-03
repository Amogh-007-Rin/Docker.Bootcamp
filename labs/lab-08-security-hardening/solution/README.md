# Lab 08 Solution

Security flags used:

| Layer | Mechanism |
|---|---|
| Dockerfile | `USER nginx`, owned `/var/cache/nginx` and logs to non-root |
| Compose `read_only: true` | Root filesystem is read-only — no writes to `/` |
| Compose `tmpfs` | Writable tmpfs mounted at `/var/cache/nginx` and `/var/run` |
| Compose `cap_drop: ALL` | All Linux capabilities removed — no `CAP_NET_BIND_SERVICE`, no `CAP_CHOWN`, etc. |

Run with `docker compose up -d` from the lab-08 root and visit http://localhost:8080.
