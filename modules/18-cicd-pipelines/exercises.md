# Module 18 Exercises — CI/CD Pipelines with Docker

## Exercise 1: Validate a GitHub Actions workflow locally
**Goal:** You dry-run workflow logic before pushing to GitHub.
**Time estimate:** 20 minutes
**Instructions:**
1. Copy [examples/docker.yml](examples/docker.yml) to a test repo as `.github/workflows/docker.yml`.
   ```bash
   mkdir -p .github/workflows
   cp modules/18-cicd-pipelines/examples/docker.yml .github/workflows/docker.yml
   ```
   ```text
   ```
2. From the repo root, build the test image the workflow uses.
   ```bash
   docker build --target test -t app:test .
   ```
   ```text
   [+] Building ... FINISHED
   ```
3. Run tests the same way CI does.
   ```bash
   docker run --rm app:test npm test
   ```
   ```text
   PASS
   ```
**Expected output:** Local build and test succeed without pushing to a registry.
**Hint:** If you lack a `test` stage, add a minimal Dockerfile stage that runs `npm test` or `pytest`.

## Exercise 2: Buildx and registry cache
**Goal:** You speed up repeated CI builds with Buildx cache export.
**Time estimate:** 25 minutes
**Instructions:**
1. Create a Buildx builder.
   ```bash
   docker buildx create --name ci-builder --use
   ```
   ```text
   ci-builder
   ```
2. Build with inline cache and push to your registry (replace `username/app`).
   ```bash
   docker buildx build --cache-to type=inline --tag username/app:cache-demo --push .
   ```
   ```text
   => exporting to image
   ```
3. Rebuild using cache-from.
   ```bash
   docker buildx build --cache-from type=registry,ref=username/app:cache-demo --tag username/app:cache-demo2 --push .
   ```
   ```text
   => CACHED
   ```
**Expected output:** The second build reuses layers (`CACHED` lines in output).
**Hint:** You must be logged in: `docker login`.

## Exercise 3: Compare socket vs DinD (observation)
**Goal:** You articulate the tradeoff between socket mount and Docker-in-Docker.
**Time estimate:** 15 minutes
**Instructions:**
1. Inspect a running Jenkins or local agent that uses the socket.
   ```bash
   docker inspect jenkins --format '{{json .Mounts}}' | head -c 200
   ```
   ```text
   [{"Type":"bind","Source":"/var/run/docker.sock"...
   ```
2. Start a DinD container (lab only—not production).
   ```bash
   docker run --rm --privileged docker:27-dind docker version
   ```
   ```text
   Server: Docker Engine ...
   ```
3. Write three bullet points in your notes: speed, isolation, and risk for each approach.
**Expected output:** You can explain why socket mount is fast but dangerous on multi-tenant Jenkins.
**Hint:** Read the DinD vs socket table in [notes.md](notes.md).
