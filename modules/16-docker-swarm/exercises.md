# Module 16 Exercises — Docker Swarm

## Exercise 1: Init swarm and create a service
**Goal:** You form a one-node swarm and run a replicated service.
**Time estimate:** 20 minutes
**Instructions:**
1. Initialize Swarm (if not already active).
   ```bash
   docker swarm init
   ```
   ```text
   Swarm initialized: current node (...) is now a manager
   ```
2. Create a service with three replicas.
   ```bash
   docker service create --name swarm-nginx --publish 8088:80 --replicas 3 nginx:1.27-alpine
   ```
   ```text
   overall progress: 3 out of 3 tasks
   ```
3. List services and tasks.
   ```bash
   docker service ls
   docker service ps swarm-nginx
   ```
   ```text
   REPLICAS   3/3
   ```
**Expected output:** `docker service ls` shows `3/3` replicas; `curl http://localhost:8088` returns nginx HTML (status 200).
**Hint:** If port 8088 is busy, pick another host port and adjust `--publish`.

## Exercise 2: Scale and update
**Goal:** You scale a service and perform a rolling image update.
**Time estimate:** 25 minutes
**Instructions:**
1. Scale the service from Exercise 1 to 5 replicas.
   ```bash
   docker service scale swarm-nginx=5
   ```
   ```text
   overall progress: 5 out of 5 tasks
   ```
2. Update the image tag.
   ```bash
   docker service update --image nginx:1.28-alpine swarm-nginx
   ```
   ```text
   overall progress: 5 out of 5 tasks
   ```
3. Confirm tasks use the new image.
   ```bash
   docker service ps swarm-nginx --no-trunc | head -n 6
   ```
**Expected output:** Five running tasks; image column shows `nginx:1.28-alpine` after update completes.
**Hint:** Watch progress with `docker service ps swarm-nginx` until all tasks are `Running`.

## Exercise 3: Deploy and remove a stack
**Goal:** You deploy the module stack file and tear it down cleanly.
**Time estimate:** 25 minutes
**Instructions:**
1. From `modules/16-docker-swarm/examples`, deploy the stack.
   ```bash
   docker stack deploy -c swarm-stack.yaml webstack
   ```
   ```text
   Creating service webstack_web
   ```
2. Verify three replicas and HTTP response.
   ```bash
   docker stack services webstack
   curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8080
   ```
   ```text
   3/3
   200
   ```
3. Remove the stack.
   ```bash
   docker stack rm webstack
   ```
   ```text
   Removing service webstack_web
   ```
4. Remove the Exercise 1 service if you no longer need it.
   ```bash
   docker service rm swarm-nginx
   ```
**Expected output:** Stack services show `0/0` or disappear after `stack rm`; port 8080 is free.
**Hint:** You cannot deploy two stacks that publish the same host port—remove Exercise 1 service or change ports in the YAML.
