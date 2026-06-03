# Lab 08 Instructions

1. Pull nginx (or build from `Dockerfile` in this lab).
   ```bash
   cd labs/lab-08-security-hardening
   docker pull nginx:1.27-alpine
   ```

2. Run with security flags (read-only root, tmpfs for writable paths, cap drop).
   ```bash
   docker run -d --name lab08 \
     --read-only \
     --tmpfs /var/cache/nginx --tmpfs /var/run \
     --cap-drop ALL --cap-add NET_BIND_SERVICE \
     --security-opt no-new-privileges \
     -p 8080:80 nginx:1.27-alpine
   ```

3. Verify the process user.
   ```bash
   docker exec lab08 id
   ```
   ```text
   uid=101(nginx) gid=101(nginx) groups=101(nginx)
   ```

4. Scan the image (optional, requires network for Trivy pull).
   ```bash
   docker scout quickview lab08-nginx
   ```

5. Clean up.
   ```bash
   docker rm -f lab08
   ```

> Note: Official nginx listens on 80; for this lab you may map `-p 8080:80` if using stock nginx config, or adjust the Dockerfile to listen on 8080 as non-root.
