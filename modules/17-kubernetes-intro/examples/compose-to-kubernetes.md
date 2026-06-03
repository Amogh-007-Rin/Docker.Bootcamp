# Compose to Kubernetes Concept Map

This table maps a small Compose service to the Kubernetes objects in [hello-k8s.yaml](hello-k8s.yaml).

## Compose snippet (conceptual)
```yaml
services:
  web:
    image: nginx:1.27-alpine
    ports:
      - "8080:80"
    deploy:
      replicas: 2
```

## Kubernetes equivalents

| Compose idea | Kubernetes object / field |
|---|---|
| `services.web` | `Deployment` named `hello` |
| `image: nginx:1.27-alpine` | `spec.template.spec.containers[].image` |
| `deploy.replicas: 2` | `spec.replicas: 2` |
| `ports` published to host | `Service` + `kubectl port-forward` or `NodePort` / Ingress (production) |
| Service DNS name `web` | `Service` metadata.name `hello`; Pods reach it as `hello` in-cluster |

## Apply and verify (local cluster required)
```bash
kubectl apply -f hello-k8s.yaml
kubectl get deployments,pods,svc
```
```text
NAME    READY   UP-TO-DATE   AVAILABLE
hello   2/2     2            2

NAME         TYPE        CLUSTER-IP     PORT(S)
hello        ClusterIP   10.x.x.x       80/TCP
```

```bash
kubectl port-forward service/hello 8080:80
```
```text
Forwarding from 127.0.0.1:8080 -> 80
```

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8080
```
```text
200
```

## What Compose still does better (for now)
- Fastest loop on one machine: `docker compose up`
- Simpler mental model for Module 08 labs

## What Kubernetes adds
- Schedules Pods across many nodes
- Built-in rolling updates via Deployment controller
- RBAC, Namespaces, and cloud integrations at scale
