# Lab 03 Solution

Nginx sits in front of the Flask API and proxies `/api/` requests to `http://api:5000/`. Docker DNS resolves the service name `api` automatically on the custom bridge network.
