# Module 20 Exercises — Interview Preparation

## Exercise 1: Blind fundamentals drill
**Goal:** You recall core definitions without reading notes.
**Time estimate:** 30 minutes
**Instructions:**
1. Open [notes.md](notes.md) Section 1 only after you finish answering.
2. Answer these five prompts aloud or in writing:
   - What problem does Docker solve compared to VMs?
   - Name the Docker client-server components.
   - What is the difference between an image and a container?
   - What happens when you `docker run` an image that is not local?
   - Why are containers considered ephemeral for application data?
3. Compare your answers to Section 1 Q&As and mark gaps.
**Expected output:** You match at least 4 of 5 answers to the notes without missing key terms (daemon, layers, registry pull).
**Hint:** Use the cheatsheet at the end of `notes.md` only for final review, not during the drill.

## Exercise 2: Command fluency under pressure
**Goal:** You tie interview topics to exact CLI commands.
**Time estimate:** 25 minutes
**Instructions:**
1. For each task below, write the command first, then run it if you have Docker available:
   - List running containers with names and ports.
   - Inspect a container’s IP on a user-defined network.
   - Remove all stopped containers and unused images safely.
   - Follow logs from a service started with Compose.
   - Limit a container to 512 MB RAM and 1 CPU.
2. Check Section 3–6 Q&As for flags you missed (`--memory`, `docker compose logs -f`, etc.).
**Expected output:** Five correct commands with flags explained in one sentence each.
**Hint:** Engine 25+ uses `docker compose`, not legacy `docker-compose` v1.

## Exercise 3: Whiteboard scenario — three-tier app
**Goal:** You design a Docker deployment for a typical web stack interview question.
**Time estimate:** 45 minutes
**Instructions:**
1. Read Section 10, Question 1 in [notes.md](notes.md).
2. On paper or a whiteboard, draw: browser → reverse proxy → API → database; label networks and volumes.
3. List five Dockerfile or Compose decisions (non-root user, health checks, secrets, etc.) and justify each in one line.
4. Explain how you would roll out a new API image with zero downtime (Swarm/Kubernetes angle acceptable).
5. Compare your design to the model answer in Section 10.
**Expected output:** A diagram plus a spoken 5-minute explanation under 6 minutes total.
**Hint:** Reference [Project 04](../../projects/project-04-microservices/README.md) if you need a concrete example.

## Exercise 4: Security lightning round
**Goal:** You articulate Docker security best practices quickly.
**Time estimate:** 20 minutes
**Instructions:**
1. Answer in 60 seconds each:
   - Why is running as root in a container still risky?
   - What is the risk of mounting `/var/run/docker.sock` into a CI container?
   - Name two ways to scan images for CVEs.
2. Cross-check with Section 7 Q&As.
3. Add one real mistake you fixed in your own projects.
**Expected output:** Three concise answers mentioning least privilege, socket ≈ host root, and scanning tools (`docker scout`, Trivy, etc.).
**Hint:** Module 11 security notes deepen any weak area.

## Exercise 5: Mock interview with a peer
**Goal:** You simulate a 30-minute Docker interview.
**Time estimate:** 30 minutes
**Instructions:**
1. Partner picks 5 questions: 2 from Sections 1–3, 1 from Section 7, 1 from Section 8, 1 from Section 10.
2. You answer without notes; partner scores clarity 1–5 per answer.
3. Swap roles or repeat with new questions.
4. Re-study sections where you scored below 4.
**Expected output:** Average score ≥ 4 on at least four answers after one retry round.
**Hint:** Record audio once—filler words and vague phrases are what interviewers remember.
