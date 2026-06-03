# Single-Node Swarm Demo

Run this on one machine with Docker Engine or Docker Desktop. It deploys a replicated nginx service, scales it, updates the image, and rolls back.

## 1. Initialize Swarm (skip if already in swarm)
```bash
docker swarm init
```
```text
Swarm initialized: current node (...) is now a manager
```

If you see "already part of a swarm", continue to step 2.

## 2. Deploy the stack
From this module's `examples` directory:
```bash
docker stack deploy -c swarm-stack.yaml webstack
```
```text
Creating network webstack_webnet
Creating service webstack_web
```

## 3. Verify services and tasks
```bash
docker stack services webstack
```
```text
ID        NAME           MODE      REPLICAS   IMAGE               PORTS
...       webstack_web   replicated  3/3      nginx:1.27-alpine   *:8080->80/tcp
```

```bash
docker service ps webstack_web
```
```text
ID        NAME              IMAGE               NODE   DESIRED STATE   CURRENT STATE
...       webstack_web.1    nginx:1.27-alpine   ...    Running         Running
...       webstack_web.2    nginx:1.27-alpine   ...    Running         Running
...       webstack_web.3    nginx:1.27-alpine   ...    Running         Running
```

## 4. Test HTTP
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8080
```
```text
200
```

## 5. Scale to 5 replicas
```bash
docker service scale webstack_web=5
```
```text
webstack_web scaled to 5
overall progress: 5 out of 5 tasks
```

```bash
docker service ps webstack_web --filter desired-state=running
```
```text
(replicas 1–5 listed as Running)
```

## 6. Rolling update to a new tag
```bash
docker service update --image nginx:1.28-alpine webstack_web
```
```text
webstack_web
overall progress: 5 out of 5 tasks
```

## 7. Rollback if the new tag misbehaves
```bash
docker service rollback webstack_web
```
```text
webstack_web
rollback: rollback completed
```

## 8. Clean up
```bash
docker stack rm webstack
```
```text
Removing service webstack_web
Removing network webstack_webnet
```

Optional — leave swarm entirely:
```bash
docker swarm leave --force
```
```text
Node left the swarm.
```
