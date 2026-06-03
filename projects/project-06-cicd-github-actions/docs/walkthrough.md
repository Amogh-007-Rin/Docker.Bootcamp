# Project 06 Walkthrough

1. Fork this repository and enable GitHub Actions.
2. Add secrets: `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN` (access token, not password).
3. Push to `main` and watch the **Docker CI** workflow.
4. Verify the image on Docker Hub: `docker pull YOUR_USER/project01:latest`.

The workflow builds Project 01’s context without pushing on pull requests.
