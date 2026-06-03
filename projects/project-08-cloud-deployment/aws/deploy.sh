#!/usr/bin/env bash
# Outline — set REGION, CLUSTER, SUBNET, SG before running
set -euo pipefail
echo "1. Build and push images from project-04-microservices"
echo "2. aws ecs register-task-definition --cli-input-json file://task-definition.json"
echo "3. aws ecs create-service ..."
