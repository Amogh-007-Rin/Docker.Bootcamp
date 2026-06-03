# Module 08 Exercises — Docker Compose

## Exercise 1: Validate a Compose file
**Goal:** You validate Compose configuration.
**Time estimate:** 10 minutes
**Instructions:**
1. Run `docker compose config`.
   ```bash
   docker compose config
   ```
   ```text
   services:
     web:
       image: nginx
   ```
2. Review the normalized output.
**Expected output:** Compose prints a normalized YAML config.
**Hint:** Fix YAML errors before running `up`.

## Exercise 2: Start and stop services
**Goal:** You manage a stack with `up` and `down`.
**Time estimate:** 15 minutes
**Instructions:**
1. Start the stack.
   ```bash
   docker compose up -d
   ```
   ```text
   [+] Running 3/3
   ```
2. List running services.
   ```bash
   docker compose ps
   ```
   ```text
   NAME   STATUS
   web    running
   ```
3. Stop and remove resources.
   ```bash
   docker compose down
   ```
   ```text
   [+] Removing 3/3
   ```
**Expected output:** Services start and stop cleanly.
**Hint:** Use `down -v` to remove volumes if needed.

## Exercise 3: Use `.env` variables
**Goal:** You inject environment variables into Compose.
**Time estimate:** 15 minutes
**Instructions:**
1. Create a `.env` file with `APP_PORT=8080`.
   ```bash
   echo "APP_PORT=8080" > .env
   ```
   ```text
   ```
2. Run `docker compose config` and verify interpolation.
   ```bash
   docker compose config
   ```
   ```text
   environment:
     APP_PORT: "8080"
   ```
**Expected output:** The rendered config shows the variable value.
**Hint:** Compose reads `.env` from the working directory.
