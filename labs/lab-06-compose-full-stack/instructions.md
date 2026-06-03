# Lab 06 Instructions

1. Validate the compose file.
   ```bash
   cd labs/lab-06-compose-full-stack
   docker compose config
   ```

2. Start the stack.
   ```bash
   docker compose up -d --build
   ```

3. Check service health.
   ```bash
   curl -s http://localhost:3000/health
   ```
   ```text
   {"status":"ok"}
   ```

4. Hit the counter endpoint twice.
   ```bash
   curl -s http://localhost:3000/
   curl -s http://localhost:3000/
   ```
   ```text
   {"message":"Lab 06 full stack","hits":1}
   {"message":"Lab 06 full stack","hits":2}
   ```

5. View logs for one service.
   ```bash
   docker compose logs web --tail 5
   ```

6. Tear down.
   ```bash
   docker compose down -v
   ```
