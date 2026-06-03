# Project 01 Walkthrough

1. Start the stack:
   ```bash
   cd projects/project-01-nodejs-app
   docker compose up -d --build
   ```

2. Create a user:
   ```bash
   curl -s -X POST http://localhost:3000/users -H "Content-Type: application/json" -d "{\"name\":\"Ada\"}"
   ```

3. List users:
   ```bash
   curl -s http://localhost:3000/users
   ```

4. Inspect health:
   ```bash
   curl -s http://localhost:3000/health
   ```

5. Tear down:
   ```bash
   docker compose down -v
   ```

**Extend:** Add migrations, secrets via env file, and push the image to Docker Hub (Module 10).
