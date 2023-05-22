# Production image
FROM nginx:latest

# Remove the default NGINX configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the environment-specific Nginx configuration
COPY etc/nginx/conf.d/dev.nginx.conf /etc/nginx/conf.d
