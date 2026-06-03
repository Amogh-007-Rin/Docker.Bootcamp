# Video Script: Docker in CI/CD
**Estimated Duration:** 11 minutes
**Module Reference:** Module 18

---

## [HOOK — 0:00–0:30]
"Manual `docker push` does not scale. CI builds, tests, and ships your image on every merge—repeatably."

## [INTRO — 0:30–1:00]
GitHub Actions and Jenkins pipelines that build Project 01’s API image.

## [SECTION 1 — GitHub Actions flow — 1:00–5:00]
[SHOW MERMAID from Module 18] checkout → buildx → test → push with secrets.

## [SECTION 2 — Jenkins & docker.sock — 5:00–7:30]
Pipeline stages; DinD vs socket mount tradeoffs.

## [DEMO — 7:30–9:30]
[SHOW YAML] `projects/project-06-cicd-github-actions/.github/workflows/docker.yml`

## [RECAP — 9:30–10:30]
Cache layers, pin tags, scan in CI, rotate registry tokens.

## [OUTRO]
Project 06 fork exercise; then Module 19 real-world projects.
