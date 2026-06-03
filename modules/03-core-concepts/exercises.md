# Module 03 Exercises — Core Concepts

## Exercise 1: Image vs container
**Goal:** You prove the difference between an image and a container.
**Time estimate:** 15 minutes
**Instructions:**
1. Run `docker pull alpine:3.20`.
   ```bash
   docker pull alpine:3.20
   ```
   ```text
   Status: Downloaded newer image for alpine:3.20
   ```
2. Run `docker run --name demo-alpine alpine:3.20 echo "hi"`.
   ```bash
   docker run --name demo-alpine alpine:3.20 echo "hi"
   ```
   ```text
   hi
   ```
3. Run `docker images` and `docker ps -a`.
   ```bash
   docker images | head -n 2
   ```
   ```text
   REPOSITORY   TAG     IMAGE ID
   alpine       3.20    0d3f7b5f2f
   ```
   ```bash
   docker ps -a | head -n 2
   ```
   ```text
   CONTAINER ID   NAMES        STATUS
   1a2b3c4d5e6f   demo-alpine  Exited (0) 1 minute ago
   ```
**Expected output:** You see the image in `docker images` and the container in `docker ps -a`.
**Hint:** The container is an instance created from the image.

## Exercise 2: Layer inspection
**Goal:** You inspect image layers.
**Time estimate:** 10 minutes
**Instructions:**
1. Run `docker history alpine:3.20`.
   ```bash
   docker history alpine:3.20
   ```
   ```text
   IMAGE          CREATED        CREATED BY
   0d3f7b5f2f     2 weeks ago    /bin/sh -c #(nop)  CMD ["/bin/sh"]
   ```
2. Run `docker inspect alpine:3.20 --format '{{.RootFS.Layers}}'`.
   ```bash
   docker inspect alpine:3.20 --format '{{.RootFS.Layers}}'
   ```
   ```text
   [sha256:...]
   ```
**Expected output:** You see a list of layers and their creation commands.
**Hint:** Each layer is immutable and cached.

## Exercise 3: State transitions
**Goal:** You practice container states.
**Time estimate:** 15 minutes
**Instructions:**
1. Run `docker run -d --name state-demo nginx:1.27`.
   ```bash
   docker run -d --name state-demo nginx:1.27
   ```
   ```text
   7e6d5c4b3a2f
   ```
2. Run `docker pause state-demo`.
   ```bash
   docker pause state-demo
   ```
   ```text
   state-demo
   ```
3. Run `docker unpause state-demo`.
   ```bash
   docker unpause state-demo
   ```
   ```text
   state-demo
   ```
4. Run `docker stop state-demo`.
   ```bash
   docker stop state-demo
   ```
   ```text
   state-demo
   ```
**Expected output:** The container moves from running to paused to exited.
**Hint:** Use `docker ps -a` to confirm the status.
