# Module 06 Exercises — Volumes and Storage

## Exercise 1: Create and inspect a volume
**Goal:** You create a named volume and inspect it.
**Time estimate:** 10 minutes
**Instructions:**
1. Create a volume named `data-vol`.
   ```bash
   docker volume create data-vol
   ```
   ```text
   data-vol
   ```
2. Inspect the volume mount point.
   ```bash
   docker volume inspect data-vol --format '{{.Mountpoint}}'
   ```
   ```text
   /var/lib/docker/volumes/data-vol/_data
   ```
**Expected output:** You see the mount point for the volume.
**Hint:** Named volumes live in Docker’s managed storage.

## Exercise 2: Persist data across restarts
**Goal:** You verify data persists with a named volume.
**Time estimate:** 20 minutes
**Instructions:**
1. Start a PostgreSQL container with a named volume.
   ```bash
   docker run -d --name pg-demo -e POSTGRES_PASSWORD=pass -v pgdata:/var/lib/postgresql/data postgres:16
   ```
   ```text
   6a5b4c3d2e1f
   ```
2. Stop and remove the container.
   ```bash
   docker rm -f pg-demo
   ```
   ```text
   pg-demo
   ```
3. Start it again with the same volume.
   ```bash
   docker run -d --name pg-demo -e POSTGRES_PASSWORD=pass -v pgdata:/var/lib/postgresql/data postgres:16
   ```
   ```text
   9f8e7d6c5b4a
   ```
**Expected output:** The database initializes once and reuses the same data directory.
**Hint:** Use the same volume name to reuse data.

## Exercise 3: Use a bind mount
**Goal:** You mount a host directory into a container.
**Time estimate:** 15 minutes
**Instructions:**
1. Create a host folder named `bind-data`.
   ```bash
   mkdir -p bind-data
   ```
   ```text
   ```
2. Run a container with a bind mount.
   ```bash
   docker run --rm -v "$(pwd)/bind-data:/data" alpine:3.20 sh -c "echo hello > /data/msg.txt"
   ```
   ```text
   ```
3. Verify the file exists on the host.
   ```bash
   cat bind-data/msg.txt
   ```
   ```text
   hello
   ```
**Expected output:** The file appears on the host.
**Hint:** Bind mounts are great for development.
