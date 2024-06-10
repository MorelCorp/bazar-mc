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

COPY tsconfig.json .

# Print the contents of the current directory
RUN ls -R ./

# Build the Sell app
WORKDIR /usr/src/bazaar-mc/apps/sell
RUN npm run build

# Stage 2: Create the final image with only the necessary files
FROM node:20-alpine

WORKDIR /usr/src/bazaar-mc/apps/sell

COPY --from=build /usr/src/bazaar-mc/apps/sell/build ./build
COPY --from=build /usr/src/bazaar-mc/shared /usr/src/bazaar-mc/shared
COPY --from=build /usr/src/bazaar-mc/apps/sell/package*.json ./

EXPOSE 3000

CMD ["node", "build"]
