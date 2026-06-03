# Lab 02 Solution

```bash
docker build -t lab02-web:1.0 .
```
```text
Successfully built abcdef123456
Successfully tagged lab02-web:1.0
```

```bash
docker run -d --name lab02-web -p 8080:8080 lab02-web:1.0
```
```text
1a2b3c4d5e6f
```

```bash
docker ps
```
```text
CONTAINER ID   NAMES       STATUS
1a2b3c4d5e6f   lab02-web   Up 1 minute
```
