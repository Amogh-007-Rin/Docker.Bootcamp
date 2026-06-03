# Linux Basics Walkthrough

## List a directory
```bash
ls -la
```
```text
drwxr-xr-x  3 you you 4096 Jan 01 09:00 .
drwxr-xr-x  5 you you 4096 Jan 01 09:00 ..
-rw-r--r--  1 you you   18 Jan 01 09:00 hello.txt
```

## Check running processes
```bash
ps -o pid,comm --sort=pid | head -n 3
```
```text
  PID COMMAND
    1 systemd
  234 bash
```
