# Stage 1: Build the application
FROM node:20-alpine AS build

WORKDIR /usr/src/bazaar-mc

# Copy shared package.json and install dependencies
COPY shared/package*.json ./shared/
RUN npm install --prefix ./shared

# Copy sell package.json and install dependencies
COPY apps/sell/package*.json ./apps/sell/
RUN npm install --prefix ./apps/sell

# Copy shared and sell source code
COPY shared /usr/src/bazaar-mc/shared
COPY apps/sell /usr/src/bazaar-mc/apps/sell

COPY tsconfig.json ./

# Update tsconfig.json paths for Docker environment
RUN sed -i 's#"\.\./tsconfig.json"#"/usr/src/bazaar-mc/tsconfig.json"#g' /usr/src/bazaar-mc/apps/sell/tsconfig.json

# Debugging: List directories and files to verify paths
RUN ls -R /usr/src/bazaar-mc/shared
RUN ls -R /usr/src/bazaar-mc/apps/sell

# Build the Sell app
WORKDIR /usr/src/bazaar-mc/apps/sell
RUN npm run build

# Stage 2: Create the final image with only the necessary files
FROM node:20-alpine

WORKDIR /usr/src/bazaar-mc/apps/sell

# Copy the built application and node_modules from the build stage
COPY --from=build /usr/src/bazaar-mc/apps/sell/build ./build
COPY --from=build /usr/src/bazaar-mc/apps/sell/node_modules ./node_modules
COPY --from=build /usr/src/bazaar-mc/shared /usr/src/bazaar-mc/shared
COPY --from=build /usr/src/bazaar-mc/apps/sell/package*.json ./

EXPOSE 3000

CMD ["node", "build"]
