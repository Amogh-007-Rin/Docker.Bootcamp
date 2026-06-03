# Nginx Container Workflow

## Run detached with port mapping
```bash
docker run -d --name nginx-run -p 8080:80 nginx:1.27
```
```text
4f3e2d1c0b9a
```

## Exec into the container
```bash
docker exec -it nginx-run sh
```
```text
/ #
```

## View logs
```bash
docker logs nginx-run
```
```text
2026/01/01 09:00:00 [notice] 1#1: start worker processes
```

## Stop and remove
```bash
docker stop nginx-run
```
```text
nginx-run
```

```bash
docker rm nginx-run
```
```text
nginx-run
```
