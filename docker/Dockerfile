# Dockerfile Metadata
# Component: GitSense Chat Dockerfile
# Block-UUID: 223d3e2d-f36f-446d-86be-082a54090f99
# Parent-UUID: f7cdb166-19f6-467a-a17b-c9a9a4921c67
# Version: 1.7.0
# Description: Added GSC CLI cross-compilation stage to bundle platform-specific binaries for auto-update functionality.
# Language: Dockerfile
# Created-at: 2025-08-10T17:41:36.129Z
# Authors: Gemini 2.5 Flash Thinking (v1.0.0), GLM-4.7 (v1.1.0), GLM-4.7 (v1.1.1), GLM-4.7 (v1.2.0), Gemini 3 Flash (v1.3.0), GLM-4.7 (v1.4.0), Gemini 3 Flash (v1.5.0), GLM-4.7 (v1.6.0), GLM-4.7 (v1.7.0)


# --- GSC CLI Cross-Compilation Stage ---
# This stage compiles the gsc-cli tool for all major platforms.
FROM golang:1.21-alpine AS gsc-cli-builder

# Install git to clone the repo
RUN apk add --no-cache git

# Argument to specify the GSC CLI version/tag to build
ARG GSC_CLI_VERSION=main
ARG GSC_CLI_REPO=https://github.com/gitsense/gsc-cli.git

WORKDIR /src

# Clone the repository
RUN git clone --depth 1 --branch ${GSC_CLI_VERSION} ${GSC_CLI_REPO} .

# Compile for multiple targets
# Output filenames include OS and Arch for easy identification
RUN GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o gsc-linux-amd64 ./cmd/gsc
RUN GOOS=darwin GOARCH=amd64 go build -ldflags="-s -w" -o gsc-darwin-amd64 ./cmd/gsc
RUN GOOS=darwin GOARCH=arm64 go build -ldflags="-s -w" -o gsc-darwin-arm64 ./cmd/gsc
RUN GOOS=windows GOARCH=amd64 go build -ldflags="-s -w" -o gsc-windows-amd64.exe ./cmd/gsc


# --- Node.js Build Stage ---
FROM node:20-alpine AS build

RUN apk add --no-cache bash python3 make g++ libstdc++ \
    && rm -rf /var/cache/apk/*

SHELL ["/bin/bash", "-c"]

WORKDIR /gsc-docker-app

COPY . .
RUN rm -rf ./node_modules && npm install


# --- Production Stage ---
FROM node:20-alpine AS production

RUN apk add --no-cache \
    bash \
    git \
    ripgrep \
    python3 \
    curl \
    ca-certificates \
    jq \
    su-exec \
    zip \
    unzip \
    openssl \
    make \
    && rm -rf /var/cache/apk/*

SHELL ["/bin/bash", "-c"]

WORKDIR /gsc-docker-app

ENV GSC_HOME=/gsc-docker-app
ENV PATH="/gsc-docker-app/bin:${PATH}"

RUN echo 'export PATH="/gsc-docker-app/bin:$PATH"' >> /root/.bashrc

# Copy Node.js app
COPY --from=build /gsc-docker-app/node_modules ./node_modules
COPY --from=build /gsc-docker-app/package.json ./
COPY --from=build /gsc-docker-app/index.js ./
COPY --from=build /gsc-docker-app/boards.json ./
COPY --from=build /gsc-docker-app/bin ./bin
COPY --from=build /gsc-docker-app/db ./db
COPY --from=build /gsc-docker-app/devboard ./devboard
COPY --from=build /gsc-docker-app/lib ./lib
COPY --from=build /gsc-docker-app/public ./public
COPY --from=build /gsc-docker-app/routes ./routes
COPY --from=build /gsc-docker-app/views ./views
COPY --from=build /gsc-docker-app/packages ./packages
COPY --from=build /gsc-docker-app/base-state ./base-state

# Copy Cross-Compiled GSC CLI Binaries
# We place them in a 'dist' folder so the app can serve them or the host can pull them.
RUN mkdir -p /gsc-docker-app/bin/dist
COPY --from=gsc-cli-builder /src/gsc-linux-amd64 /gsc-docker-app/bin/dist/
COPY --from=gsc-cli-builder /src/gsc-darwin-amd64 /gsc-docker-app/bin/dist/
COPY --from=gsc-cli-builder /src/gsc-darwin-arm64 /gsc-docker-app/bin/dist/
COPY --from=gsc-cli-builder /src/gsc-windows-amd64.exe /gsc-docker-app/bin/dist/

RUN addgroup -g 1001 -S gitsense && \
    adduser -S -u 1001 -G gitsense gitsense

RUN chown -R gitsense:gitsense /gsc-docker-app

COPY --from=build /gsc-docker-app/docker/docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

VOLUME ["/gsc-docker-app/data", "/gsc-docker-app/repos"]

EXPOSE 3357

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node_modules/.bin/forever", "index.js"]
