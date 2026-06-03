# Lab 07 Instructions

1. Build the single-stage image.
   ```bash
   cd labs/lab-07-multistage-builds
   docker build -f Dockerfile.single -t lab07:single .
   docker images lab07:single --format "{{.Repository}}:{{.Tag}} {{.Size}}"
   ```

2. Build the multi-stage image.
   ```bash
   docker build -f Dockerfile -t lab07:multi .
   docker images lab07:multi --format "{{.Repository}}:{{.Tag}} {{.Size}}"
   ```

3. Run the smaller image.
   ```bash
   docker run -d --name lab07 -p 3000:3000 lab07:multi
   curl -s http://localhost:3000/
   ```
   ```text
   lab07
   ```

4. Clean up.
   ```bash
   docker rm -f lab07
   ```

Compare sizes—the multi-stage Alpine runtime image should be noticeably smaller.
