# Practical Scenario — "Works on My Machine"

## The problem

**Situation:** A developer, Priya, builds a Python web app on her macOS laptop. She uses Homebrew Python 3.12, SQLite (bundled with macOS), and runs the app with `python app.py`. Everything works. She commits the code and the team's Linux CI server fails with:

```
ModuleNotFoundError: No module named 'pydantic'
sqlite3.OperationalError: no such table: users
```

**Root cause:** Her laptop has `pydantic` installed globally from a previous project, but `requirements.txt` does not list it. The CI runner starts from a clean Ubuntu image with only what the project declares. She also hardcoded the SQLite database path to `/Users/priya/dev/app/data.db`—which does not exist on Linux.

## How Docker fixes it

### Step 1 — Write a Dockerfile that declares every dependency

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

Now `pydantic` must be in `requirements.txt` or the build fails immediately. The image includes exactly what the project needs—nothing more, nothing less.

### Step 2 — Use environment variables for configuration

```python
import os
import sqlite3

DB_PATH = os.environ.get("DB_PATH", "/app/data.db")
conn = sqlite3.connect(DB_PATH)
```

The Dockerfile no longer hardcodes macOS-specific paths. The Compose file or runtime `-e` flag sets `DB_PATH` per environment.

### Step 3 — Run with Docker (same everywhere)

```bash
docker build -t myapp .
docker run -d -p 5000:5000 -e DB_PATH=/data/data.db -v app-data:/data myapp
```

```text
f6a8b2c...
```

Priya runs this on macOS. The CI runner runs this on Linux. The production server runs this on Ubuntu. All three use the same image digest, the same Python version, the same library versions, and the same filesystem layout.

## The "works on my machine" checklist

When a teammate says the app works on their machine but not on yours, check:

1. **Dockerfile exists?** If not, containerization is step zero.
2. **Base image version?** `python:3.12-slim` on CI vs Homebrew 3.13 on laptop? Pin it.
3. **`requirements.txt` complete?** Run `pip freeze > requirements.txt` after testing, then prune unused packages.
4. **Hardcoded paths?** Replace `/Users/...` or `C:\...` with env vars or relative paths.
5. **Platform-specific code?** macOS `.dylib` vs Linux `.so` vs Windows `.dll` in native extensions.
6. **Environment variables?** Missing `DATABASE_URL` or `API_KEY` in CI? Set defaults or fail fast.

## Interview answer framework

If an interviewer asks "Tell me about a time Docker fixed a 'works on my machine' problem," use this structure:

1. **Situation:** Developer's app runs locally but fails on CI/production.
2. **Root cause:** Missing dependency in `requirements.txt` + hardcoded OS-specific path.
3. **Docker solution:** Multi-stage Dockerfile with pinned base image, complete `requirements.txt`, env vars for configuration, and Compose for the full stack.
4. **Result:** The app now runs identically on macOS, Linux CI, and Linux production. Onboarding time drops from "debug your environment" to `docker compose up`.
5. **Lesson learned:** Always run `pip freeze > requirements.txt` from a clean environment (or use the Dockerfile itself as the source of truth). Never hardcode filesystem paths.

> 💡 **Pro Tip:** In an interview, mention a specific command you ran. For example: "I ran `docker build --no-cache` to reproduce the CI failure locally, then added the missing package to `requirements.txt` and rebuilt."

## Real example from this repository

Project 01 — Node.js App uses this exact pattern:

```dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY app/package.json ./
RUN npm install --omit=dev

FROM node:22-alpine AS runtime
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY app/server.js ./
USER app
EXPOSE 3000
CMD ["node", "server.js"]
```

- **All dependencies declared** in `package.json` → `npm install` installs exactly what the app needs.
- **No hardcoded host paths** → `server.js` uses relative paths.
- **Same image everywhere** → dev laptop, CI runner, and production container all run the same digest.
