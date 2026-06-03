# Module 12 Exercises — Performance and Resource Limits

## Exercise 1: Observe live stats under load
**Goal:** You run a CPU-heavy container and read `docker stats` output.
**Time estimate:** 15 minutes
**Instructions:**
1. Start a container that burns CPU for 30 seconds.
   ```bash
   docker run -d --name cpu-burn --cpus 0.5 alpine:3.20 sh -c "while true; do :; done"
   ```
   ```text
   c1d2e3f4a5b6
   ```
2. Stream stats once without streaming mode.
   ```bash
   docker stats --no-stream cpu-burn --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"
   ```
   ```text
   NAME       CPU %     MEM USAGE / LIMIT
   cpu-burn   ...       ... / ...
   ```
3. Stop and remove the container.
   ```bash
   docker rm -f cpu-burn
   ```
   ```text
   cpu-burn
   ```
**Expected output:** CPU percentage reflects activity and respects the 0.5 CPU cap over time.
**Hint:** Run `docker stats` twice a few seconds apart if the first sample shows 0%.

## Exercise 2: Trigger and detect OOM
**Goal:** You set a low memory limit and confirm the container is killed.
**Time estimate:** 20 minutes
**Instructions:**
1. Run a container with a 64 MB memory limit that allocates more than the limit.
   ```bash
   docker run --name oom-test --memory 64m alpine:3.20 sh -c "dd if=/dev/zero of=/dev/shm/big bs=1M count=128" 2>&1 || true
   ```
   ```text
   Killed
   ```
2. Inspect OOM and exit code.
   ```bash
   docker inspect oom-test --format 'OOMKilled={{.State.OOMKilled}} ExitCode={{.State.ExitCode}}'
   ```
   ```text
   OOMKilled=true ExitCode=137
   ```
3. Remove the container.
   ```bash
   docker rm oom-test
   ```
   ```text
   oom-test
   ```
**Expected output:** `OOMKilled=true` and exit code `137`.
**Hint:** Writing to `/dev/shm` counts toward cgroup memory on most setups.

## Exercise 3: Compare image sizes after multi-stage mindset
**Goal:** You compare two tags and relate size to pull/startup cost.
**Time estimate:** 20 minutes
**Instructions:**
1. Pull a full and a slim variant.
   ```bash
   docker pull nginx:latest
   docker pull nginx:alpine
   ```
   ```text
   Status: Downloaded newer image for nginx:latest
   Status: Downloaded newer image for nginx:alpine
   ```
2. List sizes side by side.
   ```bash
   docker images nginx --format "table {{.Tag}}\t{{.Size}}"
   ```
   ```text
   TAG       SIZE
   latest    ...
   alpine    ...
   ```
3. Time a cold run for each (remove container between runs).
   ```bash
   docker run --rm nginx:alpine echo alpine-ready
   docker run --rm nginx:latest echo latest-ready
   ```
   ```text
   alpine-ready
   latest-ready
   ```
**Expected output:** `alpine` is smaller on disk; you note which tag you would choose for production edge proxies.
**Hint:** Module 09 multi-stage builds aim for the same outcome—small runtime artifacts only.
