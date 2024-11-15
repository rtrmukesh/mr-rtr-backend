# Use Node.js as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to install dependencies
COPY package*.json ./

# Install Node.js dependencies, including ytdl-core
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Expose the application port
EXPOSE 8080

# Run the application
CMD ["node", "index.js"]
