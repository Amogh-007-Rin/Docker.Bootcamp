# Docker Architecture

How the Docker CLI, daemon, and lower-level components interact to run containers. The user issues commands to the Docker CLI, which communicates via REST API to `dockerd`, which delegates to `containerd` and `runc` for actual container lifecycle management.

```mermaid
graph TB
    User([User])

    subgraph Client
        CLI[Docker CLI<br/>docker run, build, pull]
    end

    subgraph "Local Host"
        REST[REST API<br/>Unix socket / TCP]
        DOCKERD[dockerd<br/>Docker Daemon]
        CONTAINERD[containerd<br/>Container Runtime]
        RUNC[runc<br/>OCI Runtime]
        SHIM[containerd-shim<br/>Per-container shim]

        subgraph Storage
            IMAGES[(Images<br/>Layer Cache)]
            VOLUMES[(Volumes<br/>Persistent Data)]
        end

        subgraph Network
            NETWORKS[(Networks<br/>CNI / libnetwork)]
        end

        CONTAINER1[Container 1]
        CONTAINER2[Container 2]
    end

    subgraph Registry
        REGISTRY[Image Registry<br/>Docker Hub / ECR / GCR]
    end

    User -->|docker run nginx| CLI
    CLI -->|HTTP Request| REST
    REST --> DOCKERD
    DOCKERD -->|gRPC| CONTAINERD
    CONTAINERD -->|OCI bundle| RUNC
    RUNC -->|namespaces + cgroups| CONTAINER1
    RUNC -->|namespaces + cgroups| CONTAINER2
    CONTAINERD --> SHIM
    SHIM --> CONTAINER1
    SHIM --> CONTAINER2
    DOCKERD -->|pull / push| REGISTRY
    DOCKERD --> IMAGES
    DOCKERD --> VOLUMES
    DOCKERD --> NETWORKS
    IMAGES -.->|layer mounts| CONTAINER1
    IMAGES -.->|layer mounts| CONTAINER2
    VOLUMES -.->|data mounts| CONTAINER1
    VOLUMES -.->|data mounts| CONTAINER2
    NETWORKS -.->|network ns| CONTAINER1
    NETWORKS -.->|network ns| CONTAINER2
```

**Layer overview:**
1. **Docker CLI** — user-facing command-line tool
2. **REST API** — HTTP interface exposed on `/var/run/docker.sock`
3. **dockerd** — the long-running daemon that manages objects (containers, images, volumes, networks)
4. **containerd** — industry-standard container runtime, manages image transfer and container lifecycle
5. **containerd-shim** — per-container process that keeps the container's stdio open after runc exits
6. **runc** — low-level OCI runtime that creates the actual container (cgroups, namespaces)
