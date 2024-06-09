# Use an official Node.js image as a base
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY apps/sell/package*.json ./sell/
COPY shared/package*.json ./shared/

# Install dependencies for the Sell app
WORKDIR /usr/src/app/sell
RUN npm install

# Copy the shared directory
COPY shared /usr/src/app/shared

# Copy the Sell app's source code
COPY apps/sell /usr/src/app/sell

# Ensure paths in the shared tsconfig.json are correct
RUN sed -i 's#"extends": "../tsconfig.json"#"extends": "/usr/src/app/tsconfig.json"#' /usr/src/app/shared/tsconfig.json

# Build the Sell app
RUN npm run build

# Stage 2: Create the final image with only the necessary files
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy the build output and necessary files from the build stage
COPY --from=build /usr/src/app/sell/build ./build
COPY --from=build /usr/src/app/shared /usr/src/shared
COPY --from=build /usr/src/app/sell/package*.json ./

# Install production dependencies
RUN npm install --only=production

# Expose the port that the app runs on
EXPOSE 3000

# Run the built app
CMD ["node", "build"]
