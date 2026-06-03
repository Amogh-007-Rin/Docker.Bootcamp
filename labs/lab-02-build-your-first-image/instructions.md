# Lab 02 Instructions

1. Build the image.
   ```bash
   docker build -t lab02-web:1.0 .
   ```
   ```text
   Successfully built abcdef123456
   Successfully tagged lab02-web:1.0
   ```

2. Run the container.
   ```bash
   docker run -d --name lab02-web -p 8080:8080 lab02-web:1.0
   ```
   ```text
   1a2b3c4d5e6f
   ```

3. Verify the container is running.
   ```bash
   docker ps
   ```
   ```text
   CONTAINER ID   NAMES       STATUS
   1a2b3c4d5e6f   lab02-web   Up 1 minute
   ```

4. Stop and remove the container.
   ```bash
   docker stop lab02-web
   ```
   ```text
   lab02-web
   ```

   ```bash
   docker rm lab02-web
   ```
   ```text
   lab02-web
   ```
