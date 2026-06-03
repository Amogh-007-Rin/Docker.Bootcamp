# Desktop vs Engine Verification Walkthrough

Use this script on your machine to document which runtime you use.

## Version and context
```bash
docker version --format 'Client: {{.Client.Version}} | Server: {{.Server.Version}}'
```
```text
Client: 27.x.x | Server: 27.x.x
```

```bash
docker context show
```
```text
desktop-linux
```

## Server identity
```bash
docker info --format 'Operating System: {{.OperatingSystem}}
Cgroup Driver: {{.CgroupDriver}}
Storage Driver: {{.Driver}}'
```
```text
Operating System: Docker Desktop
Cgroup Driver: cgroupfs
Storage Driver: overlayfs
```

On native Linux Engine you typically see your distro name instead of `Docker Desktop`.

## Quick classification

| `Operating System` contains | You are likely using |
|---|---|
| `Docker Desktop` | Docker Desktop (Mac/Windows) |
| `Ubuntu`, `Debian`, `Fedora`, etc. | Docker Engine on Linux |
