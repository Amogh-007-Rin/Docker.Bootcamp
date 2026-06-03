# Quiz — Module 16: Docker Swarm

## Multiple Choice Questions

1. What does `docker swarm init` do?
   - A. Pulls an image from Hub
   - B. Turns the current node into a Swarm manager
   - C. Creates a Kubernetes cluster
   - D. Installs Docker Desktop

2. In Swarm, a **service** is:
   - A. A single container only
   - B. The desired state for running tasks across the cluster
   - C. A volume driver
   - D. A Compose plugin

3. Which network driver connects services across Swarm nodes?
   - A. bridge
   - B. host
   - C. overlay
   - D. none

4. How do you scale a Swarm service to 5 replicas?
   - A. `docker service scale web=5`
   - B. `docker run -d --scale 5`
   - C. `docker compose up -5`
   - D. `docker swarm scale`

5. What stores Swarm cluster state?
   - A. dockerd logs only
   - B. Raft consensus on managers (embedded store)
   - C. Redis by default
   - D. The default bridge network

6. Which command deploys a Compose file to Swarm?
   - A. `docker stack deploy`
   - B. `docker compose swarm`
   - C. `docker service compose`
   - D. `kubectl apply`

7. Rolling updates allow you to:
   - A. Delete all volumes automatically
   - B. Replace tasks gradually with a new image version
   - C. Disable DNS
   - D. Run only one manager forever

8. Swarm **secrets** are best for:
   - A. Public documentation
   - B. Sensitive data distributed encrypted to tasks that need them
   - C. Replacing Dockerfiles
   - D. Host kernel modules

9. A worker node:
   - A. Runs tasks scheduled by managers
   - B. Cannot join a swarm
   - C. Must always be a manager
   - D. Hosts only overlay networks locally

10. When is Swarm often chosen over full Kubernetes?
    - A. When you need the largest cloud-native ecosystem at hyperscale
    - B. When you want simpler multi-host orchestration on existing Docker skills
    - C. When you have no containers
    - D. When you only use Windows 95

## Short Answer Questions

1. Explain the difference between a Swarm service and a standalone `docker run` container.
2. Why do Swarm clusters need an odd number of managers for quorum?

**Answer key:** [quizzes/answers/quiz-module-16-answers.md](answers/quiz-module-16-answers.md)
