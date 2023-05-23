# Use an official Node.js runtime as a parent image
FROM node:lts-alpine AS builder

# Set the working directory to /app
WORKDIR /app

# Copy the package and lock files to the container
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the project files to the container
COPY . .

# Build the project
RUN npm run build --prod

# Use a lightweight web server to serve the built files
FROM nginx:alpine

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built files from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port the application will run on
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]



