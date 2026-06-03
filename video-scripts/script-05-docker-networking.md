# Video Script: Docker Networking
**Estimated Duration:** 10 minutes
**Module Reference:** Module 07

---

## [HOOK — 0:00–0:30]
"Containers talk by IP until you restart them. User-defined networks give you DNS names that actually stick."

## [INTRO — 0:30–1:00]
Drivers, port publishing, and service discovery on custom bridge networks.

## [SECTION 1 — Drivers — 1:00–3:30]
bridge, host, none, overlay (Swarm preview).

## [SECTION 2 — DNS on custom networks — 3:30–6:00]
`docker network create`, run two containers, `ping` by name.

## [DEMO — 6:00–8:30]
[SHOW TERMINAL] Lab 05 style demo; contrast with default bridge limitation.

## [RECAP — 8:30–9:30]
Publish vs expose. `localhost` inside vs outside containers.

## [OUTRO]
Cheatsheet: `cheatsheets/networking-cheatsheet.md`.
