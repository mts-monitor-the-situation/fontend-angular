# Multi-stage build for Angular SPA (Angular CLI 20.x)

# --- Build stage ---
FROM node:20-alpine AS build
WORKDIR /app

# Install deps fast and reproducibly
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy source and build for production (uses environment.prod.ts via fileReplacements)
COPY . .
RUN npm run build -- --configuration production

# --- Runtime stage ---
FROM nginx:alpine

# Replace default server with SPA-friendly config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Static site
COPY --from=build /app/dist/fontend-angular/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
