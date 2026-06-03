# Module 11 Notes — Docker Security
[Previous: Module 10 — Registry and Hub](../10-registry-and-hub/README.md) | [Next: Module 12 — Performance and Resource Limits](../12-performance-and-resource-limits/README.md)

## The Docker attack surface
**Concept:** Docker security spans the daemon, host kernel, images, containers, networks, and registries.

**Why it exists:** A compromise in any layer can expose data or the host.

**How it works internally:** Containers share the host kernel through namespaces and cgroups; misconfiguration can break isolation.

**Command/Syntax:**
```bash
docker info --format '{{.SecurityOptions}}'
```
```text
[name=seccomp,profile=builtin] [name=apparmor]
```

**Real example:**
```bash
docker run --rm alpine:3.20 id
```
```text
uid=0(root) gid=0(root) groups=0(root),1(daemon),...
```

> ⚠️ **Common Mistake:** You assume containers are VMs and treat them as fully isolated machines.

## Principle of least privilege
**Concept:** You grant only the permissions a workload needs—nothing more.

**Why it exists:** Extra privilege widens blast radius when an app or image is exploited.

**How it works internally:** Docker applies defaults (seccomp, capability set) that you tighten with flags and Dockerfile instructions.

**Command/Syntax:**
```bash
docker run --rm --read-only --tmpfs /tmp alpine:3.20 touch /tmp/ok
```
```text
```

**Real example:**
```bash
docker run --rm --cap-drop ALL --cap-add NET_BIND_SERVICE nginx:alpine
```
```text
```

> 💡 **Pro Tip:** You document required capabilities in your image README so reviewers know why each flag exists.

## Running as non-root
**Concept:** Processes inside the container should not run as UID 0 unless required.

**Why it exists:** Root inside a container can escalate to host resources when combined with kernel bugs or mis-mounted sockets.

**How it works internally:** The `USER` instruction sets the default UID/GID; `--user` overrides at runtime.

**Command/Syntax:**
```dockerfile
RUN adduser -D -u 10001 appuser
USER appuser
```

**Real example:**
```bash
docker run --rm --user 10001:10001 alpine:3.20 id
```
```text
uid=10001 gid=10001 groups=10001
```

> ⚠️ **Common Mistake:** You set `USER` in the Dockerfile but leave files owned by root so the app cannot write logs or caches.

## Read-only root filesystem
**Concept:** `--read-only` mounts the container root filesystem as read-only.

**Why it exists:** Attackers cannot persist malware by writing to system paths.

**How it works internally:** Writable paths need explicit `--tmpfs` or volume mounts.

**Command/Syntax:**
```bash
docker run --rm --read-only --tmpfs /tmp nginx:alpine
```
```text
```

**Real example:**
```bash
docker run --rm --read-only alpine:3.20 sh -c "echo test > /etc/hack" 2>&1 || true
```
```text
sh: can't create /etc/hack: Read-only file system
```

> 💡 **Pro Tip:** You pair `--read-only` with a tmpfs for `/tmp` and a volume only where the app must persist data.

## Dropping Linux capabilities
**Concept:** Capabilities split root powers into granular privileges.

**Why it exists:** Default container capabilities include more than most apps need.

**How it works internally:** The runtime applies `cap-add` and `cap-drop` before the process starts.

**Command/Syntax:**
```bash
docker run --rm --cap-drop ALL alpine:3.20 sh -c "ip link set lo up" 2>&1 || true
```
```text
Operation not permitted
```

**Real example:**
```bash
docker run --rm --cap-drop ALL --cap-add NET_RAW alpine:3.20 ping -c 1 127.0.0.1
```
```text
PING 127.0.0.1 (127.0.0.1): 56 data bytes
64 bytes from 127.0.0.1: seq=0 ttl=64 time=0.0 ms
```

> ⚠️ **Common Mistake:** You drop `ALL` capabilities and forget `CHOWN` or `SETUID` that your entrypoint script needs.

## Seccomp profiles
**Concept:** Seccomp filters which syscalls a container may invoke.

**Why it exists:** Restricting syscalls reduces kernel exploit paths.

**How it works internally:** Docker ships a default profile (`builtin`); you can pass a custom JSON profile.

**Command/Syntax:**
```bash
docker run --rm --security-opt seccomp=unconfined alpine:3.20 echo ok
```
```text
ok
```

**Real example:**
```bash
docker inspect alpine:3.20 --format '{{.HostConfig.SecurityOpt}}'
```
```text
[]
```

> 💡 **Pro Tip:** You only use `seccomp=unconfined` for debugging—never in production without a strong reason.

## AppArmor and SELinux overview
**Concept:** Mandatory access control (MAC) labels processes and files beyond Unix permissions.

**Why it exists:** MAC limits what a compromised container can touch on the host.

**How it works internally:** Docker applies an AppArmor profile on Ubuntu/Debian or SELinux contexts on RHEL/Fedora when enabled.

**Command/Syntax:**
```bash
docker info | grep -E 'AppArmor|SELinux'
```
```text
WARNING: No blkio throttle.read_bps_device support
```

**Real example:**
```bash
docker run --rm --security-opt label=disable alpine:3.20 echo labeled
```
```text
labeled
```

> ⚠️ **Common Mistake:** You disable MAC with `label=disable` to fix volume permissions and leave it on in production.

## The no-new-privileges flag
**Concept:** `--security-opt no-new-privileges` blocks processes from gaining privileges via setuid binaries.

**Why it exists:** It closes a common escalation path after initial compromise.

**How it works internally:** The kernel sets `no_new_privs` on the container process tree.

**Command/Syntax:**
```bash
docker run --rm --security-opt no-new-privileges alpine:3.20 id
```
```text
uid=0(root) gid=0(root) groups=0(root),...
```

**Real example:**
```bash
docker run -d --name nnp-demo --security-opt no-new-privileges nginx:alpine
docker inspect nnp-demo --format '{{.HostConfig.SecurityOpt}}'
```
```text
[no-new-privileges]
```

## Image vulnerability scanning
**Concept:** Scanners compare image layers to known CVE databases.

**Why it exists:** Base images and dependencies ship vulnerabilities you must track and patch.

**How it works internally:** Tools read the image manifest and OS packages, then match CVE records.

**Command/Syntax:**
```bash
docker scout quickview nginx:alpine
```
```text
    i Info → Not all CVEs may be printed due to outdated database
...
```

**Real example:**
```bash
trivy image --severity HIGH,CRITICAL alpine:3.20
```
```text
Total: 0 (HIGH: 0, CRITICAL: 0)
```

> 💡 **Pro Tip:** You scan in CI on every build and fail the pipeline on CRITICAL findings you cannot accept.

> ⚠️ **Common Mistake:** You scan only the `latest` tag in dev and deploy an older digest that was never scanned.

## Secrets management
**Concept:** Secrets must not live in images, plain `environment` keys in Git, or world-readable bind mounts.

**Why it exists:** Registries, logs, and `docker inspect` leak env vars and image layers.

**How it works internally:** Swarm secrets and Compose `secrets` mount files in `/run/secrets`; files beat env for rotation and visibility.

**Command/Syntax:**
```yaml
services:
  api:
    secrets:
      - db_password
secrets:
  db_password:
    file: ./db_password.txt
```

**Real example:**
```bash
docker run --rm -e DB_PASS=supersecret alpine:3.20 env | grep DB_PASS
```
```text
DB_PASS=supersecret
```

> ⚠️ **Common Mistake:** You commit `.env` with production credentials because “Compose needs the values.”

## Resource limits as a security control
**Concept:** CPU and memory caps limit denial-of-service impact from runaway or malicious workloads.

**Why it exists:** One container can exhaust host RAM or CPU without limits.

**How it works internally:** cgroups enforce limits; the OOM killer stops containers that exceed memory (see Module 12).

**Command/Syntax:**
```bash
docker run --rm --memory 128m --cpus 0.5 stress-ng --vm 1 --vm-bytes 64M --timeout 5s
```
```text
```

**Real example:**
```bash
docker stats --no-stream --format "table {{.Name}}\t{{.MemUsage}}\t{{.CPUPerc}}"
```
```text
NAME      MEM USAGE / LIMIT     CPU %
```

> 💡 **Pro Tip:** You set limits in Compose `deploy.resources` (Swarm) or `mem_limit` / `cpus` at the service level for parity with `docker run`.

## Docker daemon security
**Concept:** The Docker API socket (`/var/run/docker.sock`) is root-equivalent on the host.

**Why it exists:** Anyone who can talk to the daemon can start privileged containers or mount the host filesystem.

**How it works internally:** TLS and client certificates protect remote daemons; local socket permissions protect single-host setups.

**Command/Syntax:**
```bash
docker context ls
```
```text
NAME        DESCRIPTION                               DOCKER ENDPOINT
default *   Current DOCKER_HOST based configuration   unix:///var/run/docker.sock
```

**Real example:**
```bash
groups
```
```text
... docker
```

> ⚠️ **Common Mistake:** You mount `docker.sock` into a CI container “for convenience” and grant the job full host control.

## Supply chain security basics
**Concept:** You verify image provenance and integrity before deploy.

**Why it exists:** Compromised registries or MITM pulls can substitute malicious images.

**How it works internally:** Tools like Sigstore Cosign and Notation sign manifests; policies verify signatures at admission.

**Command/Syntax:**
```bash
cosign verify --certificate-identity-regexp=.* --certificate-oidc-issuer-regexp=.* ghcr.io/org/app:latest
```
```text
Verification for ghcr.io/org/app:latest --
```

**Real example:**
```bash
docker buildx imagetools inspect nginx:alpine --format '{{json .Manifest}}' | head -c 200
```
```text
{"schemaVersion":2,"mediaType":"application/vnd.docker.distribution.manifest.v2+json",...
```

> 💡 **Pro Tip:** You pin images by digest in production Compose files, not only by tag.

## What’s Next?
You learn CPU, memory, and I/O limits in depth in Module 12 — Performance and Resource Limits.

[Previous: Module 10 — Registry and Hub](../10-registry-and-hub/README.md) | [Next: Module 12 — Performance and Resource Limits](../12-performance-and-resource-limits/README.md)
