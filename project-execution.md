# project-execution.md
# Docker Mastery Repository — GitHub Copilot Execution Guide

> **Purpose of this file:** This document is the single source of truth for GitHub Copilot (and any contributor) to build the world's best open-source Docker learning repository — from scratch to advanced — in a structured, linear, and exhaustive manner. Follow every instruction precisely. Do not skip, reorder, or abbreviate any section.

---

## 1. Repository Identity

| Field | Value |
|---|---|
| **Repo Name** | `docker-mastery` |
| **Tagline** | *"Everything Docker. Zero to Production. Free forever."* |
| **Primary Language** | English |
| **Target Audience** | Developers with basic Linux knowledge |
| **Learning Style** | Linear progression — Module 1 must be completed before Module 2, and so on |
| **Contribution Model** | Open for fixes and additions only. No structural restructuring via PRs. |

---

## 2. Repository Root Structure

Copilot must scaffold the following directory and file tree exactly. Create every folder and placeholder file listed below before writing any content.

```
docker-mastery/
│
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── LICENSE                          # MIT License
├── project-execution.md             # This file
│
├── roadmap/
│   └── learning-path.md             # Visual linear roadmap of all modules
│
├── modules/
│   ├── 00-prerequisites/
│   ├── 01-introduction/
│   ├── 02-installation/
│   ├── 03-core-concepts/
│   ├── 04-images/
│   ├── 05-containers/
│   ├── 06-volumes-and-storage/
│   ├── 07-networking/
│   ├── 08-docker-compose/
│   ├── 09-dockerfile-advanced/
│   ├── 10-registry-and-hub/
│   ├── 11-security/
│   ├── 12-performance-and-resource-limits/
│   ├── 13-troubleshooting/
│   ├── 14-docker-desktop-vs-engine/
│   ├── 15-docker-on-windows-wsl2/
│   ├── 16-docker-swarm/
│   ├── 17-kubernetes-intro/
│   ├── 18-cicd-pipelines/
│   ├── 19-real-world-projects/
│   └── 20-interview-prep/
│
├── cheatsheets/
│   ├── docker-cli-cheatsheet.md
│   ├── dockerfile-cheatsheet.md
│   ├── docker-compose-cheatsheet.md
│   ├── networking-cheatsheet.md
│   └── security-cheatsheet.md
│
├── labs/
│   ├── lab-01-hello-docker/
│   ├── lab-02-build-your-first-image/
│   ├── lab-03-multi-container-app/
│   ├── lab-04-volumes-in-action/
│   ├── lab-05-custom-networks/
│   ├── lab-06-compose-full-stack/
│   ├── lab-07-multistage-builds/
│   ├── lab-08-security-hardening/
│   ├── lab-09-swarm-cluster/
│   ├── lab-10-deploy-to-cloud/
│   └── lab-11-ml-model-serving/
│
├── projects/
│   ├── project-01-nodejs-app/
│   ├── project-02-python-flask-app/
│   ├── project-03-react-app/
│   ├── project-04-microservices/
│   ├── project-05-ml-serving/
│   ├── project-06-cicd-github-actions/
│   ├── project-07-cicd-jenkins/
│   └── project-08-cloud-deployment/
│
├── quizzes/
│   ├── quiz-module-03.md
│   ├── quiz-module-05.md
│   ├── quiz-module-07.md
│   ├── quiz-module-08.md
│   ├── quiz-module-11.md
│   ├── quiz-module-16.md
│   └── answers/
│       └── (one answer file per quiz)
│
├── video-scripts/
│   ├── script-01-what-is-docker.md
│   ├── script-02-install-docker.md
│   ├── script-03-images-and-containers.md
│   ├── script-04-docker-compose.md
│   ├── script-05-docker-networking.md
│   ├── script-06-docker-security.md
│   └── script-07-docker-in-cicd.md
│
└── assets/
    └── diagrams/                    # All architecture/concept diagrams (Mermaid or PNG)
```

---

## 3. File-by-File Content Instructions

### 3.1 `README.md` (Root)

Write a README that serves as the repository's homepage. It must contain:

1. **Banner/Header** — Repository name, tagline, and badge row (Stars, Forks, License, PRs Welcome, Last Updated).
2. **What is this repository?** — 3-sentence description. Emphasize it is free, linear, and covers Docker from zero to production.
3. **Who is this for?** — Developers with basic Linux knowledge who want to master Docker completely.
4. **How to use this repo** — Explain the linear learning path clearly. Tell the reader to start at Module 00 and follow in order.
5. **Full Module Table** — A markdown table listing every module number, name, and a one-line description.
6. **Real-World Projects** — Brief section listing all 8 projects with links.
7. **Cheatsheets** — Inline links to all cheatsheets.
8. **Contributing** — Link to `CONTRIBUTING.md`.
9. **License** — MIT.

---

### 3.2 `roadmap/learning-path.md`

Create a detailed visual linear roadmap using a Mermaid flowchart (`graph TD`). Each node must be a module. Annotate each node with the module number and topic. Group into phases:

- **Phase 1 — Foundations** (Modules 00–05)
- **Phase 2 — Intermediate** (Modules 06–10)
- **Phase 3 — Advanced** (Modules 11–15)
- **Phase 4 — Orchestration** (Modules 16–17)
- **Phase 5 — Production & Real World** (Modules 18–20)

Below the diagram, write a short paragraph describing each phase and its learning outcomes.

---

### 3.3 Module Content Standard (Apply to ALL modules)

Every module folder must contain these files:

```
modules/XX-topic-name/
├── README.md          ← Module overview (what you'll learn, prerequisites, estimated time)
├── notes.md           ← Full written guide / lecture notes
├── examples/          ← All code examples, Dockerfiles, compose files used in the notes
└── exercises.md       ← Hands-on exercises (minimum 3 per module, with expected outputs)
```

**`notes.md` writing rules:**
- Use clear H2/H3 headings for every concept.
- Every concept must have: explanation in plain English → how it works internally (brief) → syntax/command → real example.
- Include "💡 Pro Tip" callout blocks for non-obvious best practices.
- Include "⚠️ Common Mistake" callout blocks where beginners typically go wrong.
- End every `notes.md` with a **"What's Next?"** section pointing to the next module.

**`exercises.md` format for every exercise:**
```
## Exercise N: [Title]
**Goal:** [One sentence]
**Time estimate:** [X minutes]
**Instructions:** [Step-by-step numbered list]
**Expected output:** [What the learner should see]
**Hint:** [Optional nudge without giving away the answer]
```

---

### 3.4 Individual Module Instructions

#### Module 00 — Prerequisites

**File: `notes.md`**
Cover: Linux command-line basics recap (file system, permissions, processes), what a process is, what OS-level virtualization means, difference between a VM and a container conceptually, why Docker exists. Include a short self-assessment checklist at the top: "You are ready if you can do X, Y, Z."

---

#### Module 01 — Introduction to Docker

**File: `notes.md`**
Cover: What Docker is, brief history (dotCloud → Docker Inc), the problem Docker solves ("works on my machine"), the Docker ecosystem overview (Engine, Hub, Compose, Swarm, Desktop), Docker's architecture (client-server model, Docker daemon, REST API), and how a container differs from a VM with a comparison diagram in Mermaid.

**File: `examples/`**
Include a `hello-world` run walkthrough showing exact terminal output and annotating what each line means.

---

#### Module 02 — Installation

**File: `notes.md`**
Cover installation for:
- Ubuntu/Debian (using apt, post-install steps, non-root user group)
- macOS (Docker Desktop)
- Windows with WSL2 (Docker Desktop + WSL2 backend, brief — full depth in Module 15)

Include version verification commands. Include a **"Docker Desktop vs Docker Engine"** forward reference pointing to Module 14.

Add a troubleshooting subsection for the 3 most common install errors on each OS.

---

#### Module 03 — Core Concepts

**File: `notes.md`**
Cover: Images vs Containers (the template vs instance analogy), Layers and the Union File System, the image pull/run/stop/remove lifecycle, container states (created, running, paused, exited, dead), Docker Hub as a registry.

Include a Mermaid state diagram showing container lifecycle.

**Corresponding quiz:** `quizzes/quiz-module-03.md` — 10 multiple choice questions + 2 short answer questions covering all concepts in this module.

---

#### Module 04 — Docker Images

**File: `notes.md`**
Cover: `docker pull`, `docker images`, image tags and digests, base images, official vs community images, inspecting images (`docker inspect`, `docker history`), image layers deep dive, removing images, dangling images, `docker image prune`.

**File: `examples/`**
Include: pulling nginx with a specific tag, inspecting its layers, running it, removing it.

---

#### Module 05 — Containers

**File: `notes.md`**
Cover: `docker run` flags in full depth (--name, -d, -it, -p, -e, --rm, --restart, --network, --volume), `docker ps`, `docker logs`, `docker exec`, `docker stop` vs `docker kill`, `docker inspect` on a container, copying files with `docker cp`, container resource awareness (basic preview of limits — full depth in Module 12).

**File: `examples/`**
Include: running nginx detached with port mapping, exec-ing into it, reading logs, stopping and removing.

**Corresponding quiz:** `quizzes/quiz-module-05.md`

---

#### Module 06 — Volumes and Storage

**File: `notes.md`**
Cover: The ephemeral container filesystem problem, three storage types (bind mounts, named volumes, tmpfs), `docker volume create/ls/inspect/rm`, when to use each type, named volumes in `docker run`, volume drivers (intro level), backing up and restoring volume data, best practices for stateful apps.

**File: `examples/`**
Include: running a PostgreSQL container with a named volume, stopping it, verifying data persists on restart.

---

#### Module 07 — Docker Networking

**File: `notes.md`**
Cover: Docker network drivers (bridge, host, none, overlay, macvlan), the default bridge network and its limitations, user-defined bridge networks (why they're better), `docker network create/ls/inspect/rm`, connecting containers via network (DNS-based discovery), `--network` flag, exposing vs publishing ports, network aliases, a full Mermaid diagram of a multi-container network topology.

**File: `examples/`**
Include: creating a user-defined bridge network, running two containers on it, and having them communicate by container name.

**Corresponding quiz:** `quizzes/quiz-module-07.md`

---

#### Module 08 — Docker Compose

**File: `notes.md`**
Cover: What Docker Compose is and why it exists, Compose v2 (plugin) vs v1 (standalone), `docker-compose.yml` / `compose.yaml` structure in full depth (version, services, networks, volumes, configs, secrets), all major service keys (`image`, `build`, `ports`, `environment`, `env_file`, `volumes`, `depends_on`, `restart`, `healthcheck`, `networks`, `command`, `entrypoint`), `docker compose up/down/ps/logs/exec/build/pull`, overriding with `-f` flag, `.env` file usage, profiles, scaling services.

**File: `examples/`**
Include: a full-stack compose file (web app + PostgreSQL + Redis) with all major keys demonstrated.

**Corresponding quiz:** `quizzes/quiz-module-08.md`

---

#### Module 09 — Dockerfile Advanced

**File: `notes.md`**
Cover: Full Dockerfile instruction reference (FROM, RUN, COPY, ADD, ENV, ARG, EXPOSE, WORKDIR, USER, ENTRYPOINT, CMD, LABEL, HEALTHCHECK, ONBUILD, STOPSIGNAL, SHELL), ENTRYPOINT vs CMD in depth (all 3 forms), build context and `.dockerignore`, layer caching — how it works and how to optimize for it, multi-stage builds (syntax, use cases, targeting a stage), BuildKit features (`--mount=type=cache`, `--mount=type=secret`), image size optimization techniques.

**File: `examples/`**
Include: a before/after pair showing an unoptimized vs optimized Dockerfile for a Node.js app. Include a multi-stage build example for a Go binary.

---

#### Module 10 — Docker Registry and Docker Hub

**File: `notes.md`**
Cover: What a registry is, Docker Hub free tier, `docker login/logout`, `docker tag`, `docker push`, `docker pull` with authentication, image naming convention (`username/repo:tag`), automated builds concept, running a private local registry with `registry:2`, pushing/pulling from a private registry.

**File: `examples/`**
Include: building, tagging, pushing to Docker Hub, and pulling the image on a different machine (simulated with `docker rmi` + `docker pull`).

---

#### Module 11 — Docker Security

**File: `notes.md`**
Cover: The Docker attack surface, principle of least privilege for containers, running as non-root user (USER in Dockerfile, `--user` flag), read-only filesystems (`--read-only`), dropping Linux capabilities (`--cap-drop`, `--cap-add`), seccomp profiles, AppArmor/SELinux overview, no-new-privileges flag, image vulnerability scanning (Docker Scout, Trivy — commands and example output), secrets management (Docker secrets vs environment variables vs mounted files), resource limits as a security control (preview Module 12), Docker daemon security (TLS, socket protection), supply chain security basics (image signing with Notation/Cosign overview).

**Corresponding quiz:** `quizzes/quiz-module-11.md`

---

#### Module 12 — Performance Tuning and Resource Limits

**File: `notes.md`**
Cover: Why resource limits matter, CPU limits (`--cpus`, `--cpu-shares`, `--cpuset-cpus`), memory limits (`--memory`, `--memory-swap`, `--oom-kill-disable`), understanding OOM killer, `docker stats` command in depth, monitoring with `docker stats` vs cAdvisor (brief), writing healthchecks for performance awareness, I/O limits (`--blkio-weight`, `--device-read-bps`), container startup performance tips, image size impact on performance, multi-stage builds for smaller images (reinforcement from Module 09).

---

#### Module 13 — Troubleshooting and Debugging

**File: `notes.md`**
Cover the following as individual H2 sections, each with the problem statement, diagnostic commands, and fix:

1. Container exits immediately
2. Port already in use
3. Volume mount permission denied
4. Container can't reach the internet
5. Two containers can't talk to each other
6. Out of disk space (images/volumes)
7. Build cache bloat
8. "exec format error" (wrong architecture)
9. Slow container startup
10. Environment variables not being picked up
11. Docker daemon not starting
12. Container memory killed (OOM)

Include a **General Debugging Flowchart** as a Mermaid diagram.

---

#### Module 14 — Docker Desktop vs Docker Engine

**File: `notes.md`**
Cover: What each is, platform support matrix, Docker Desktop architecture (VM under the hood on Mac/Windows), feature differences (GUI, Dev Environments, Extensions, Docker Scout integration), licensing changes (Docker Desktop for business), when to use Desktop vs Engine, performance differences on Mac/Windows vs native Linux, CLI equivalence, settings that matter (resource allocation in Desktop).

---

#### Module 15 — Docker on Windows with WSL2

**File: `notes.md`**
Cover: Why Docker on Windows requires WSL2, enabling WSL2 and the Virtual Machine Platform, installing a Linux distro in WSL2, installing Docker Desktop with WSL2 backend, WSL2 integration settings in Docker Desktop, running Linux containers on Windows, file system performance (keep files in WSL2 filesystem, not `/mnt/c/`), accessing Docker from both Windows terminal and WSL2 terminal, common WSL2 + Docker issues and fixes, Docker without Docker Desktop (Docker Engine inside WSL2 distro directly — advanced path).

---

#### Module 16 — Docker Swarm

**File: `notes.md`**
Cover: What orchestration is and why it's needed, Swarm mode concepts (manager nodes, worker nodes, quorum, Raft consensus), initializing a swarm (`docker swarm init`), joining nodes, services vs containers, `docker service create/ls/ps/inspect/scale/update/rm`, rolling updates and rollback, overlay networks in Swarm, secrets and configs in Swarm, stacks (`docker stack deploy` with a Compose file), when to use Swarm vs Kubernetes, Swarm limitations.

**File: `examples/`**
Include: a single-node swarm demo (for local practice) deploying a replicated web service, scaling it, and rolling it back.

**Corresponding quiz:** `quizzes/quiz-module-16.md`

---

#### Module 17 — Kubernetes Introduction

**File: `notes.md`**
Cover: Why Kubernetes exists (Swarm limitations at scale), Kubernetes architecture overview (control plane, worker nodes, etcd, API server, scheduler, kubelet), core objects (Pod, Deployment, Service, ConfigMap, Secret, Namespace, PersistentVolumeClaim), `kubectl` basics, running a local cluster with Minikube or kind, deploying the same app from Docker Compose to Kubernetes (mapping concepts), Docker's role in Kubernetes (OCI image standard), what to learn next (reference full Kubernetes learning resources — do not deep-dive Kubernetes here).

> **Copilot instruction:** Keep this module as a bridge/intro, not a full Kubernetes course. The goal is to help the learner understand the transition from Docker to Kubernetes, not to teach Kubernetes in full.

---

#### Module 18 — CI/CD Pipelines with Docker

**File: `notes.md`**
Cover two sub-sections:

**A. GitHub Actions**
- Writing a workflow YAML to build and push a Docker image on every push to `main`
- Multi-platform builds with `docker buildx` and QEMU in GitHub Actions
- Caching layers in GitHub Actions (`cache-from`, `cache-to`)
- Running tests inside a container as a CI step
- Full annotated `.github/workflows/docker.yml` example

**B. Jenkins**
- Jenkinsfile with Docker agent
- Building and pushing images from a Jenkins pipeline
- Docker-in-Docker (DinD) vs mounting the Docker socket — risks and tradeoffs
- Full annotated `Jenkinsfile` example

Include a Mermaid diagram of the full CI/CD pipeline flow for each tool.

---

#### Module 19 — Real-World Projects

This module is a hub. Write a `README.md` that introduces all 8 projects and links to their folders. Each project in `projects/` must follow this structure:

```
projects/project-XX-name/
├── README.md          ← What the project is, what Docker concepts it demonstrates
├── docker-compose.yml ← Production-ready compose file
├── Dockerfile         ← Optimized, multi-stage where applicable
├── app/               ← Minimal working application source code
└── docs/
    └── walkthrough.md ← Step-by-step guide to run, understand, and extend the project
```

**Project 01 — Node.js Web App**
Dockerize a simple Express.js REST API. Use multi-stage build. Include health checks. Use non-root user. Include compose file with a PostgreSQL service.

**Project 02 — Python Flask App**
Dockerize a Flask application with Gunicorn. Multi-stage build. Include Redis for caching. Full compose file.

**Project 03 — React App**
Multi-stage build: Stage 1 builds the React app with Node, Stage 2 serves it with nginx. Show how to pass build-time environment variables as ARG/ENV.

**Project 04 — Microservices Architecture**
3-service system: an API gateway (nginx), a user service (Node.js), and an order service (Python). All connected via a user-defined Docker network. Compose file orchestrates all services. Include inter-service communication example.

**Project 05 — ML Model Serving**
Dockerize a Python FastAPI app that serves a trained scikit-learn model. Include model file in image. Show how to handle large model files efficiently. Include GPU-aware Dockerfile variant (commented out, for reference).

**Project 06 — CI/CD with GitHub Actions**
A working repository with a `.github/workflows/` directory that builds, tests, and pushes the Project 01 app to Docker Hub automatically on push. Full walkthrough of secrets setup.

**Project 07 — CI/CD with Jenkins**
Same pipeline as Project 06 but using Jenkins. Include `docker-compose.yml` to spin up Jenkins locally. Full `Jenkinsfile`.

**Project 08 — Cloud Deployment**
Deploy the microservices project (Project 04) to:
- AWS ECS (Fargate) using task definitions
- Google Cloud Run using `gcloud` + Docker
- Azure Container Instances using Azure CLI

Each cloud provider gets its own subfolder with deployment scripts and a walkthrough.

---

#### Module 20 — Interview Preparation

**File: `notes.md`**
Write a comprehensive study guide organized by topic:
1. Docker fundamentals (10 Q&As)
2. Images and Dockerfile (10 Q&As)
3. Containers and lifecycle (10 Q&As)
4. Networking (10 Q&As)
5. Volumes and storage (10 Q&As)
6. Docker Compose (10 Q&As)
7. Security (10 Q&As)
8. Orchestration / Swarm / Kubernetes basics (10 Q&As)
9. CI/CD with Docker (5 Q&As)
10. Scenario-based / system design questions (10 open-ended questions with model answers)

**Format for each Q&A:**
```
**Q: [Question]**
A: [Answer — concise but complete. Include a command or example where relevant.]
```

Also include a **Quick Revision Cheatsheet** at the end of `notes.md` — a single-page summary of the most commonly asked facts.

---

### 3.5 Cheatsheets (`cheatsheets/`)

Each cheatsheet must follow this format:
1. Title and one-sentence description
2. A comprehensive table or structured list of commands/syntax
3. "Gotchas" section — 3–5 common mistakes or misunderstandings
4. Link back to the relevant module(s) for deeper reading

**`docker-cli-cheatsheet.md`** — All `docker` CLI commands grouped by category (container, image, volume, network, system), with flags and one-line descriptions.

**`dockerfile-cheatsheet.md`** — All Dockerfile instructions with syntax, purpose, and a one-line example for each.

**`docker-compose-cheatsheet.md`** — All Compose file keys and all `docker compose` CLI commands.

**`networking-cheatsheet.md`** — Network drivers, key commands, port mapping syntax, and DNS resolution rules.

**`security-cheatsheet.md`** — Security flags, Dockerfile security instructions, scanning commands, and a "Security Checklist" for production images.

---

### 3.6 Labs (`labs/`)

Each lab is a standalone, self-contained hands-on exercise. Every lab folder must contain:

```
labs/lab-XX-name/
├── README.md          ← Objective, prerequisites, estimated time
├── instructions.md    ← Numbered step-by-step instructions
├── Dockerfile         ← (if applicable)
├── docker-compose.yml ← (if applicable)
├── app/               ← Minimal app code needed for the lab
└── solution/          ← Complete working solution files
```

Write all 11 labs as specified in the directory structure in Section 2. Each lab must be completable in 15–45 minutes and demonstrate exactly one primary concept from the modules.

---

### 3.7 Video Scripts (`video-scripts/`)

Each video script must follow this structure:

```markdown
# Video Script: [Title]
**Estimated Duration:** X minutes
**Module Reference:** Module XX

---

## [HOOK — 0:00–0:30]
[Engaging opening that states the problem this video solves.]

## [INTRO — 0:30–1:00]
[Brief intro, what the viewer will learn by the end.]

## [SECTION 1 — Title]
[Timestamp]
[Script with stage directions in brackets, e.g., [SHOW TERMINAL], [SWITCH TO DIAGRAM]]

## [SECTION N...]

## [DEMO]
[Full walkthrough script]

## [RECAP — Last 60 seconds]
[Summary of what was covered, what's coming next.]

## [OUTRO]
[Call to action: star the repo, open the next module.]
```

Write all 7 scripts as listed in the directory structure.

---

### 3.8 Quizzes (`quizzes/`)

Each quiz must contain:
- 10 multiple-choice questions (4 options each, one correct)
- 2 short-answer questions
- A link to the answer file in `quizzes/answers/`

**Answer files** must contain:
- Correct answer letter for each MCQ
- A 2–4 sentence explanation for why that answer is correct
- Model answers for short-answer questions

---

## 4. `CONTRIBUTING.md` Instructions

Write a detailed contribution guide covering:

1. **What contributions are accepted** — Bug fixes, typo corrections, content additions (new examples, new quiz questions, additional lab steps), updating outdated commands/versions.
2. **What is NOT accepted** — Restructuring modules, renaming files, changing the linear learning path order, rewriting existing notes from scratch, adding entirely new modules (open a discussion first).
3. **How to contribute** — Fork → branch (`fix/...` or `add/...`) → PR with a clear description.
4. **PR checklist** — Markdown lints, no broken links, follows the writing style guide, tested all commands and Dockerfiles.
5. **Writing style guide** — Second person ("you"), present tense, plain English, max sentence length 25 words, every command in a code block.

---

## 5. Writing Style Rules (Apply Everywhere)

Copilot must follow these rules for every piece of content written in this repository:

| Rule | Requirement |
|---|---|
| Voice | Second person ("you"), active voice |
| Tense | Present tense |
| Explanation order | Concept → Why it exists → How it works → Command/Syntax → Real example |
| Commands | Always in fenced code blocks with the correct language tag |
| Output | Show expected terminal output after every command, in a fenced block |
| Callouts | Use `> 💡 **Pro Tip:**` and `> ⚠️ **Common Mistake:**` blockquotes |
| Links | Every module must link to the previous and next module at top and bottom |
| Diagrams | Use Mermaid wherever a visual helps (architecture, flow, state, sequence) |
| Assumptions | Never assume the reader knows something not covered in an earlier module |

---

## 6. Content Quality Checklist

Before marking any module, lab, project, or cheatsheet as complete, verify every item:

- [ ] All commands tested and working on Docker Engine 25+ and Docker Desktop 4.x+
- [ ] All Dockerfiles build without errors
- [ ] All `docker-compose.yml` files pass `docker compose config` validation
- [ ] No broken internal links
- [ ] Every module has: `README.md`, `notes.md`, `examples/`, `exercises.md`
- [ ] All exercises have expected output defined
- [ ] All callouts (Pro Tip, Common Mistake) are present in notes
- [ ] Module ends with "What's Next?" section
- [ ] Mermaid diagrams render correctly in GitHub markdown preview
- [ ] No placeholder text (e.g., "TODO", "coming soon") in any file

---

## 7. Execution Order for Copilot

Build the repository in this exact order. Do not proceed to the next phase until the current phase is complete and passes the quality checklist.

### Phase 1 — Scaffold
1. Create full directory and file tree (Section 2)
2. Write `README.md`
3. Write `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`
4. Write `roadmap/learning-path.md`

### Phase 2 — Foundations (Modules 00–05)
5. Module 00: Prerequisites
6. Module 01: Introduction
7. Module 02: Installation
8. Module 03: Core Concepts + Quiz 03
9. Module 04: Images
10. Module 05: Containers + Quiz 05
11. Labs 01–02

### Phase 3 — Intermediate (Modules 06–10)
12. Module 06: Volumes
13. Module 07: Networking + Quiz 07
14. Module 08: Docker Compose + Quiz 08
15. Module 09: Dockerfile Advanced
16. Module 10: Registry
17. Labs 03–06
18. All 5 cheatsheets

### Phase 4 — Advanced (Modules 11–15)
19. Module 11: Security + Quiz 11
20. Module 12: Performance
21. Module 13: Troubleshooting
22. Module 14: Desktop vs Engine
23. Module 15: Windows + WSL2
24. Labs 07–08

### Phase 5 — Orchestration (Modules 16–17)
25. Module 16: Docker Swarm + Quiz 16
26. Module 17: Kubernetes Intro
27. Lab 09

### Phase 6 — Production and Real World (Modules 18–20)
28. Module 18: CI/CD
29. All 8 Real-World Projects (Module 19)
30. Labs 10–11
31. Module 20: Interview Prep

### Phase 7 — Scripts and Polish
32. All 7 video scripts
33. All quiz answer files
34. Final pass: fix all broken links, verify all commands, complete quality checklist for every file

---

## 8. Versioning and Maintenance Notes

- Target Docker Engine version: **25.x and above**
- Target Docker Compose: **v2 plugin** (not v1/standalone)
- When Docker releases a major version update, create a `CHANGELOG.md` entry and update affected modules
- Deprecated commands (`docker-compose` CLI v1) must be noted as deprecated but briefly explained for legacy awareness
- All cloud deployment examples (Module 19, Project 08) should note the CLI version they were written for

---

*End of project-execution.md*
