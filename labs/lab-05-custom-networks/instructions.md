# Lab 05 Instructions

1. Create network `lab05-net`.
   ```bash
   docker network create lab05-net
   ```

2. Run two Alpine containers with names on that network.
   ```bash
   docker run -d --name lab05-a --network lab05-net alpine:3.20 sleep 3600
   docker run -d --name lab05-b --network lab05-net alpine:3.20 sleep 3600
   ```

3. Ping B from A by container name.
   ```bash
   docker exec lab05-a ping -c 2 lab05-b
   ```
   ```text
   2 packets transmitted, 2 received
   ```

4. Inspect network attachments.
   ```bash
   docker network inspect lab05-net --format '{{range .Containers}}{{.Name}} {{end}}'
   ```
   ```text
   lab05-a lab05-b
   ```

5. Clean up.
   ```bash
   docker rm -f lab05-a lab05-b
   docker network rm lab05-net
   ```
