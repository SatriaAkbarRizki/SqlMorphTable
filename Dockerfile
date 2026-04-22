# Use a lightweight Nginx image
FROM nginx:alpine

# Copy all project files to the default Nginx html directory
COPY . /usr/share/nginx/html/

# Expose port 80 for HTTP traffic
EXPOSE 80

# STart the Nginx server
CMD ["nginx", "-g", "daemon off;"]
