# Module 12 Notes — Performance Tuning and Resource Limits
[Previous: Module 11 — Security](../11-security/README.md) | [Next: Module 13 — Troubleshooting](../13-troubleshooting/README.md)

## Why resource limits matter
**Concept:** Limits cap CPU, memory, and I/O so one container cannot starve others or the host.

**Why it exists:** Shared hosts and orchestrators need predictable capacity and fair scheduling.

**How it works internally:** Linux cgroups v2 (managed by containerd/runc) enforce limits the kernel applies to the cgroup.

**Command/Syntax:**
```bash
docker run -d --name limited --memory 256m --cpus 1 nginx:alpine
```
```text
a1b2c3d4e5f6
```

**Real example:**
```bash
docker inspect limited --format 'Memory={{.HostConfig.Memory}} CPUs={{.HostConfig.NanoCpus}}'
```
```text
Memory=268435456 CPUs=1000000000
```

> ⚠️ **Common Mistake:** You set limits only in production and wonder why dev laptops behave differently under load tests.

## CPU limits: `--cpus`
**Concept:** `--cpus` sets a hard ceiling on CPU time (e.g. `1.5` = one and a half cores).

**Why it exists:** Bursty apps cannot consume all host cores without a cap.

**How it works internally:** Docker maps `--cpus` to cgroup CPU quota and period.

**Command/Syntax:**
```bash
docker run --rm --cpus 0.25 alpine:3.20 sh -c "for i in $(seq 1 4); do dd if=/dev/zero of=/dev/null & done; wait"
```
```text
```

**Real example:**
```bash
docker stats --no-stream limited --format '{{.CPUPerc}}'
```
```text
0.00%
```

> 💡 **Pro Tip:** You use `--cpus` for a hard cap and `--cpu-shares` for relative weight when multiple containers compete.

## CPU shares and cpuset
**Concept:** `--cpu-shares` biases scheduling; `--cpuset-cpus` pins to specific cores.

**Why it exists:** You prioritize critical services or reduce cache thrashing on NUMA hosts.

**How it works internally:** Shares affect weight under contention; cpuset restricts which CPUs run the cgroup.

**Command/Syntax:**
```bash
docker run -d --name high --cpu-shares 2048 nginx:alpine
docker run -d --name low --cpu-shares 256 nginx:alpine
```
```text
```

**Real example:**
```bash
docker run --rm --cpuset-cpus 0 alpine:3.20 sh -c "grep Cpus_allowed_list /proc/self/status"
```
```text
Cpus_allowed_list:	0
```

## Memory limits: `--memory`
**Concept:** `--memory` sets the maximum RAM the container may use.

**Why it exists:** Memory leaks or large caches cannot take down the entire host.

**How it works internally:** The cgroup memory controller tracks usage; exceeding the limit triggers reclaim or OOM kill.

**Command/Syntax:**
```bash
docker run --rm --memory 64m alpine:3.20 sh -c "dd if=/dev/zero of=/dev/shm/big bs=1M count=128" 2>&1 || true
```
```text
Killed
```

**Real example:**
```bash
docker inspect limited --format '{{.HostConfig.Memory}}'
```
```text
268435456
```

> ⚠️ **Common Mistake:** You set `--memory` without leaving headroom for the JVM or database buffer cache and see constant OOM kills.

## Memory and swap: `--memory-swap`
**Concept:** `--memory-swap` controls total memory plus swap (often `-1` means unlimited swap up to host limit).

**Why it exists:** Swap changes whether the kernel can page anonymous memory instead of killing the process.

**How it works internally:** When swap equals memory, swap is disabled; when `-1`, swap is not capped relative to memory.

**Command/Syntax:**
```bash
docker run --rm --memory 128m --memory-swap 256m alpine:3.20 free -h
```
```text
              total        used        free
Mem:         128.0M       ...
Swap:        128.0M       ...
```

**Real example:**
```bash
docker run --rm --memory 128m --memory-swap 128m alpine:3.20 grep Swap /proc/meminfo
```
```text
SwapTotal:       0 kB
```

> 💡 **Pro Tip:** You disable swap for latency-sensitive services so the OOM killer fails fast instead of thrashing disk.

## OOM killer and `--oom-kill-disable`
**Concept:** When memory exceeds the cgroup limit, the kernel OOM killer stops processes in that cgroup.

**Why it exists:** Killing one container protects the rest of the host.

**How it works internally:** The kernel scores processes; Docker’s cgroup membership determines which container dies.

**Command/Syntax:**
```bash
docker inspect limited --format '{{.State.OOMKilled}}'
```
```text
false
```

**Real example:**
```bash
dmesg | tail -n 5 | grep -i oom || echo "No recent OOM lines (normal on Desktop)"
```
```text
No recent OOM lines (normal on Desktop)
```

> ⚠️ **Common Mistake:** You use `--oom-kill-disable` to “fix” OOM and hide a memory leak until the host becomes unstable.

## `docker stats` in depth
**Concept:** `docker stats` streams live CPU, memory, network, and block I/O per container.

**Why it exists:** You observe limits and bottlenecks without installing a full metrics stack.

**How it works internally:** Docker reads cgroup counters from the runtime and refreshes on an interval.

**Command/Syntax:**
```bash
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"
```
```text
NAME      CPU %     MEM USAGE / LIMIT     NET I/O       BLOCK I/O
limited   0.00%     2MiB / 256MiB         0B / 0B       0B / 0B
```

**Real example:**
```bash
docker stats limited --no-stream
```
```text
CONTAINER ID   NAME      CPU %     MEM USAGE / LIMIT   MEM %     NET I/O   BLOCK I/O   PIDS
```

> 💡 **Pro Tip:** You run `docker stats` while load-testing to confirm limits bite before you deploy to Kubernetes or Swarm.

## Monitoring beyond stats: cAdvisor (brief)
**Concept:** cAdvisor exposes historical container metrics for Prometheus/Grafana.

**Why it exists:** `docker stats` is interactive; production needs retention and alerting.

**How it works internally:** cAdvisor reads cgroup and filesystem stats and serves HTTP metrics.

**Command/Syntax:**
```bash
docker run -d --name cadvisor --volume /:/rootfs:ro --volume /var/run:/var/run:ro --volume /sys:/sys:ro --volume /var/lib/docker/:/var/lib/docker:ro --publish 8080:8080 gcr.io/cadvisor/cadvisor:latest
```
```text
f6e5d4c3b2a1
```

**Real example:**
```bash
curl -s http://localhost:8080/metrics | head -n 3
```
```text
# HELP cadvisor_version_info A metric with a constant '1' value labeled by kernel version...
```

## Healthchecks for performance awareness
**Concept:** `HEALTHCHECK` reports whether the app responds, not only whether the process exists.

**Why it exists:** A hung process can still run while failing requests; orchestrators need restart signals.

**How it works internally:** Docker runs the probe on an interval and updates container health status.

**Command/Syntax:**
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ || exit 1
```

**Real example:**
```bash
docker inspect limited --format '{{.State.Health.Status}}'
```
```text

```

> ⚠️ **Common Mistake:** You set a healthcheck that hits a slow dependency and mark healthy containers unhealthy under normal load.

## Block I/O limits
**Concept:** `--blkio-weight` and device rate flags throttle disk read/write throughput.

**Why it exists:** Disk-heavy batch jobs should not saturate SSDs shared with databases.

**How it works internally:** The blkio cgroup controller applies weights and bytes-per-second limits per device.

**Command/Syntax:**
```bash
docker run --rm --blkio-weight 100 alpine:3.20 dd if=/dev/zero of=/tmp/out bs=1M count=50
```
```text
50+0 records in
50+0 records out
```

**Real example:**
```bash
docker info --format '{{.DriverStatus}}' | head -n 1
```
```text
[[Backing Filesystem extfs] [Supports d_type true] ...]
```

## Container startup performance
**Concept:** Startup time includes image pull/extract, container create, and app initialization.

**Why it exists:** Autoscaling and serverless-style deploys need fast cold starts.

**How it works internally:** Fewer layers and smaller images reduce extract time; slim bases reduce process spawn cost.

**Command/Syntax:**
```bash
time docker run --rm alpine:3.20 echo ready
```
```text
ready

real	0m0.5s
```

**Real example:**
```bash
docker image ls nginx:alpine --format '{{.Size}}'
```
```text
52MB
```

> 💡 **Pro Tip:** You warm caches in CI with `docker pull` of base images before `docker build` to avoid pull latency on every pipeline run.

## Image size impact on performance
**Concept:** Smaller images pull faster, use less disk, and often start quicker.

**Why it exists:** Registry bandwidth and layer extraction dominate deploy time on fresh nodes.

**How it works internally:** Each layer is unpacked into the storage driver; duplicate layers dedupe via content address.

**Command/Syntax:**
```bash
docker history nginx:alpine --no-trunc | head -n 5
```
```text
IMAGE          CREATED       CREATED BY                                      SIZE
```

**Real example:**
```bash
docker system df
```
```text
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          12        5         1.2GB     800MB (66%)
```

> ⚠️ **Common Mistake:** You install build tools in the final image stage and pay the size cost on every deploy.

## Multi-stage builds for smaller images (reinforcement)
**Concept:** You compile in a builder stage and copy only artifacts into the runtime stage.

**Why it exists:** Module 09 showed Dockerfile patterns; here you connect them to deploy speed and memory footprint.

**How it works internally:** Only the final stage becomes the image ID clients pull and run.

**Command/Syntax:**
```dockerfile
FROM golang:1.22 AS build
WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 go build -o /app

FROM gcr.io/distroless/static-debian12
COPY --from=build /app /app
ENTRYPOINT ["/app"]
```

**Real example:**
```bash
docker images --format '{{.Repository}}:{{.Tag}} {{.Size}}' | grep demo
```
```text
demo:slim 12MB
demo:fat  380MB
```

## What’s Next?
You learn systematic debugging for common failures in Module 13 — Troubleshooting and Debugging.

[Previous: Module 11 — Security](../11-security/README.md) | [Next: Module 13 — Troubleshooting](../13-troubleshooting/README.md)
