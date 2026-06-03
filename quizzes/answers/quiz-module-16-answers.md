# Quiz Module 16 — Answer Key

## Multiple Choice

| # | Answer | Explanation |
|---|---|---|
| 1 | B | `swarm init` enables Swarm mode and makes the node a manager. |
| 2 | B | A service defines desired replicas, image, networks, and update policy. |
| 3 | C | Overlay networks span nodes and connect tasks in Swarm. |
| 4 | A | `docker service scale SERVICE=N` changes replica count. |
| 5 | B | Managers replicate cluster state using Raft. |
| 6 | A | `docker stack deploy -c compose.yml STACK` deploys stack services. |
| 7 | B | Rolling updates replace tasks in batches with rollback support. |
| 8 | B | Secrets are encrypted at rest in Raft and only mounted where allowed. |
| 9 | A | Workers execute tasks; managers schedule and maintain cluster state. |
| 10 | B | Swarm fits smaller teams wanting orchestration without Kubernetes complexity. |

## Short Answer — Model Answers

**1. Service vs docker run:** `docker run` starts one container on one host. A Swarm service declares how many replicas should run, where to place them, how to update them, and keeps reconciling actual state to desired state.

**2. Odd manager quorum:** Raft requires a majority to agree on writes. An odd count (3, 5, 7) maximizes fault tolerance without split-brain—for example, 3 managers tolerate 1 failure, 5 tolerate 2.
