# Docker Security Cheatsheet
Hardening flags, Dockerfile practices, scanning, and a production checklist.

## Runtime hardening flags

| Flag / option | Purpose |
|---|---|
| `--user 1000:1000` | Run as non-root UID/GID |
| `--read-only` | Read-only root filesystem |
| `--tmpfs /tmp` | Writable temp with read-only root |
| `--cap-drop ALL` | Drop all Linux capabilities |
| `--cap-add NET_BIND_SERVICE` | Add only required caps |
| `--security-opt no-new-privileges` | Block privilege escalation |
| `--security-opt seccomp=profile.json` | Custom seccomp profile |
| `--memory 512m` | Memory limit (DoS mitigation) |
| `--cpus 1.0` | CPU limit |

## Dockerfile security

```dockerfile
FROM node:22-alpine
RUN addgroup -S app && adduser -S app -G app
USER app
COPY --chown=app:app . .
HEALTHCHECK CMD wget -qO- http://localhost:3000/health || exit 1
```

- Pin base images with digest or version tag.
- Do not `COPY` secrets into the image.
- Use multi-stage builds to exclude build tools from the final image.

## Vulnerability scanning

```bash
docker scout quickview myimage:tag
docker scout cves myimage:tag

docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image myimage:tag
```

## Secrets handling

| Approach | When to use |
|---|---|
| Environment variables | Non-sensitive config only |
| Bind-mounted files | Dev/single-host; restrict permissions |
| Docker Swarm secrets | Swarm deployments |
| External secret store | Production (Vault, cloud SM) |

## Security checklist (production images)

- [ ] Run as non-root `USER`
- [ ] Pin base image version or digest
- [ ] Scan image in CI (Scout, Trivy, or equivalent)
- [ ] No secrets in image layers or env in compose files committed to git
- [ ] Read-only root FS where possible
- [ ] Drop unnecessary capabilities
- [ ] Set CPU and memory limits
- [ ] Use user-defined networks; avoid `--privileged`
- [ ] Keep Docker Engine and images updated
- [ ] Protect Docker socket (`/var/run/docker.sock`) — never expose publicly

## Gotchas

1. **Root in container is still powerful** — UID 0 inside the container can be dangerous with misconfigured caps.
2. **Socket mount = root on host** — Mounting `docker.sock` into a container grants host-level control.
3. **`.env` in git** — Never commit real passwords; use `.env.example` templates.
4. **`latest` tag** — Unpredictable updates can introduce vulnerabilities silently.
5. **Scanning is not enough** — Fix CVEs by rebuilding with patched bases, not ignoring high severity.

## Deeper reading

- [Module 11 — Security](../modules/11-security/README.md)
- [Module 12 — Performance and Resource Limits](../modules/12-performance-and-resource-limits/README.md)
