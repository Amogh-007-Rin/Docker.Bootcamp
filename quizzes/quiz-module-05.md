# Quiz — Module 05: Containers

## Multiple Choice Questions

1. Which flag runs a container in detached mode?
   - A. `-it`
   - B. `-d`
   - C. `--rm`
   - D. `-p`

2. Which flag publishes container port 80 to host port 8080?
   - A. `-p 80:8080`
   - B. `-p 8080:80`
   - C. `--port 8080`
   - D. `--publish 80:8080:tcp`

3. Which command shows logs from a container?
   - A. `docker ps`
   - B. `docker logs`
   - C. `docker exec`
   - D. `docker inspect`

4. What is the difference between `docker stop` and `docker kill`?
   - A. `stop` sends SIGTERM first, `kill` sends SIGKILL
   - B. `stop` removes the container, `kill` restarts it
   - C. `stop` only pauses, `kill` stops
   - D. They are identical

5. Which command runs a shell inside a running container?
   - A. `docker run`
   - B. `docker exec -it`
   - C. `docker ps -a`
   - D. `docker cp`

6. Which flag removes a container when it exits?
   - A. `-d`
   - B. `--rm`
   - C. `--name`
   - D. `--restart`

7. Which command copies a file from container to host?
   - A. `docker copy`
   - B. `docker cp`
   - C. `docker logs`
   - D. `docker inspect`

8. Which command shows container metadata in JSON?
   - A. `docker info`
   - B. `docker history`
   - C. `docker inspect`
   - D. `docker images`

9. Which flag attaches a container to a network?
   - A. `--network`
   - B. `--volume`
   - C. `--restart`
   - D. `--env`

10. What does `-it` do?
    - A. It mounts a volume
    - B. It allocates a TTY for interactive commands
    - C. It restarts the container on failure
    - D. It publishes a port

## Short Answer Questions

1. Explain why `docker stop` is preferred over `docker kill` in production.
2. Describe a use case for `docker cp`.

**Answer key:** [quizzes/answers/quiz-module-05-answers.md](answers/quiz-module-05-answers.md)