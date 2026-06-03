# Project 08 Walkthrough

1. Build and test locally:
   ```bash
   cd projects/project-08-cloud-deployment
   docker compose up -d --build
   curl http://localhost:3000/
   curl http://localhost:3000/health
   docker compose down -v
   ```

2. Push to a container registry:
   ```bash
   docker build -t YOUR_USER/project-08:latest .
   docker push YOUR_USER/project-08:latest
   ```

3. Deploy to AWS ECS (Fargate):
   - Create an ECR repository or use Docker Hub.
   - Register a task definition (`aws/README.md` pattern):
     ```bash
     aws ecs register-task-definition --cli-input-json '{"family":"app","networkMode":"awsvpc","requiresCompatibilities":["FARGATE"],"cpu":"256","memory":"512","containerDefinitions":[{"name":"app","image":"YOUR_USER/project-08:latest","essential":true,"portMappings":[{"containerPort":3000,"protocol":"tcp"}]}]}'
     ```
   - Create a cluster and service with public subnets + security group.

4. Deploy to Google Cloud Run:
   ```bash
   gcloud auth configure-docker REGION-docker.pkg.dev
   docker tag YOUR_USER/project-08:latest REGION-docker.pkg.dev/PROJECT_ID/repo/project-08:latest
   docker push REGION-docker.pkg.dev/PROJECT_ID/repo/project-08:latest
   gcloud run deploy project-08 --image REGION-docker.pkg.dev/PROJECT_ID/repo/project-08:latest \
     --platform managed --region us-central1 --allow-unauthenticated --port 3000
   ```

5. Deploy to Azure Container Instances:
   ```bash
   az group create --name docker-mastery-rg --location eastus
   az acr create --resource-group docker-mastery-rg --name myregistry --sku Basic
   az acr login --name myregistry
   docker tag YOUR_USER/project-08:latest myregistry.azurecr.io/project-08:latest
   docker push myregistry.azurecr.io/project-08:latest
   az container create --resource-group docker-mastery-rg --name project-08 \
     --image myregistry.azurecr.io/project-08:latest \
     --dns-name-label project-08-demo --ports 3000 --cpu 1 --memory 1
   ```
