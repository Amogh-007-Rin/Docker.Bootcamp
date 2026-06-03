# Lab 07 Solution

Multi-stage vs single-stage: the single-stage Dockerfile (`Dockerfile.single`) uses `node:22` and leaves npm cache, dev dependencies, and OS toolchain in the image (~1 GB). The multi-stage `Dockerfile` separates dependency install (full `node:22`) from the runtime stage (lean `node:22-alpine`, only `--omit=dev` packages) — final image ~150 MB.

Build and compare:

```powershell
docker build -t lab07-multi -f Dockerfile .
docker build -t lab07-single -f Dockerfile.single .
docker images lab07-*
```
