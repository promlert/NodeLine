# Use official Node.js runtime as base image
FROM node:22.12.0-alpine

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy tsconfig.json and source files
COPY tsconfig.json ./
COPY src ./src

# Build TypeScript code
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "dist/app.js"]