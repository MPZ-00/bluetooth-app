# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the server dependencies
RUN npm install

# Copy the server files to the container
COPY . .

# Expose the port on which the server will run
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
