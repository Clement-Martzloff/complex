# Base image
FROM node:16-alpine

# Create a directory for the application and change ownership to the 'node' user
RUN mkdir /app && chown node:node /app

# Set the working directory in the container
WORKDIR /app

# Switch to the 'node' user
USER node

# Copy package.json and package-lock.json to the container
COPY --chown=node:node package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy the project files to the container
COPY --chown=node:node . .

# Change ownership of node_modules directory to the 'node' user
RUN chown -R node:node /app/node_modules
