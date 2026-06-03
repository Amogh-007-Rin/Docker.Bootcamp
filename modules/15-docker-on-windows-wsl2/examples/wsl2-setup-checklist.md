# WSL2 + Docker Desktop Setup Checklist

Work through this list once when configuring a Windows machine for this course.

## 1. Windows features and WSL2
```powershell
wsl --install
```
```text
Installing: Windows Subsystem for Linux
```

Reboot if prompted, then:
```powershell
wsl --set-default-version 2
wsl -l -v
```
```text
  NAME      STATE     VERSION
* Ubuntu    Running   2
```

## 2. Docker Desktop
- Install Docker Desktop for Windows.
- **Settings → General:** Use the WSL 2 based engine (checked).
- **Settings → Resources → WSL Integration:** Enable your Ubuntu (or primary) distro.
- Apply & Restart.

## 3. Smoke test from WSL
```bash
docker version
docker run --rm hello-world
```
```text
Hello from Docker!
```

## 4. Project location rule
| Path type | Example | Use for Docker bind mounts? |
|---|---|---|
| WSL native | `/home/you/repos/docker-practice` | Yes — preferred |
| Windows via /mnt/c | `/mnt/c/Users/you/repos/...` | Avoid for I/O-heavy work |

## 5. Recovery commands
```powershell
wsl --shutdown
```
Restart Docker Desktop from the system tray, then reopen your WSL terminal and run `docker ps`.
