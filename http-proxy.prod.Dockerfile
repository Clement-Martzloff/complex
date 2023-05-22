# Base image
FROM node:16-alpine as builder

# Create a directory for the application and change ownership to the 'node' user
RUN mkdir /app && chown node:node /app

# Set the working directory in the container
WORKDIR /app

# Switch to the 'node' user
USER node

# Copy package.json and package-lock.json to the container
COPY --chown=node:node web-app/package*.json .

# Install production dependencies
RUN npm ci --omit=dev

# Copy the project files to the container
COPY --chown=node:node web-app/. .

# Change ownership of node_modules directory to the 'node' user
RUN chown -R node:node /app/node_modules

# Build the Next.js project
RUN npm run build

# Production image
FROM nginx:latest

# Remove the default NGINX configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the environment-specific Nginx configuration
COPY http-proxy/etc/nginx/conf.d/prod.nginx.conf /etc/nginx/conf.d

# Copy the build output from the builder stage to the NGINX server
COPY --from=builder /app/dist /usr/share/nginx/html
