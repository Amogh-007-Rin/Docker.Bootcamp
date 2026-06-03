# Video Script: Docker Security
**Estimated Duration:** 12 minutes
**Module Reference:** Module 11

---

## [HOOK — 0:00–0:30]
"A container is not a VM. Running as root with every capability is an invitation—so we harden like production."

## [INTRO — 0:30–1:00]
Non-root users, read-only filesystems, capability drops, and image scanning.

## [SECTION 1 — Least privilege — 1:00–4:00]
Dockerfile `USER`, `--read-only`, `--cap-drop ALL`.

## [SECTION 2 — Scanning — 4:00–6:30]
`docker scout` / Trivy sample output; supply chain signing overview.

## [DEMO — 6:30–10:00]
[SHOW TERMINAL] Lab 08 style hardened run flags.

## [RECAP — 10:00–11:00]
Security checklist from cheatsheet; never expose docker.sock publicly.

## [OUTRO]
Module 12 resource limits—security and stability together.
