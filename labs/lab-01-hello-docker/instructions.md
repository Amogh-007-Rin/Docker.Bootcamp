# Lab 01 Instructions

1. Run the official hello-world container.
   ```bash
   docker run hello-world
   ```
   ```text
   Hello from Docker!
   This message shows that your installation appears to be working correctly.
   ```

2. Run nginx in detached mode and publish port 8080.
   ```bash
   docker run -d --name lab01-nginx -p 8080:80 nginx:1.27
   ```
   ```text
   9f8e7d6c5b4a
   ```

3. Confirm the container is running.
   ```bash
   docker ps
   ```
   ```text
   CONTAINER ID   NAMES         STATUS
   9f8e7d6c5b4a   lab01-nginx   Up 1 minute
   ```

4. Stop and remove the container.
   ```bash
   docker stop lab01-nginx
   ```
   ```text
   lab01-nginx
   ```

   ```bash
   docker rm lab01-nginx
   ```
   ```text
   lab01-nginx
   ```
