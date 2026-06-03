# Module 04 Exercises — Docker Images

## Exercise 1: Pull and list
**Goal:** You pull a specific tag and list images.
**Time estimate:** 10 minutes
**Instructions:**
1. Run `docker pull nginx:1.27`.
   ```bash
   docker pull nginx:1.27
   ```
   ```text
   Status: Downloaded newer image for nginx:1.27
   ```
2. Run `docker images` and find the nginx entry.
   ```bash
   docker images | head -n 2
   ```
   ```text
   REPOSITORY   TAG     IMAGE ID
   nginx        1.27    0123456789ab
   ```
3. Note the image ID and size.
**Expected output:** The nginx image appears in the list with a tag.
**Hint:** Use a versioned tag instead of `latest`.

## Exercise 2: Inspect layers
**Goal:** You inspect layers and metadata.
**Time estimate:** 15 minutes
**Instructions:**
1. Run `docker history nginx:1.27`.
   ```bash
   docker history nginx:1.27
   ```
   ```text
   IMAGE          CREATED        CREATED BY
   0123456789ab   2 weeks ago    /bin/sh -c #(nop)  CMD ["nginx" "-g" "daemon off;"]
   ```
2. Run `docker inspect nginx:1.27 --format '{{.RootFS.Layers}}'`.
   ```bash
   docker inspect nginx:1.27 --format '{{.RootFS.Layers}}'
   ```
   ```text
   [sha256:...]
   ```
**Expected output:** You see the layer list and build commands.
**Hint:** The history output is a good way to spot large layers.

## Exercise 3: Clean up images
**Goal:** You remove an image and prune dangling layers.
**Time estimate:** 10 minutes
**Instructions:**
1. Run `docker rmi nginx:1.27`.
   ```bash
   docker rmi nginx:1.27
   ```
   ```text
   Untagged: nginx:1.27
   ```
2. Run `docker image prune -f`.
   ```bash
   docker image prune -f
   ```
   ```text
   Total reclaimed space: 120MB
   ```
**Expected output:** The nginx tag is removed and unused layers are cleaned.
**Hint:** Containers using an image must be stopped first.
