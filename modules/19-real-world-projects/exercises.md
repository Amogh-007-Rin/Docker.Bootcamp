# Module 19 Exercises — Real-World Projects

## Exercise 1: Compare Dockerfiles across projects
**Goal:** You identify multi-stage, non-root, and healthcheck patterns across all 8 projects.
**Time estimate:** 30 minutes
**Instructions:**
1. Open the Dockerfile for each application project (01–05).
   ```bash
   cat projects/project-01-nodejs-app/Dockerfile
   cat projects/project-02-python-flask-app/Dockerfile
   cat projects/project-03-react-app/Dockerfile
   # Repeat for 04 and 05
   ```
   ```text
   ```
2. Create a comparison table answering:
   - How many stages does each Dockerfile have?
   - Which ones use a non-root user? Which do not?
   - Which include a `HEALTHCHECK` instruction?
   - What base image family does each use (alpine, slim, etc.)?
3. Write two sentences explaining why the React Dockerfile (03) does not need a non-root user.
**Expected output:** A completed table with 5 rows, at least two observations about patterns.
**Hint:** Refer to the pattern table in [notes.md](notes.md). Project 03's nginx base already runs as non-root by default in the official image.

## Exercise 2: Add a new endpoint to Project 01
**Goal:** You extend the Node.js API and rebuild the stack.
**Time estimate:** 25 minutes
**Instructions:**
1. Open `projects/project-01-nodejs-app/app/server.js`.
   ```bash
   cat projects/project-01-nodejs-app/app/server.js
   ```
   ```text
   ```
2. Add a new `PUT /users/:id` endpoint that updates a user's name in Postgres. (If the existing server.js is minimal, add a route that returns a mock response.)
3. Rebuild and restart the stack.
   ```bash
   docker compose up -d --build
   ```
   ```text
   [+] Building ... FINISHED
   ```
4. Test your new endpoint.
   ```bash
   curl -s -X PUT http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"name":"Updated"}'
   ```
   ```text
   {"id":1,"name":"Updated"}
   ```
**Expected output:** The stack runs with the new route responding 200.
**Hint:** You only need to rebuild the `api` service: `docker compose up -d --build api`.

## Exercise 3: Add a healthcheck to a project that lacks one
**Goal:** You retro-fit a `HEALTHCHECK` instruction to a Dockerfile that does not have one.
**Time estimate:** 20 minutes
**Instructions:**
1. Identify which application projects (01–05) are missing a `HEALTHCHECK` in their Dockerfile. (Check [notes.md](notes.md) table for a hint.)
2. Pick one (e.g., Project 02 — Flask) and add a health check.
   ```bash
   # Add to the Dockerfile: HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:5000/ || exit 1
   ```
   ```text
   ```
3. Verify the health status after rebuild.
   ```bash
   docker compose up -d --build
   docker inspect --format '{{.State.Health.Status}}' project-02-python-flask-app-api-1
   ```
   ```text
   healthy
   ```
**Expected output:** The container reports `healthy` after the startup interval.
**Hint:** If `curl` is not in the image, install it in the Dockerfile (`RUN apt-get update && apt-get install -y curl` in the runtime stage) or use `wget` / `python -c` as an alternative probe.

## Exercise 4: Trace the CI/CD pipeline
**Goal:** You connect the Project 01 Dockerfile to the GitHub Actions and Jenkins CI/CD pipelines.
**Time estimate:** 30 minutes
**Instructions:**
1. Open Project 06's workflow file.
   ```bash
   cat projects/project-06-cicd-github-actions/.github/workflows/docker.yml
   ```
   ```text
   ```
2. Open Project 07's Jenkinsfile.
   ```bash
   cat projects/project-07-cicd-jenkins/Jenkinsfile
   ```
   ```text
   ```
3. Trace the image from `git push` through build to registry:
   - What Dockerfile stages does each pipeline build?
   - When does each pipeline push the image?
   - What tag does each pipeline assign?
4. Write the answer to this question: "If the test stage in the Dockerfile were named `unit-test` instead of `test`, what change would each pipeline need?"
**Expected output:** A written trace showing the full pipeline path and the answer to the rename question.
**Hint:** Both pipelines reference `--target test` in their build commands. Rename the stage in the Dockerfile and the target flag in both CI configs.

[Previous: Module 18 Exercises](../18-cicd-pipelines/exercises.md) | [Next: Module 20 Exercises](../20-interview-prep/exercises.md)
