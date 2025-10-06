# Dockerizing this Angular app 

Detected project name: **fontend-angular**  
Detected prod build output: **dist/fontend-angular**

## Build a production image
```bash
docker build -t fontend-angular:prod -f Dockerfile .
```

## Run it
```bash
docker run --rm -p 8080:80 fontend-angular:prod
# Open http://localhost:8080
```

## Dev in a container (hot reload)
```bash
docker compose -f docker-compose.dev.yml up
```
