# Module 17 Exercises — Kubernetes Introduction

> **Prerequisite:** A local cluster (Minikube, kind, or Docker Desktop Kubernetes) and `kubectl` installed.

## Exercise 1: Cluster smoke test
**Goal:** You confirm `kubectl` talks to a healthy cluster.
**Time estimate:** 15 minutes
**Instructions:**
1. Show cluster info.
   ```bash
   kubectl cluster-info
   ```
   ```text
   Kubernetes control plane is running at https://...
   ```
2. List nodes.
   ```bash
   kubectl get nodes
   ```
   ```text
   NAME       STATUS   ROLES           AGE   VERSION
   minikube   Ready    control-plane   ...   v1.30.x
   ```
3. List system Pods in `kube-system`.
   ```bash
   kubectl get pods -n kube-system
   ```
   ```text
   NAME                                    READY   STATUS
   coredns-...                             1/1     Running
   ```
**Expected output:** At least one node in `Ready` state; core system Pods running.
**Hint:** If context is wrong, run `kubectl config get-contexts` and select your local cluster.

## Exercise 2: Deploy hello manifest
**Goal:** You apply, inspect, and delete the sample Deployment and Service.
**Time estimate:** 25 minutes
**Instructions:**
1. Apply the manifest from this module's `examples` folder.
   ```bash
   kubectl apply -f hello-k8s.yaml
   ```
   ```text
   deployment.apps/hello created
   service/hello created
   ```
2. Wait until Pods are ready.
   ```bash
   kubectl get pods -l app=hello
   ```
   ```text
   NAME                    READY   STATUS    RESTARTS   AGE
   hello-...               1/1     Running   0          30s
   ```
3. Port-forward and curl.
   ```bash
   kubectl port-forward service/hello 8080:80
   ```
   In another terminal:
   ```bash
   curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8080
   ```
   ```text
   200
   ```
4. Delete resources.
   ```bash
   kubectl delete -f hello-k8s.yaml
   ```
   ```text
   deployment.apps "hello" deleted
   service "hello" deleted
   ```
**Expected output:** Two ready Pods while deployed; HTTP 200 via port-forward; clean delete with no hello Pods left.
**Hint:** Use `kubectl describe deployment hello` if Pods stay Pending.

## Exercise 3: Concept mapping worksheet
**Goal:** You articulate how Docker skills transfer to Kubernetes without running new commands.
**Time estimate:** 15 minutes
**Instructions:**
1. Open [examples/compose-to-kubernetes.md](examples/compose-to-kubernetes.md).
2. For each row in the mapping table, write one sentence in your own notes explaining the analogy (Pod, Deployment, Service, image pull).
3. Answer briefly: **Why does Kubernetes wrap containers in Pods instead of scheduling containers directly?**
4. Name two topics you would study next on kubernetes.io (e.g. Ingress, PersistentVolumes).
**Expected output:** A short written mapping (half page is enough) plus two external topics for continued learning.
**Hint:** Pods share network namespace—sidecar pattern is the usual teaching example.
