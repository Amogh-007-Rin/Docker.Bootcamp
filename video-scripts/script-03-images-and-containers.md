# Video Script: Images and Containers
**Estimated Duration:** 12 minutes
**Module Reference:** Modules 03–05

---

## [HOOK — 0:00–0:30]
"An image is a blueprint. A container is a running copy. Mix them up and debugging gets painful—so we fix that today."

## [INTRO — 0:30–1:00]
You will pull images, run containers, map ports, read logs, and clean up safely.

## [SECTION 1 — Image lifecycle — 1:00–4:00]
`docker pull`, `docker images`, layers, tags vs digests.

## [SECTION 2 — Container lifecycle — 4:00–7:00]
`docker run -d -p`, `docker ps`, `docker logs`, `docker exec`, `docker stop` vs `docker kill`.

## [DEMO — 7:00–10:30]
[SHOW TERMINAL] nginx on port 8080, exec into container, copy a file with `docker cp`.

## [RECAP — 10:30–11:30]
Template vs instance. Detached runs, published ports, graceful stop.

## [OUTRO]
Module 06 Volumes—why databases need persistent storage.
