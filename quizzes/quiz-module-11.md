# Quiz — Module 11: Docker Security

## Multiple Choice Questions

1. Why should containers run as non-root?
   - A. It improves image pull speed
   - B. It limits damage if the container is compromised
   - C. It disables networking
   - D. It is required for Windows containers only

2. What does `--read-only` do?
   - A. Makes the image immutable in the registry
   - B. Prevents writes to the container's root filesystem
   - C. Blocks all network traffic
   - D. Encrypts volume data

3. Which flag blocks privilege escalation?
   - A. `--privileged`
   - B. `--security-opt no-new-privileges`
   - C. `--cap-add ALL`
   - D. `--user root`

4. What is the safest default for Linux capabilities in production?
   - A. `--cap-add ALL`
   - B. `--privileged`
   - C. Drop all, add only what you need
   - D. Never use capabilities

5. Where should production secrets live?
   - A. In the Dockerfile as ENV
   - B. Committed in docker-compose.yml
   - C. In a secret store or Swarm/Kubernetes secrets
   - D. In container layer history

6. What does Trivy primarily scan for?
   - A. Network latency
   - B. Known vulnerabilities in images
   - C. DNS misconfiguration
   - D. Compose syntax errors

7. Why is mounting `/var/run/docker.sock` risky?
   - A. It slows disk I/O
   - B. It can grant host-level Docker control to the container
   - C. It disables BuildKit
   - D. It only works on macOS

8. What does `USER` in a Dockerfile enforce?
   - A. The default UID/GID processes run as
   - B. The host username
   - C. TLS for the registry
   - D. Swarm manager election

9. Resource limits help security because they:
   - A. Encrypt traffic
   - B. Reduce denial-of-service impact from runaway processes
   - C. Replace firewalls
   - D. Disable OOM killer

10. Image signing (Cosign/Notation) addresses:
    - A. CPU scheduling
    - B. Supply chain trust and tampering detection
    - C. Volume backup
    - D. Bridge network DNS

## Short Answer Questions

1. Name two Dockerfile practices that harden a production image.
2. Explain why environment variables are a poor place for database passwords in production.

**Answer key:** [quizzes/answers/quiz-module-11-answers.md](answers/quiz-module-11-answers.md)
