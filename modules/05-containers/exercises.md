# Module 05 Exercises — Containers

## Exercise 1: Run with flags
**Goal:** You practice common `docker run` flags.
**Time estimate:** 15 minutes
**Instructions:**
1. Run `docker run -d --name nginx-demo -p 8080:80 nginx:1.27`.
   ```bash
   docker run -d --name nginx-demo -p 8080:80 nginx:1.27
   ```
   ```text
   4f3e2d1c0b9a
   ```
2. Run `docker ps` and confirm the name and port mapping.
   ```bash
   docker ps
   ```
   ```text
   CONTAINER ID   NAMES       STATUS
   4f3e2d1c0b9a   nginx-demo  Up 1 minute
   ```
3. Run `docker stop nginx-demo` and `docker rm nginx-demo`.
   ```bash
   docker stop nginx-demo
   ```
   ```text
   nginx-demo
   ```
   ```bash
   docker rm nginx-demo
   ```
   ```text
   nginx-demo
   ```
**Expected output:** The container runs on port 8080 and then stops cleanly.
**Hint:** Use `--name` to make the container easy to manage.

## Exercise 2: Exec and logs
**Goal:** You inspect logs and run commands inside a container.
**Time estimate:** 15 minutes
**Instructions:**
1. Start nginx again in detached mode.
   ```bash
   docker run -d --name nginx-demo nginx:1.27
   ```
   ```text
   9a8b7c6d5e4f
   ```
2. Run `docker logs nginx-demo`.
   ```bash
   docker logs nginx-demo
   ```
   ```text
   2026/01/01 09:00:00 [notice] 1#1: start worker processes
   ```
3. Run `docker exec nginx-demo nginx -v`.
   ```bash
   docker exec nginx-demo nginx -v
   ```
   ```text
   nginx version: nginx/1.27.0
   ```
**Expected output:** Logs print startup messages and nginx reports its version.
**Hint:** Use `-it` if you need a shell inside the container.

## Exercise 3: Copy files
**Goal:** You copy files between host and container.
**Time estimate:** 15 minutes
**Instructions:**
1. Create a file named `index.html` on your host.
   ```bash
   echo "hello" > index.html
   ```
   ```text
   ```
2. Run `docker cp index.html nginx-demo:/usr/share/nginx/html/index.html`.
   ```bash
   docker cp index.html nginx-demo:/usr/share/nginx/html/index.html
   ```
   ```text
   ```
3. Run `docker exec nginx-demo cat /usr/share/nginx/html/index.html`.
   ```bash
   docker exec nginx-demo cat /usr/share/nginx/html/index.html
   ```
   ```text
   hello
   ```
**Expected output:** The file content prints inside the container.
**Hint:** Use `docker cp` for quick edits without rebuilding.
