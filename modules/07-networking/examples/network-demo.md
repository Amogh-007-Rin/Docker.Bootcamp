# User-Defined Network Demo

## Create the network
```bash
docker network create app-net
```
```text
app-net
```

## Run two containers on the network
```bash
docker run -d --name net-web --network app-net nginx:1.27
```
```text
9a8b7c6d5e4f
```

```bash
docker run --rm --network app-net alpine:3.20 ping -c 1 net-web
```
```text
1 packets transmitted, 1 received, 0% packet loss
```
