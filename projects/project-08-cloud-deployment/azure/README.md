# Azure Container Instances — Project 04 Deploy

## Prerequisites
- Azure CLI (`az login`)
- Resource group created

## Deploy user-service

```bash
az group create --name docker-mastery-rg --location eastus
az acr create --resource-group docker-mastery-rg --name myregistry --sku Basic
az acr login --name myregistry
docker tag user-service:latest myregistry.azurecr.io/user-service:latest
docker push myregistry.azurecr.io/user-service:latest

az container create \
  --resource-group docker-mastery-rg \
  --name user-service \
  --image myregistry.azurecr.io/user-service:latest \
  --dns-name-label users-demo-unique \
  --ports 3001 \
  --cpu 1 --memory 1
```

Use Azure Application Gateway for multi-service routing.

See `deploy.sh`.
