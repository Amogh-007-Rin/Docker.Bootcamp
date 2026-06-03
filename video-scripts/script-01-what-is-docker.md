# Video Script: What Is Docker?
**Estimated Duration:** 8 minutes
**Module Reference:** Module 01

---

## [HOOK — 0:00–0:30]
[ON CAMERA] "Your app works on your laptop—but fails in staging. Same code, different machine. Today you learn how Docker packages your app so it runs the same everywhere."

## [INTRO — 0:30–1:00]
You will understand what Docker is, the problem it solves, and how the client–daemon architecture fits together.

## [SECTION 1 — The "Works on My Machine" Problem — 1:00–2:30]
[SHOW SLIDE: dev laptop vs production server]
Dependencies, OS libraries, and config drift break deployments. Containers bundle the app and its runtime assumptions into one unit.

## [SECTION 2 — Containers vs VMs — 2:30–4:00]
[SHOW MERMAID DIAGRAM from Module 01 notes]
VMs virtualize hardware; containers share the host kernel and isolate processes. Containers start faster and use less overhead.

## [SECTION 3 — Docker Architecture — 4:00–5:30]
[SHOW TERMINAL]
```bash
docker version
```
[POINT TO] Client CLI talks to `dockerd` over API. Images live in local storage; containers are running instances.

## [DEMO — 5:30–7:00]
[SHOW TERMINAL]
```bash
docker run hello-world
```
Walk through each line of output—pull, create, start, log, exit. [HIGHLIGHT] "Unable to find image" means Docker pulled from Hub automatically.

## [RECAP — 7:00–7:45]
Docker solves environment consistency. Images are templates; containers are instances. The daemon does the heavy lifting.

## [OUTRO]
Star the repo, open Module 02 Installation, and run hello-world on your machine.
