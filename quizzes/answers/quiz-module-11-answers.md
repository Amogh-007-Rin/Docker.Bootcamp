# Quiz Module 11 — Answer Key

## Multiple Choice

| # | Answer | Explanation |
|---|---|---|
| 1 | B | Non-root limits filesystem and capability access if an attacker escapes the app boundary. |
| 2 | B | Read-only root FS prevents malware or bugs from modifying system paths inside the container. |
| 3 | B | `no-new-privileges` stops processes from gaining more privileges via setuid binaries. |
| 4 | C | Least privilege means drop ALL and add only required capabilities like `NET_BIND_SERVICE`. |
| 5 | C | Secrets belong in dedicated secret management, not images or git. |
| 6 | B | Trivy scans image layers for CVEs in OS packages and dependencies. |
| 7 | B | The socket API can create privileged containers on the host—treat it as root access. |
| 8 | A | `USER` sets the default runtime user for processes in the image. |
| 9 | B | CPU/memory caps prevent one container from exhausting host resources (DoS). |
| 10 | B | Signing verifies image origin and integrity in the supply chain. |

## Short Answer — Model Answers

**1. Dockerfile hardening:** Use a minimal base image (e.g. Alpine/distroless), run as non-root with `USER`, and use multi-stage builds so compilers and secrets never appear in the final layer.

**2. Env vars for passwords:** Environment variables appear in `docker inspect`, process listings, logs, and compose files; they are easy to leak. Use secrets mounts or external secret stores with rotation.
