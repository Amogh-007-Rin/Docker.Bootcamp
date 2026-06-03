# AWS ECS (Fargate) — Project 04 Deploy

## Prerequisites
- AWS CLI v2 configured (`aws configure`)
- Images pushed to ECR or Docker Hub

## Steps

1. Push images (example for user-service):
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ACCOUNT.dkr.ecr.us-east-1.amazonaws.com
   docker tag user-service:latest ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/user-service:latest
   docker push ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/user-service:latest
   ```

2. Register task definition — edit `task-definition.json` with your account ARNs and image URIs.

3. Create ECS cluster and service:
   ```bash
   aws ecs create-cluster --cluster-name docker-mastery
   aws ecs register-task-definition --cli-input-json file://task-definition.json
   aws ecs create-service --cluster docker-mastery --service-name users --task-definition users:1 --desired-count 1 --launch-type FARGATE \
     --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=ENABLED}"
   ```

See `deploy.sh` for a scripted outline.
