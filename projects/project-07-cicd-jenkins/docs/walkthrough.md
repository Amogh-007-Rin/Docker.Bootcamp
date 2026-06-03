# Project 07 Walkthrough

1. Start Jenkins:
   ```bash
   cd projects/project-07-cicd-jenkins
   docker compose up -d
   ```
2. Open http://localhost:8080 and complete setup.
3. Create a **Pipeline** job pointing at this repo’s `Jenkinsfile`.
4. Add Docker Hub credentials with ID `dockerhub`.
5. Run the pipeline.

> Mounting `docker.sock` is convenient for learning but grants Jenkins host-level Docker access—use dedicated agents in production.
