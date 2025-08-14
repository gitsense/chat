# Dockerfile Metadata
# Component: GitSense Chat Dockerfile
# Block-UUID: 8aa07bba-53f4-4e0e-9547-dfd62ccf2a5d
# Parent-UUID: N/A
# Version: 1.0.0
# Description: Dockerfile to build the GitSense Chat application image.
# Language: Dockerfile
# Created-at: 2025-08-10T17:41:36.129Z
# Authors: Gemini 2.5 Flash Thinking (v1.0.0)


# --- Build Stage ---
# Use a lightweight Node.js image for building
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
# This allows Docker to cache the npm install step if these files don't change
COPY package*.json ./

# Install all dependencies (including devDependencies needed for the build-bundle script)
RUN npm install

# Copy the rest of the application source code
# The .dockerignore file (if present) will exclude unnecessary files
COPY . .

# Build the minified bundle
RUN npm run build-bundle-min

# --- Production Stage ---
# Use a fresh, lightweight Node.js image for the final production image
FROM node:20-alpine AS production

# Set the working directory inside the container
WORKDIR /app

# Copy only production dependencies from the build stage
# This keeps the final image size minimal by excluding devDependencies
COPY --from=build /app/node_modules ./node_modules

# Copy the necessary application files from the build stage
# We explicitly list directories and files to ensure only what's needed for runtime is included
COPY --from=build /app/index.js ./
COPY --from=build /app/boards.json ./
COPY --from=build /app/devboard ./devboard
COPY --from=build /app/lib ./lib
COPY --from=build /app/public ./public
COPY --from=build /app/routes ./routes
COPY --from=build /app/views ./views
# We need to include pckages since it contains the backend code. We only build the bundle
# for the frontend code but we should look at bundling the backend code as well
COPY --from=build /app/packages ./packages

# Copy the 'data' directory. This is crucial for initial database setup
# and will be used by the Docker volume on first run.
COPY --from=build /app/data ./data

# Expose the port on which the application will listen
EXPOSE 3357

# Command to run the application using 'forever' in the foreground.
# 'forever' will be PID 1, managing the 'index.js' process and restarting it if it crashes.
# We use the full path to the 'forever' executable within node_modules/.bin
CMD ["node_modules/.bin/forever", "index.js"]
