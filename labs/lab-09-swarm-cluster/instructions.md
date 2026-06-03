# Lab 09 Instructions

1. Initialize Swarm on your machine.
   ```bash
   docker swarm init
   ```
   ```text
   Swarm initialized: current node (xxx) is now a manager.
   ```

2. Create a replicated nginx service.
   ```bash
   docker service create --name lab09-web -p 8080:80 --replicas 2 nginx:1.27
   ```

3. List tasks and scale to 4.
   ```bash
   docker service ps lab09-web
   docker service scale lab09-web=4
   docker service ls
   ```

4. Rolling update to a new tag.
   ```bash
   docker service update --image nginx:1.27-alpine lab09-web
   ```

5. Remove service and leave swarm (local lab only).
   ```bash
   docker service rm lab09-web
   docker swarm leave --force
   ```
