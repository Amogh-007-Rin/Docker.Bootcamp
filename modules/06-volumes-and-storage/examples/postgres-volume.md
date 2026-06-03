# PostgreSQL Volume Persistence

## Run with a named volume
```bash
docker run -d --name pg-vol -e POSTGRES_PASSWORD=pass -v pgdata:/var/lib/postgresql/data postgres:16
```
```text
6a5b4c3d2e1f
```

## Stop and remove the container
```bash
docker rm -f pg-vol
```
```text
pg-vol
```

## Run again with the same volume
```bash
docker run -d --name pg-vol -e POSTGRES_PASSWORD=pass -v pgdata:/var/lib/postgresql/data postgres:16
```
```text
9f8e7d6c5b4a
```
