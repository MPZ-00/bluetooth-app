# Use the official Nginx image as the base image
FROM nginx:latest

# Copy the built app files to the appropriate Nginx directory
COPY dist/ /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
