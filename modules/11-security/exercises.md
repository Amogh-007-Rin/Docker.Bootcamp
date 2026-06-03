# Module 11 Exercises — Docker Security

## Exercise 1: Run nginx as non-root with dropped capabilities
**Goal:** You start nginx with a reduced capability set and confirm it still serves HTTP.
**Time estimate:** 20 minutes
**Instructions:**
1. Run nginx with all capabilities dropped except those needed to bind port 80 inside the container.
   ```bash
   docker run -d --name sec-nginx --cap-drop ALL --cap-add CHOWN --cap-add SETGID --cap-add SETUID --cap-add NET_BIND_SERVICE nginx:alpine
   ```
   ```text
   a1b2c3d4e5f6
   ```
2. Verify the container is running.
   ```bash
   docker ps --filter name=sec-nginx --format '{{.Names}} {{.Status}}'
   ```
   ```text
   sec-nginx Up ...
   ```
3. Fetch the default page from inside the container network namespace.
   ```bash
   docker exec sec-nginx wget -qO- http://127.0.0.1 | head -n 1
   ```
   ```text
   <!DOCTYPE html>
   ```
4. Remove the container when finished.
   ```bash
   docker rm -f sec-nginx
   ```
   ```text
   sec-nginx
   ```
**Expected output:** nginx stays up and returns HTML without running with the full default capability set.
**Hint:** Official nginx images may need `CHOWN`, `SETGID`, and `SETUID` for startup scripts.

## Exercise 2: Read-only root with tmpfs
**Goal:** You run a container with a read-only root filesystem and a writable `/tmp`.
**Time estimate:** 15 minutes
**Instructions:**
1. Start Alpine with `--read-only` and a tmpfs mount on `/tmp`.
   ```bash
   docker run -d --name ro-demo --read-only --tmpfs /tmp:rw,noexec,nosuid,size=64m alpine:3.20 sleep 3600
   ```
   ```text
   b2c3d4e5f6a7
   ```
2. Prove you can write under `/tmp`.
   ```bash
   docker exec ro-demo sh -c "echo ok > /tmp/test && cat /tmp/test"
   ```
   ```text
   ok
   ```
3. Prove you cannot write under `/etc`.
   ```bash
   docker exec ro-demo sh -c "echo bad > /etc/test" 2>&1 || true
   ```
   ```text
   sh: can't create /etc/test: Read-only file system
   ```
4. Clean up.
   ```bash
   docker rm -f ro-demo
   ```
   ```text
   ro-demo
   ```
**Expected output:** Writes succeed on `/tmp` and fail on the read-only root.
**Hint:** Add `--tmpfs` for every path your app must write at runtime.

## Exercise 3: Scan an image for vulnerabilities
**Goal:** You scan a public image and interpret severity output.
**Time estimate:** 25 minutes
**Instructions:**
1. Pull a small base image.
   ```bash
   docker pull alpine:3.20
   ```
   ```text
   Status: Downloaded newer image for alpine:3.20
   ```
2. If Trivy is installed, scan for HIGH and CRITICAL issues.
   ```bash
   trivy image --severity HIGH,CRITICAL alpine:3.20
   ```
   ```text
   Total: ...
   ```
   Alternatively, use Docker Scout:
   ```bash
   docker scout quickview alpine:3.20
   ```
   ```text
   ...
   ```
3. Note one CVE ID (if any) and which package it affects from the report.
**Expected output:** You see a structured vulnerability table with severities and package names.
**Hint:** Install Trivy from https://github.com/aquasecurity/trivy or enable Docker Scout in Docker Desktop.
