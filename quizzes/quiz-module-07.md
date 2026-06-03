# Quiz — Module 07: Networking

## Multiple Choice Questions

1. Which network driver is the default for standalone containers?
   - A. overlay
   - B. bridge
   - C. host
   - D. macvlan

2. What is a key benefit of a user-defined bridge network?
   - A. It disables DNS
   - B. It provides DNS-based service discovery
   - C. It requires no NAT
   - D. It only works on Windows

3. Which command creates a network?
   - A. `docker network create`
   - B. `docker network add`
   - C. `docker net create`
   - D. `docker create network`

4. What does `-p 8080:80` do?
   - A. It exposes port 8080 inside the container
   - B. It publishes container port 80 to host port 8080
   - C. It maps host port 80 to container port 8080
   - D. It creates a new network

5. Which driver is used for multi-host Swarm networking?
   - A. none
   - B. bridge
   - C. overlay
   - D. host

6. What does `--network-alias` do?
   - A. It disables DNS
   - B. It adds an alternate DNS name
   - C. It publishes ports
   - D. It changes the image tag

7. Which command lists networks?
   - A. `docker ps`
   - B. `docker network ls`
   - C. `docker network inspect`
   - D. `docker images`

8. What is the main limitation of the default bridge network?
   - A. It has no DNS-based service discovery
   - B. It cannot publish ports
   - C. It only works for Linux containers
   - D. It requires Swarm mode

9. Which command attaches a running container to a network?
   - A. `docker network attach`
   - B. `docker network connect`
   - C. `docker connect`
   - D. `docker network join`

10. What does `EXPOSE` do?
    - A. It publishes a port to the host
    - B. It documents a port inside the image
    - C. It creates a firewall rule
    - D. It maps ports automatically

## Short Answer Questions

1. Explain the difference between exposing and publishing ports.
2. Describe why DNS-based service discovery matters for containers.

**Answer key:** [quizzes/answers/quiz-module-07-answers.md](answers/quiz-module-07-answers.md)