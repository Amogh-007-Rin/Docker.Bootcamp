# Module 15 Exercises — Docker on Windows with WSL2

## Exercise 1: Verify WSL2 and distro
**Goal:** You confirm WSL2 is your default and a Linux distro is running.
**Time estimate:** 15 minutes
**Instructions:**
1. From PowerShell, check WSL status.
   ```powershell
   wsl --status
   ```
   ```text
   Default Version: 2
   ```
2. List installed distros and versions.
   ```powershell
   wsl -l -v
   ```
   ```text
     NAME              STATE           VERSION
   * Ubuntu            Running         2
   ```
3. Inside your distro, print the kernel name.
   ```bash
   uname -r
   ```
   ```text
   ...-microsoft-standard-WSL2
   ```
**Expected output:** At least one distro shows `VERSION 2` and a Microsoft WSL2 kernel string.
**Hint:** If VERSION is 1, run `wsl --set-version <DistroName> 2` and wait for conversion to finish.

## Exercise 2: Docker from WSL and Windows
**Goal:** You run the same container command from WSL and PowerShell.
**Time estimate:** 15 minutes
**Instructions:**
1. Ensure Docker Desktop is running and WSL integration is enabled for your distro.
2. From Ubuntu WSL:
   ```bash
   docker run --rm alpine:3.20 echo "from-wsl"
   ```
   ```text
   from-wsl
   ```
3. From PowerShell:
   ```powershell
   docker run --rm alpine:3.20 echo "from-windows"
   ```
   ```text
   from-windows
   ```
4. Compare container lists (should match).
   ```bash
   docker ps -a --format '{{.Names}}' | head -n 5
   ```
**Expected output:** Both shells talk to the same daemon; recent containers appear in both `docker ps` outputs.
**Hint:** If WSL says `Cannot connect to the Docker daemon`, open Docker Desktop → Settings → WSL Integration.

## Exercise 3: Fast filesystem layout
**Goal:** You place a project on the WSL filesystem for Docker bind mounts.
**Time estimate:** 20 minutes
**Instructions:**
1. Create a directory in WSL home (not under `/mnt/c`).
   ```bash
   mkdir -p ~/docker-lab && cd ~/docker-lab
   echo "hello" > message.txt
   ```
2. Bind-mount it into a container and read the file.
   ```bash
   docker run --rm -v "$(pwd):/data" alpine:3.20 cat /data/message.txt
   ```
   ```text
   hello
   ```
3. Note the full path with:
   ```bash
   pwd
   ```
   ```text
   /home/<you>/docker-lab
   ```
4. Write one sentence in your notes: why `/mnt/c/...` is slower for this pattern.
**Expected output:** Container prints `hello`; you document that WSL-native paths avoid cross-OS mount overhead.
**Hint:** Clone future course repos under `~/` and open them with VS Code **Open Folder in WSL**.
