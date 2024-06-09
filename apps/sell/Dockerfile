# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /usr/src/app/sell

# Copy package files and install dependencies
COPY apps/sell/package*.json ./
RUN npm install

# Copy shared and app directories
COPY shared /usr/src/app/shared
COPY apps/sell /usr/src/app/sell

# Ensure @sveltejs/adapter-node is installed
RUN npm install @sveltejs/adapter-node

# Build the SvelteKit app
RUN npm run build

# Stage 2: Run
FROM node:20-alpine AS run

WORKDIR /usr/src/app/sell

# Copy the build output and shared directory from the build stage
COPY --from=build /usr/src/app/sell/build ./build
COPY --from=build /usr/src/app/shared /usr/src/app/shared

# Install production dependencies
COPY apps/sell/package*.json ./
RUN npm install --production

# Expose the port the app runs on
EXPOSE 5173

# Start the app
CMD ["npm", "run", "preview"]
