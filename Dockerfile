# Use Node.js 16 as the base image
FROM node:16



# Verify Python version (ensure it's >= 3.9)
RUN python3.9 --version
RUN python --version

# Install yt-dlp via npm (if you need this)
RUN npm install yt-dlp@latest

# Set the working directory for the application
WORKDIR /app

# Copy the package.json and package-lock.json files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 8080

# Start the Node.js application
CMD ["node", "index.js"]
