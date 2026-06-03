# Quiz — Module 03: Core Concepts

## Multiple Choice Questions

1. What is the best definition of a Docker image?
   - A. A running instance of an application
   - B. A template for creating containers
   - C. A network configuration file
   - D. A Docker daemon process

2. What layer is added when a container starts?
   - A. A read-only base layer
   - B. A writable container layer
   - C. A kernel layer
   - D. A network layer

3. Which command lists local images?
   - A. `docker ps`
   - B. `docker images`
   - C. `docker run`
   - D. `docker logs`

4. Which storage driver concept allows multiple layers to appear as one file system?
   - A. Overlay/union file system
   - B. Host-only mount
   - C. Block device mapping
   - D. Swap partition

5. Which state means a container has stopped but still exists?
   - A. Running
   - B. Paused
   - C. Exited
   - D. Dead

6. What does `docker pull` do?
   - A. It removes a container
   - B. It downloads an image from a registry
   - C. It starts a container
   - D. It builds an image from a Dockerfile

7. Which command shows a container’s current state?
   - A. `docker ps -a`
   - B. `docker history`
   - C. `docker inspect` (image)
   - D. `docker login`

8. What is Docker Hub?
   - A. A local image cache
   - B. A container runtime
   - C. A public image registry
   - D. A volume driver

9. Which tag is safest for repeatable builds?
   - A. `latest`
   - B. A semantic version tag
   - C. `dev`
   - D. `nightly`

10. What is the key difference between an image and a container?
    - A. Images are running, containers are stopped
    - B. Images are immutable templates, containers are running instances
    - C. Images are stored in RAM, containers are stored on disk
    - D. Images require a network, containers do not

## Short Answer Questions

1. Explain the “template vs instance” analogy for images and containers in two sentences.
2. Describe how container states change when you run, pause, and stop a container.

**Answer key:** [quizzes/answers/quiz-module-03-answers.md](answers/quiz-module-03-answers.md)