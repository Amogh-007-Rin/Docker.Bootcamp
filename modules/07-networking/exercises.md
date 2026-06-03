# Module 07 Exercises — Networking

## Exercise 1: Create a user-defined network
**Goal:** You create and inspect a custom bridge network.
**Time estimate:** 10 minutes
**Instructions:**
1. Create a network named `app-net`.
   ```bash
   docker network create app-net
   ```
   ```text
   app-net
   ```
2. Inspect the network.
   ```bash
   docker network inspect app-net --format '{{.Name}}'
   ```
   ```text
   app-net
   ```
**Expected output:** The network exists and reports its name.
**Hint:** User-defined networks enable DNS.

## Exercise 2: DNS-based discovery
**Goal:** You confirm containers can reach each other by name.
**Time estimate:** 20 minutes
**Instructions:**
1. Run an nginx container on the network.
   ```bash
   docker run -d --name net-web --network app-net nginx:1.27
   ```
   ```text
   9a8b7c6d5e4f
   ```
2. Ping it from another container.
   ```bash
   docker run --rm --network app-net alpine:3.20 ping -c 1 net-web
   ```
   ```text
   1 packets transmitted, 1 received, 0% packet loss
   ```
**Expected output:** The ping succeeds by container name.
**Hint:** DNS works only on user-defined networks.

## Exercise 3: Publish ports
**Goal:** You publish a container port to the host.
**Time estimate:** 15 minutes
**Instructions:**
1. Run nginx and publish port 8080.
   ```bash
   docker run -d --name pub-web -p 8080:80 nginx:1.27
   ```
   ```text
   4f3e2d1c0b9a
   ```
2. Check the published port.
   ```bash
   docker port pub-web 80
   ```
   ```text
   0.0.0.0:8080
   ```
**Expected output:** The container port maps to host port 8080.
**Hint:** `EXPOSE` alone does not publish ports.
