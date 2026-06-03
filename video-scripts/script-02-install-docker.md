# Video Script: Install Docker
**Estimated Duration:** 10 minutes
**Module Reference:** Module 02

---

## [HOOK — 0:00–0:30]
[ON CAMERA] "Before you ship containers, you need a working engine. We install Docker on Linux, macOS, and Windows—and verify it in under two minutes."

## [INTRO — 0:30–1:00]
You will install Docker, add your user to the `docker` group on Linux, and fix the three most common install errors.

## [SECTION 1 — Linux (Ubuntu) — 1:00–4:00]
[SHOW TERMINAL] apt repository setup, `docker compose` plugin, `sudo usermod -aG docker $USER`.

## [SECTION 2 — macOS & Windows — 4:00–6:00]
[SHOW DOCKER DESKTOP] Docker Desktop on Mac and WSL2 backend on Windows. Forward reference to Module 15.

## [SECTION 3 — Verification — 6:00–7:00]
```bash
docker run hello-world
docker compose version
```

## [DEMO — 7:00–8:30]
[TROUBLESHOOT] daemon not running, permission denied, WSL2 not enabled.

## [RECAP — 8:30–9:30]
Installation paths differ by OS; CLI is the same. Engine + Compose v2 plugin is the target stack.

## [OUTRO]
Open Module 03 Core Concepts next.
