# Module 02 Exercises — Installation

## Exercise 1: Verify Engine and Compose
**Goal:** You confirm Docker Engine and Compose versions.
**Time estimate:** 10 minutes
**Instructions:**
1. Run `docker version`.
   ```bash
   docker version
   ```
   ```text
   Client: Docker Engine - Community
    Version: 25.0.2
   Server: Docker Engine - Community
    Version: 25.0.2
   ```
2. Run `docker compose version`.
   ```bash
   docker compose version
   ```
   ```text
   Docker Compose version v2.24.6
   ```
3. Record both versions in a notes file.
**Expected output:** You see valid version numbers for Engine and Compose.
**Hint:** The server version proves the daemon is running.

## Exercise 2: Non-root access (Linux)
**Goal:** You enable non-root Docker access on Linux.
**Time estimate:** 15 minutes
**Instructions:**
1. Run `sudo usermod -aG docker $USER`.
   ```bash
   sudo usermod -aG docker $USER
   ```
   ```text
   ```
2. Log out and back in.
3. Run `docker ps` without `sudo`.
   ```bash
   docker ps
   ```
   ```text
   CONTAINER ID   NAMES   STATUS
   ```
**Expected output:** The `docker ps` command runs without permission errors.
**Hint:** Group changes apply after a new login session.

## Exercise 3: WSL2 integration check (Windows)
**Goal:** You confirm WSL2 integration for Docker Desktop.
**Time estimate:** 15 minutes
**Instructions:**
1. Run `wsl -l -v` in PowerShell.
   ```powershell
   wsl -l -v
   ```
   ```text
   NAME      STATE           VERSION
   Ubuntu    Running         2
   ```
2. Ensure your distro shows version 2.
3. Run `docker version` inside your WSL2 terminal.
   ```bash
   docker version
   ```
   ```text
   Client: Docker Engine - Community
   Server: Docker Engine - Community
   ```
**Expected output:** Your distro uses WSL2 and Docker works in the WSL2 shell.
**Hint:** Update the WSL2 kernel if Docker cannot start.
