# Module 09 Exercises — Dockerfile Advanced

## Exercise 1: Cache optimization
**Goal:** You observe cache reuse in Docker builds.
**Time estimate:** 20 minutes
**Instructions:**
1. Build an image twice and observe cache hits.
   ```bash
   docker build -t cache-demo:1.0 .
   ```
   ```text
   Using cache
   ```
2. Modify a file that appears late in the Dockerfile and rebuild.
   ```bash
   docker build -t cache-demo:1.1 .
   ```
   ```text
   Successfully built abcdef123456
   ```
**Expected output:** The second build reuses cached layers until the modified step.
**Hint:** Move dependency installs earlier to maximize cache reuse.

## Exercise 2: Multi-stage build
**Goal:** You build a multi-stage image.
**Time estimate:** 30 minutes
**Instructions:**
1. Create a multi-stage Dockerfile for a small Go app.
2. Build the image.
   ```bash
   docker build -t go-multi:1.0 .
   ```
   ```text
   Successfully built abcdef123456
   ```
**Expected output:** The final image contains only the compiled binary.
**Hint:** Use `COPY --from=build` to copy artifacts.

## Exercise 3: BuildKit cache mount
**Goal:** You enable BuildKit and use a cache mount.
**Time estimate:** 20 minutes
**Instructions:**
1. Enable BuildKit for a build.
   ```bash
   DOCKER_BUILDKIT=1 docker build -t buildkit-demo:1.0 .
   ```
   ```text
   Successfully built abcdef123456
   ```
2. Run the build again and observe faster steps.
   ```bash
   DOCKER_BUILDKIT=1 docker build -t buildkit-demo:1.0 .
   ```
   ```text
   Using cache
   ```
**Expected output:** The second build is faster due to cached dependencies.
**Hint:** Cache mounts do not persist in the final image.
