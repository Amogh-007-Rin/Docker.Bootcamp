# Lab 09 Solution

Swarm commands used in this lab:

```powershell
# Init
docker swarm init

# Deploy stack from compose file
docker stack deploy -c docker-compose.yml lab09

# List services
docker service ls

# Scale manually
docker service scale lab09_web=5

# Rolling update (change image tag)
docker service update --image nginx:1.27-alpine --update-parallelism 1 --update-delay 10s lab09_web

# Inspect
docker service ps lab09_web

# Cleanup
docker stack rm lab09
docker swarm leave --force
```

The compose file uses `deploy.replicas: 3` and `update_config` for zero-downtime rolling updates.
