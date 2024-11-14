# Use Node.js 16 as the base image
FROM node:16

# Install necessary system dependencies and Python (yt-dlp requires Python 3.7+)
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Install yt-dlp globally
RUN pip3 install yt-dlp

# Set the working directory for the application
WORKDIR /app

# Copy the package.json and package-lock.json files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port (default 8080)
EXPOSE 8080

# Start the Node.js application
CMD ["node", "index.js"]
