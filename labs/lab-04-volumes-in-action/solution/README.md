# Lab 04 Solution

Data lives in `lab04-pgdata`, not in the container layer. Recreating the container reattaches the same volume and preserves the database files.
