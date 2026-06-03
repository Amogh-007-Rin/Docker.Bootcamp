# Lab 04 Solution

Data lives in `pgdata` (a named volume), not in the container layer. Recreating the container reattaches the same volume and preserves the database files.
