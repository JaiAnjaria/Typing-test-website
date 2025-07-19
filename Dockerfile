# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project (except files in .dockerignore)
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Ensure Vite binds to all network interfaces
CMD ["npm", "run", "dev"]
