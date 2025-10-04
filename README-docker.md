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

## Runtime environment variables (optional)
If you want runtime-configurable values without rebuilding:
1) Make your app load `/assets/app-config.js` at startup (e.g., before bootstrapping).
2) Add `/src/assets/app-config.js.template` with placeholders like:
```js
window.APP_CONFIG = {
  API_URL: "__API_URL__",
  SENTRY_DSN: "__SENTRY_DSN__"
};
```
3) At `docker run`, pass envs, and the entrypoint will generate `/assets/app-config.js`:
```bash
docker run -e API_URL=https://api.example.com -e SENTRY_DSN=abc -p 8080:80 fontend-angular:prod
```

## Dev in a container (hot reload)
```bash
docker compose -f docker-compose.dev.yml up
```
