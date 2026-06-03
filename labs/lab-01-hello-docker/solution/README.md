# Lab 01 Solution

```bash
docker run hello-world
```
```text
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

```bash
docker run -d --name lab01-nginx -p 8080:80 nginx:1.27
```
```text
9f8e7d6c5b4a
```

```bash
docker ps
```
```text
CONTAINER ID   NAMES         STATUS
9f8e7d6c5b4a   lab01-nginx   Up 1 minute
```

```bash
docker stop lab01-nginx
```
```text
lab01-nginx
```

```bash
docker rm lab01-nginx
```
```text
lab01-nginx
```
