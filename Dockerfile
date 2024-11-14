# Use Node.js 16 as the base image
FROM node:16

# Install Python 3.9 and dependencies needed for yt-dlp
RUN apt-get update && apt-get install -y \
    python3.9 \
    python3-pip \
    && apt-get clean

# Install yt-dlp using pip
RUN pip3 install yt-dlp

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
