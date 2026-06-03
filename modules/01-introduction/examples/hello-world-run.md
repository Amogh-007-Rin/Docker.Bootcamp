# Hello World Walkthrough

## Run the image
```bash
docker run hello-world
```
```text
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
2db29710123e: Pull complete
Digest: sha256:9c7a54a9a43b...b3b0
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.
```

### What each line means
- **Unable to find image...**: The image is not in your local cache.
- **Pulling from library/hello-world**: Docker downloads from Docker Hub.
- **Pull complete**: The layer downloads successfully.
- **Digest**: This is the immutable content hash for the image.
- **Status**: The pull is complete and cached locally.
- **Hello from Docker!**: The container runs and prints output, then exits.
