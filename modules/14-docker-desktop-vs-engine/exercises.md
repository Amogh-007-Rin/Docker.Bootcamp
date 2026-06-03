# Module 14 Exercises — Docker Desktop vs Engine

## Exercise 1: Inspect your runtime
**Goal:** You identify whether your daemon is Desktop-backed or native Engine.
**Time estimate:** 10 minutes
**Instructions:**
1. Print Docker version information.
   ```bash
   docker version
   ```
   ```text
   Client: Docker Engine - Community
    Server: Docker Engine - Community
   ```
2. List contexts and note the active one.
   ```bash
   docker context ls
   ```
   ```text
   NAME                DESCRIPTION
   default             ...
   desktop-linux *     Docker Desktop
   ```
3. Show server operating system from `docker info`.
   ```bash
   docker info --format 'OS: {{.OperatingSystem}}'
   ```
   ```text
   OS: Docker Desktop
   ```
**Expected output:** You can state your platform (Linux native vs Desktop) and active context name.
**Hint:** On Linux servers, `desktop-linux` context usually does not exist.

## Exercise 2: Compare resource visibility
**Goal:** You relate Desktop resource limits to container behavior.
**Time estimate:** 15 minutes
**Instructions:**
1. Check disk usage inside Docker.
   ```bash
   docker system df
   ```
   ```text
   TYPE            TOTAL     ACTIVE    SIZE
   Images          ...
   ```
2. Run a one-off container with a memory limit smaller than a typical build.
   ```bash
   docker run --rm --memory=64m alpine:3.20 sh -c "echo ok"
   ```
   ```text
   ok
   ```
3. If you use Desktop, open **Settings → Resources** and note your VM memory limit. Relate it to any build OOM errors you have seen.
**Expected output:** You document your Desktop RAM allocation (or note “N/A — native Engine”) and explain how it caps all containers combined.
**Hint:** `docker stats` shows per-container usage, not the Desktop VM cap.

## Exercise 3: Context and CLI portability
**Goal:** You prove the same commands work across contexts.
**Time estimate:** 15 minutes
**Instructions:**
1. Run a hello container.
   ```bash
   docker run --rm hello-world
   ```
   ```text
   Hello from Docker!
   ```
2. If a non-default context exists (e.g. `desktop-linux`), switch and repeat.
   ```bash
   docker context use desktop-linux
   docker run --rm hello-world
   ```
   ```text
   Hello from Docker!
   ```
3. Switch back to your usual context.
   ```bash
   docker context use default
   ```
   ```text
   default
   ```
**Expected output:** Hello-world succeeds on each context you test; you understand context only changes the daemon endpoint.
**Hint:** Do not create new contexts unless Module 07+ exercises already taught you how—use existing ones only.
