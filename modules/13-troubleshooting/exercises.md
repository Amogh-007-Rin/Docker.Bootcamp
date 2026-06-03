# Module 13 Exercises — Troubleshooting and Debugging

## Exercise 1: Diagnose a container that exits immediately
**Goal:** You find why a misconfigured container exits and fix the run command.
**Time estimate:** 20 minutes
**Instructions:**
1. Run a container that exits because the command ends (intentional failure case).
   ```bash
   docker run -d --name exit-demo alpine:3.20 echo hello
   ```
   ```text
   d4e5f6a7b8c9
   ```
2. Confirm it is not running and read logs.
   ```bash
   docker ps -a --filter name=exit-demo --format '{{.Status}}'
   docker logs exit-demo
   ```
   ```text
   Exited (0) ...
   hello
   ```
3. Run a long-lived replacement with an explicit keep-alive command.
   ```bash
   docker rm exit-demo
   docker run -d --name exit-demo alpine:3.20 sleep 3600
   docker ps --filter name=exit-demo --format '{{.Names}} {{.Status}}'
   ```
   ```text
   exit-demo Up ...
   ```
4. Clean up.
   ```bash
   docker rm -f exit-demo
   ```
   ```text
   exit-demo
   ```
**Expected output:** You explain that PID 1 ended in the first run; the second run stays `Up`.
**Hint:** Use `docker inspect exit-demo --format '{{.State.ExitCode}}'` for non-zero failures.

## Exercise 2: Fix container DNS on a user-defined network
**Goal:** You connect two containers and verify name-based HTTP works.
**Time estimate:** 25 minutes
**Instructions:**
1. Create a network and start nginx as `web`.
   ```bash
   docker network create troubleshoot-net
   docker run -d --name web --network troubleshoot-net nginx:alpine
   ```
   ```text
   troubleshoot-net
   e5f6a7b8c9d0
   ```
2. From an ephemeral client on the same network, request by name.
   ```bash
   docker run --rm --network troubleshoot-net alpine:3.20 wget -qO- http://web | head -n 1
   ```
   ```text
   <!DOCTYPE html>
   ```
3. Tear down.
   ```bash
   docker rm -f web
   docker network rm troubleshoot-net
   ```
   ```text
   web
   troubleshoot-net
   ```
**Expected output:** HTML is returned when using hostname `web`, not only by IP.
**Hint:** If this fails, compare with `docker network inspect troubleshoot-net`.

## Exercise 3: Reclaim disk with prune
**Goal:** You measure Docker disk usage and reclaim space safely.
**Time estimate:** 15 minutes
**Instructions:**
1. Record usage before prune.
   ```bash
   docker system df
   ```
   ```text
   TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
   Images          ...
   ```
2. Remove stopped containers and unused networks (not volumes unless you intend to).
   ```bash
   docker system prune -f
   ```
   ```text
   Total reclaimed space: ...
   ```
3. Record usage after prune.
   ```bash
   docker system df
   ```
   ```text
   TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
   ```
**Expected output:** Reclaimable space drops or `Total reclaimed space` shows a positive value.
**Hint:** Add `--volumes` only when you accept deleting unused volume data.
