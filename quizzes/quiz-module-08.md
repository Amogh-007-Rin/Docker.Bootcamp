# Quiz — Module 08: Docker Compose

## Multiple Choice Questions

1. Which command starts a Compose app?
   - A. `docker compose up`
   - B. `docker compose start`
   - C. `docker run compose`
   - D. `compose up`

2. What is the primary purpose of Compose?
   - A. Build images only
   - B. Define multi-container apps in YAML
   - C. Replace Docker Engine
   - D. Manage Kubernetes clusters

3. Which key defines service dependencies?
   - A. `links`
   - B. `depends_on`
   - C. `requires`
   - D. `needs`

4. Which command validates a Compose file?
   - A. `docker compose check`
   - B. `docker compose config`
   - C. `docker compose validate`
   - D. `docker compose lint`

5. Which file provides default environment variables?
   - A. `.env`
   - B. `.compose`
   - C. `.docker`
   - D. `env.yaml`

6. Which key publishes ports?
   - A. `ports`
   - B. `expose`
   - C. `publish`
   - D. `forward`

7. Which command shows running services?
   - A. `docker compose ls`
   - B. `docker compose ps`
   - C. `docker compose services`
   - D. `docker compose status`

8. What does the `build` key do?
   - A. It pulls an image
   - B. It creates a network
   - C. It builds an image from a context
   - D. It runs a container

9. Which command scales services?
   - A. `docker compose scale`
   - B. `docker compose up --scale`
   - C. `docker compose resize`
   - D. `docker scale`

10. What is a Compose profile used for?
    - A. Encrypting secrets
    - B. Enabling optional services
    - C. Building images faster
    - D. Publishing ports

## Short Answer Questions

1. Explain how `docker compose down` differs from `docker compose stop`.
2. Describe when you would use multiple Compose files with `-f`.

**Answer key:** [quizzes/answers/quiz-module-08-answers.md](answers/quiz-module-08-answers.md)