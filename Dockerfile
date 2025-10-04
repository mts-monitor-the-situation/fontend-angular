# Multi-stage build for Angular SPA (Angular CLI 20.x)
# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Install deps fast and reproducibly
COPY package*.json ./
RUN npm ci

# Copy source and build for production
COPY . .
RUN npm run build -- --configuration production

# Runtime stage
FROM nginx:alpine

# Remove default site and use our SPA-friendly config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Optional: install envsubst to inject runtime env vars into a JS config
RUN apk add --no-cache bash gettext

# Copy built artifacts
COPY --from=build /app/dist/fontend-angular/ /usr/share/nginx/html/

# App-level entrypoint to optionally generate /assets/app-config.js from env
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
