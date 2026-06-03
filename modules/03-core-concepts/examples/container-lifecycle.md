# Container Lifecycle Example

## Create and run
```bash
docker run -d --name lifecycle-nginx nginx:1.27
```
```text
8f1c2d3e4f5a
```

## Stop and remove
```bash
docker stop lifecycle-nginx
```
```text
lifecycle-nginx
```

```bash
docker rm lifecycle-nginx
```
```text
lifecycle-nginx
```
