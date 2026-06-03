# Debug Exit Code 137 (OOM) Example

Exit code **137** usually means the process received SIGKILL (128 + 9). In Docker, that often indicates the OOM killer or `docker kill`.

## Reproduce OOM under a low limit

```bash
docker run --name oom-demo --memory 48m alpine:3.20 \
  sh -c "dd if=/dev/zero of=/dev/shm/x bs=1M count=96" 2>&1 || true
```
```text
Killed
```

## Inspect state

```bash
docker inspect oom-demo --format '{{json .State}}' | head -c 400
```
```text
{"Status":"exited","Running":false,"Paused":false,"Restarting":false,"OOMKilled":true,"Dead":false,"Pid":0,"ExitCode":137,...
```

## Confirm with ps filter

```bash
docker ps -a --filter name=oom-demo --format '{{.Names}} {{.Status}}'
```
```text
oom-demo Exited (137) ...
```

## Compare with a healthy limit

```bash
docker run --rm --memory 256m alpine:3.20 sh -c "dd if=/dev/zero of=/dev/shm/x bs=1M count=32 && echo ok"
```
```text
ok
```

## Fix checklist

1. Raise `--memory` or Compose `mem_limit` if the workload is legitimate.
2. Fix application memory leaks if usage grows without bound.
3. Align JVM/Node heap flags with cgroup limits.
4. Use `docker stats` while load-testing before production deploy.

## Cleanup

```bash
docker rm oom-demo
```
```text
oom-demo
```
