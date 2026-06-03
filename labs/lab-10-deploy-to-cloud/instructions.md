# Lab 10 Instructions

This lab is conceptual—you trace how Project 04 maps to each cloud without requiring paid accounts.

1. Review Project 04 compose file.
   ```bash
   cat projects/project-04-microservices/docker-compose.yml
   ```

2. Open AWS ECS walkthrough.
   ```bash
   cat projects/project-08-cloud-deployment/aws/README.md
   ```
   Note: task definition = image + CPU/memory + ports; service = desired count.

3. Open Google Cloud Run walkthrough.
   ```bash
   cat projects/project-08-cloud-deployment/gcp/README.md
   ```
   Note: one container per service; scales to zero.

4. Open Azure ACI walkthrough.
   ```bash
   cat projects/project-08-cloud-deployment/azure/README.md
   ```

5. Fill the comparison table in your notes:

| Concern | Docker Compose | ECS Fargate | Cloud Run | ACI |
|---|---|---|---|---|
| Unit of deploy | service | task/service | service | container group |
| Networking | user-defined bridge | VPC + SG | managed | VNet |
| Secrets | env/files | Secrets Manager | Secret Manager | Key Vault |

6. Optional: run `docker compose config` on Project 04 to list images you would push to a registry before cloud deploy.
