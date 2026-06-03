# Docker Hub Push and Pull

## Build and tag
```bash
docker build -t username/demo-app:1.0 .
```
```text
Successfully built abcdef123456
```

## Push to Docker Hub
```bash
docker push username/demo-app:1.0
```
```text
Pushed
```

## Simulate a new machine
```bash
docker rmi username/demo-app:1.0
```
```text
Untagged: username/demo-app:1.0
```

## Pull again
```bash
docker pull username/demo-app:1.0
```
```text
Status: Downloaded newer image for username/demo-app:1.0
```
