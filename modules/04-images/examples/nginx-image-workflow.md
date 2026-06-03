# Nginx Image Workflow

## Pull a specific tag
```bash
docker pull nginx:1.27
```
```text
Status: Downloaded newer image for nginx:1.27
```

## Inspect layers
```bash
docker history nginx:1.27
```
```text
IMAGE          CREATED        CREATED BY
0123456789ab   2 weeks ago    /bin/sh -c #(nop)  CMD ["nginx" "-g" "daemon off;"]
```

## Run the container
```bash
docker run -d --name nginx-img-demo -p 8080:80 nginx:1.27
```
```text
7a8b9c0d1e2f
```

## Remove the container and image
```bash
docker rm -f nginx-img-demo
```
```text
nginx-img-demo
```

```bash
docker rmi nginx:1.27
```
```text
Untagged: nginx:1.27
```
