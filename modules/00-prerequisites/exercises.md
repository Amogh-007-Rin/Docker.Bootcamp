# Module 00 Exercises — Prerequisites

## Exercise 1: Navigate and inspect
**Goal:** You practice basic file system navigation and inspection.
**Time estimate:** 10 minutes
**Instructions:**
1. Run `pwd` to confirm your current directory.
   ```bash
   pwd
   ```
   ```text
   /home/you
   ```
2. Run `ls -la` to list files with permissions.
   ```bash
   ls -la
   ```
   ```text
   drwxr-xr-x  3 you you 4096 Jan 01 09:00 .
   ```
3. Run `ls -la /etc` to inspect system configuration files.
   ```bash
   ls -la /etc
   ```
   ```text
   -rw-r--r--  1 root root  571 Jan 01 09:00 hosts
   ```
**Expected output:** You see your current path and a detailed file listing.
**Hint:** Use absolute paths when you are unsure of your location.

## Exercise 2: Permissions practice
**Goal:** You read and change file permissions safely.
**Time estimate:** 15 minutes
**Instructions:**
1. Create a file named `perm-test.txt`.
   ```bash
   touch perm-test.txt
   ```
   ```text
   ```
2. Run `ls -l perm-test.txt` to see its permissions.
   ```bash
   ls -l perm-test.txt
   ```
   ```text
   -rw-r--r--  1 you you 0 Jan 01 09:00 perm-test.txt
   ```
3. Run `chmod 640 perm-test.txt`.
   ```bash
   chmod 640 perm-test.txt
   ```
   ```text
   ```
4. Run `ls -l perm-test.txt` again and compare.
   ```bash
   ls -l perm-test.txt
   ```
   ```text
   -rw-r-----  1 you you 0 Jan 01 09:01 perm-test.txt
   ```
**Expected output:** You see the permissions change from `-rw-r--r--` to `-rw-r-----`.
**Hint:** Use `chmod 640` to allow read for the group only.

## Exercise 3: Process control
**Goal:** You start a process and stop it with a signal.
**Time estimate:** 10 minutes
**Instructions:**
1. Run `sleep 60 &` and note the PID printed.
   ```bash
   sleep 60 &
   ```
   ```text
   [1] 5678
   ```
2. Run `ps -p <PID>` to confirm it is running.
   ```bash
   ps -p 5678
   ```
   ```text
   PID TTY          TIME CMD
  5678 pts/0    00:00:00 sleep
   ```
3. Run `kill -TERM <PID>` to stop it.
   ```bash
   kill -TERM 5678
   ```
   ```text
   ```
**Expected output:** The process no longer appears in `ps`.
**Hint:** Replace `<PID>` with the number printed by your shell.
