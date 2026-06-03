# Docker Mastery — Learning Path

```mermaid
graph TD
  subgraph Phase 1 — Foundations
    M00["00 Prerequisites"]
    M01["01 Introduction to Docker"]
    M02["02 Installation"]
    M03["03 Core Concepts"]
    M04["04 Images"]
    M05["05 Containers"]
  end

  subgraph Phase 2 — Intermediate
    M06["06 Volumes and Storage"]
    M07["07 Networking"]
    M08["08 Docker Compose"]
    M09["09 Dockerfile Advanced"]
    M10["10 Registry and Hub"]
  end

  subgraph Phase 3 — Advanced
    M11["11 Security"]
    M12["12 Performance and Resource Limits"]
    M13["13 Troubleshooting"]
    M14["14 Desktop vs Engine"]
    M15["15 Windows + WSL2"]
  end

  subgraph Phase 4 — Orchestration
    M16["16 Docker Swarm"]
    M17["17 Kubernetes Intro"]
  end

  subgraph Phase 5 — Production & Real World
    M18["18 CI/CD Pipelines"]
    M19["19 Real-World Projects"]
    M20["20 Interview Prep"]
  end

  M00 --> M01 --> M02 --> M03 --> M04 --> M05 --> M06 --> M07 --> M08 --> M09 --> M10 --> M11 --> M12 --> M13 --> M14 --> M15 --> M16 --> M17 --> M18 --> M19 --> M20
```

**Phase 1 — Foundations** gives you the Linux refresh, Docker basics, and the container lifecycle you need for everything that follows. You finish this phase ready to run and inspect containers confidently.

**Phase 2 — Intermediate** shows you how to persist data, connect services, and define multi-container apps. You practice with Compose and begin optimizing builds.

**Phase 3 — Advanced** focuses on security, performance, troubleshooting, and platform differences. You learn to harden images and fix real production issues.

**Phase 4 — Orchestration** introduces Swarm and Kubernetes as the next step beyond single-host Docker. You understand why orchestration exists and when to use it.

**Phase 5 — Production & Real World** turns your knowledge into delivery skills with CI/CD, full projects, and interview preparation. You leave with a production-ready mental model.