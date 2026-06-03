# Module 01 Exercises — Introduction to Docker

## Exercise 1: Identify Docker components
**Goal:** You map Docker components to their purpose.
**Time estimate:** 10 minutes
**Instructions:**
1. Read the module notes section on the Docker ecosystem.
2. Write one sentence for Engine, Hub, Compose, Swarm, and Desktop.
3. Compare your sentences with the notes and refine them.
**Expected output:** You have five clear, one-sentence definitions.
**Hint:** Focus on what each tool does, not how you install it.

## Exercise 2: Client and server versions
**Goal:** You confirm Docker’s client and server versions.
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
2. Note the client and server versions.
3. Explain why the values should match in most setups.
**Expected output:** You identify both versions and explain the relationship.
**Hint:** The CLI talks to the daemon, so both versions should be compatible.

## Exercise 3: Container vs VM reasoning
**Goal:** You explain the difference between containers and VMs.
**Time estimate:** 15 minutes
**Instructions:**
1. Draw two boxes: one for containers, one for VMs.
2. Add the kernel and OS layers to each box.
3. Write two sentences that compare startup time and resource usage.
**Expected output:** You have a simple diagram and comparison summary.
**Hint:** Containers share the host kernel, VMs do not.
