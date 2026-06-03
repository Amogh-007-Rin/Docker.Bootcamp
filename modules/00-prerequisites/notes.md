# Module 00 Notes — Prerequisites
[Previous: Repository Home](../../README.md) | [Next: Module 01 — Introduction](../01-introduction/README.md)

## Self-assessment checklist
You are ready if you can:
- Navigate directories with `cd` and list files with `ls`.
- Read file permissions and change them with `chmod`.
- Identify a running process and stop it safely.

## Linux file system basics
**Concept:** You work in a tree of directories rooted at `/`. You use paths to locate files and folders.

**Why it exists:** A consistent file system structure helps you find system files, user data, and configuration.

**How it works internally:** The kernel mounts multiple file systems into one unified tree. Each mount point maps to a device or virtual file system.

**Command/Syntax:**
```bash
pwd
```
```text
/home/you
```

**Real example:**
```bash
ls -la /etc
```
```text
drwxr-xr-x  1 root root 4096 Jan 01 09:00 .
drwxr-xr-x  1 root root 4096 Jan 01 09:00 ..
-rw-r--r--  1 root root  571 Jan 01 09:00 hosts
```

> 💡 **Pro Tip:** You use absolute paths in scripts to avoid surprises from different working directories.

## Permissions and ownership
**Concept:** Each file has an owner, a group, and permission bits for read, write, and execute.

**Why it exists:** The system protects files and limits access between users and services.

**How it works internally:** The kernel checks permission bits and user IDs before allowing access. It enforces this on every file operation.

**Command/Syntax:**
```bash
ls -l notes.txt
```
```text
-rw-r--r--  1 you you 128 Jan 01 09:00 notes.txt
```

**Real example:**
```bash
chmod 640 notes.txt
```
```text
```

> ⚠️ **Common Mistake:** You use `chmod 777` to fix access, which grants full access to everyone.

## What a process is
**Concept:** A process is a running program with its own memory and state.

**Why it exists:** The operating system runs many programs at once, so it tracks each one separately.

**How it works internally:** The kernel assigns a PID, schedules CPU time, and manages memory for each process.

**Command/Syntax:**
```bash
ps -o pid,comm -p $$
```
```text
  PID COMMAND
 1234 bash
```

**Real example:**
```bash
sleep 5 &
```
```text
[1] 5678
```

## Processes and signals
**Concept:** You control processes using signals such as terminate or kill.

**Why it exists:** Signals provide a safe way to stop or reload a process without corrupting data.

**How it works internally:** The kernel delivers a signal to a process, and the process handles it or exits.

**Command/Syntax:**
```bash
kill -TERM 5678
```
```text
```

**Real example:**
```bash
kill -9 5678
```
```text
```

## OS-level virtualization
**Concept:** OS-level virtualization isolates processes using kernel features instead of full hardware emulation.

**Why it exists:** It lets you run many isolated workloads with low overhead.

**How it works internally:** The kernel uses namespaces for isolation and cgroups for resource limits.

**Command/Syntax:**
```bash
uname -r
```
```text
6.8.0
```

**Real example:**
```bash
ls /proc/1
```
```text
attr  cgroup  cmdline  cwd  exe  fd  limits  ns  status
```

## VM vs container
**Concept:** A VM runs a full guest OS, while a container shares the host kernel.

**Why it exists:** VMs maximize isolation, while containers maximize speed and density.

**How it works internally:** A hypervisor emulates hardware for VMs. Containers isolate processes within the same kernel.

**Command/Syntax:**
```bash
systemd-detect-virt
```
```text
none
```

**Real example:**
```bash
cat /proc/1/cgroup
```
```text
0::/
```

## Why Docker exists
**Concept:** Docker packages apps with their dependencies so they run the same everywhere.

**Why it exists:** It reduces “works on my machine” problems and speeds up delivery.

**How it works internally:** Docker builds immutable images and runs them as isolated containers.

**Command/Syntax:**
```bash
env | head -n 1
```
```text
SHELL=/bin/bash
```

**Real example:**
```bash
echo "Your environment is now documented."
```
```text
Your environment is now documented.
```

## What’s Next?
You move to Module 01 and learn what Docker is and how its architecture works.

[Previous: Repository Home](../../README.md) | [Next: Module 01 — Introduction](../01-introduction/README.md)
