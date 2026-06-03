# Module 02 Notes — Installation
[Previous: Module 01 — Introduction](../01-introduction/README.md) | [Next: Module 03 — Core Concepts](../03-core-concepts/README.md)

## Ubuntu and Debian installation
**Concept:** You install Docker Engine with the official APT repository.

**Why it exists:** The official repository provides secure and up-to-date packages.

**How it works internally:** APT downloads signed packages and configures the Docker daemon as a system service.

**Command/Syntax:**
```bash
sudo apt-get update
```
```text
Reading package lists... Done
```

**Real example:**
```bash
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
```
```text
Setting up docker-ce (25.0.2) ...
```

**Post-install step (non-root user):**
```bash
sudo usermod -aG docker $USER
```
```text
```

> 💡 **Pro Tip:** You log out and back in after adding your user to the `docker` group.

### Ubuntu/Debian troubleshooting
- **Error:** `permission denied while trying to connect to the Docker daemon socket`
  - **Fix:** Add your user to the `docker` group and re-login.
- **Error:** `Cannot connect to the Docker daemon`
  - **Fix:** Run `sudo systemctl start docker` and enable it with `sudo systemctl enable docker`.
- **Error:** `apt-key is deprecated`
  - **Fix:** Use the official Docker keyring method from the Docker docs.

## macOS installation (Docker Desktop)
**Concept:** You install Docker Desktop, which bundles Docker Engine and a lightweight VM.

**Why it exists:** macOS cannot run Linux containers without a Linux VM.

**How it works internally:** Docker Desktop runs a Linux VM and exposes the Docker API to your Mac.

**Command/Syntax:**
```bash
brew install --cask docker
```
```text
==> Installing Cask docker
==> Linking Binary 'docker'
```

**Real example:**
```bash
open -a Docker
```
```text
```

### macOS troubleshooting
- **Error:** Docker Desktop stays on “Starting”
  - **Fix:** Restart Docker Desktop and check macOS security prompts.
- **Error:** `com.docker.backend` not responding
  - **Fix:** Quit Docker Desktop and remove `~/Library/Containers/com.docker.docker`.
- **Error:** Not enough disk space
  - **Fix:** Increase disk image size in Docker Desktop settings.

## Windows with WSL2 (Docker Desktop)
**Concept:** You install Docker Desktop and enable WSL2 as the backend.

**Why it exists:** WSL2 provides the Linux kernel Docker needs on Windows.

**How it works internally:** Docker Desktop integrates with your WSL2 distro and runs containers in it.

**Command/Syntax:**
```powershell
wsl --install
```
```text
Installing: Virtual Machine Platform
```

**Real example:**
```powershell
wsl --set-default-version 2
```
```text
For information on key differences with WSL 2 please visit https://aka.ms/wsl2
```

### Windows troubleshooting
- **Error:** `WSL 2 installation is incomplete`
  - **Fix:** Enable the Virtual Machine Platform and reboot.
- **Error:** Docker Desktop cannot start WSL2
  - **Fix:** Update your Windows kernel package and ensure virtualization is enabled in BIOS.
- **Error:** `The virtual machine could not be started because a required feature is not installed`
  - **Fix:** Enable Hyper-V and WSL features in Windows Features.

## Version verification
**Concept:** You verify that Docker Engine and Docker Compose are installed correctly.

**Why it exists:** Version checks confirm the daemon and CLI can talk to each other.

**How it works internally:** The CLI queries the daemon for version and capability data.

**Command/Syntax:**
```bash
docker version --format '{{.Server.Version}}'
```
```text
25.0.2
```

**Real example:**
```bash
docker compose version
```
```text
Docker Compose version v2.24.6
```

> ⚠️ **Common Mistake:** You install the old `docker-compose` v1 CLI. This course uses the v2 plugin.

## Docker Desktop vs Docker Engine
You learn the full comparison in Module 14. You only need to remember that Desktop bundles a VM on macOS and Windows.

## What’s Next?
You move to Module 03 and learn core Docker concepts and lifecycle.

[Previous: Module 01 — Introduction](../01-introduction/README.md) | [Next: Module 03 — Core Concepts](../03-core-concepts/README.md)
