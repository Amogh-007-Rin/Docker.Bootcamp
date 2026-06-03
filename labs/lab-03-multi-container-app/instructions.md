# Lab 03 Instructions

1. Create a user-defined network.
   ```bash
   docker network create lab03-net
   ```
   ```text
   lab03-net
   ```

2. Start a simple API container on the network.
   ```bash
   docker run -d --name lab03-api --network lab03-net hashicorp/http-echo -text="hello from api"
   ```
   ```text
   a1b2c3d4e5f6
   ```

3. Start nginx as a reverse proxy on the same network and publish port 8080.
   ```bash
   docker run -d --name lab03-web --network lab03-net -p 8080:80 nginx:1.27
   ```
   ```text
   f6e5d4c3b2a1
   ```

4. From the web container, reach the API by DNS name.
   ```bash
   docker exec lab03-web curl -s http://lab03-api:5678
   ```
   ```text
   hello from api
   ```

5. Clean up.
   ```bash
   docker rm -f lab03-web lab03-api
   docker network rm lab03-net
   ```
   ```text
   lab03-web
   lab03-api
   lab03-net
   ```
