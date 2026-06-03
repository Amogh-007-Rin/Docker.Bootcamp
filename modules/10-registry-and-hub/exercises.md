# Module 10 Exercises — Registry and Hub

## Exercise 1: Login and logout
**Goal:** You authenticate with Docker Hub.
**Time estimate:** 10 minutes
**Instructions:**
1. Log in to Docker Hub.
   ```bash
   docker login
   ```
   ```text
   Login Succeeded
   ```
2. Log out again.
   ```bash
   docker logout
   ```
   ```text
   Removing login credentials for https://index.docker.io/v1/
   ```
**Expected output:** You see success messages for both actions.
**Hint:** Use access tokens instead of passwords.

## Exercise 2: Tag and push
**Goal:** You tag and push an image.
**Time estimate:** 20 minutes
**Instructions:**
1. Tag your image as `username/app:1.0`.
   ```bash
   docker tag app:1.0 username/app:1.0
   ```
   ```text
   ```
2. Push it to Docker Hub.
   ```bash
   docker push username/app:1.0
   ```
   ```text
   Pushed
   ```
**Expected output:** The push completes without errors.
**Hint:** Replace `username` with your Docker Hub account.

## Exercise 3: Local registry
**Goal:** You push and pull from a local registry.
**Time estimate:** 20 minutes
**Instructions:**
1. Start the registry.
   ```bash
   docker run -d -p 5000:5000 --name local-registry registry:2
   ```
   ```text
   1a2b3c4d5e6f
   ```
2. Tag and push an image.
   ```bash
   docker tag app:1.0 localhost:5000/app:1.0
   ```
   ```text
   ```
   ```bash
   docker push localhost:5000/app:1.0
   ```
   ```text
   Pushed
   ```
3. Pull it back.
   ```bash
   docker pull localhost:5000/app:1.0
   ```
   ```text
   Status: Downloaded newer image for localhost:5000/app:1.0
   ```
**Expected output:** The local registry stores and serves the image.
**Hint:** Keep the registry container running during the push and pull.
