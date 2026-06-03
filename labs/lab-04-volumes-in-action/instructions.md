# Lab 04 Instructions

1. Create a named volume.
   ```bash
   docker volume create lab04-pgdata
   ```
   ```text
   lab04-pgdata
   ```

2. Start PostgreSQL with the volume.
   ```bash
   docker run -d --name lab04-pg -e POSTGRES_PASSWORD=labpass -v lab04-pgdata:/var/lib/postgresql/data postgres:16
   ```
   ```text
   9f8e7d6c5b4a
   ```

3. Create a test database and table.
   ```bash
   docker exec lab04-pg psql -U postgres -c "CREATE DATABASE labdb;"
   docker exec lab04-pg psql -U postgres -d labdb -c "CREATE TABLE items (id serial PRIMARY KEY, name text); INSERT INTO items (name) VALUES ('persist-me');"
   ```
   ```text
   CREATE DATABASE
   CREATE TABLE
   INSERT 0 1
   ```

4. Remove the container but keep the volume.
   ```bash
   docker rm -f lab04-pg
   ```
   ```text
   lab04-pg
   ```

5. Start a new container with the same volume and verify data.
   ```bash
   docker run -d --name lab04-pg -e POSTGRES_PASSWORD=labpass -v lab04-pgdata:/var/lib/postgresql/data postgres:16
   docker exec lab04-pg psql -U postgres -d labdb -c "SELECT * FROM items;"
   ```
   ```text
    id |    name
   ----+------------
     1 | persist-me
   ```

6. Clean up.
   ```bash
   docker rm -f lab04-pg
   docker volume rm lab04-pgdata
   ```
   ```text
   lab04-pg
   lab04-pgdata
   ```
