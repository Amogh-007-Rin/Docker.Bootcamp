# Non-Root Hardened Container Example

This walkthrough builds a minimal hardened runtime profile: non-root user, read-only root, dropped capabilities, and no-new-privileges.

## Dockerfile

See `Dockerfile.hardened-nginx` in this folder.

## Build the image

From this `examples/` directory:

```bash
docker build -t hardened-nginx:local -f Dockerfile.hardened-nginx .
```
```text
Successfully tagged hardened-nginx:local
```

## Run with runtime hardening flags

```bash
docker run -d --name hardened-nginx \
  --read-only \
  --tmpfs /var/cache/nginx:rw,noexec,nosuid,size=32m \
  --tmpfs /var/run:rw,noexec,nosuid,size=8m \
  --cap-drop ALL \
  --cap-add NET_BIND_SERVICE \
  --security-opt no-new-privileges \
  --pids-limit 100 \
  hardened-nginx:local
```
```text
f1e2d3c4b5a6
```

## Verify process user

```bash
docker exec hardened-nginx id
```
```text
uid=101(nginx) gid=101(nginx) groups=101(nginx)
```

## Verify HTTP still works

```bash
docker exec hardened-nginx wget -qO- http://127.0.0.1 | head -n 1
```
```text
<!DOCTYPE html>
```

## Inspect security options

```bash
docker inspect hardened-nginx --format '{{json .HostConfig.SecurityOpt}}'
```
```text
["no-new-privileges"]
```

## Cleanup

```bash
docker rm -f hardened-nginx
```
```text
hardened-nginx
```
