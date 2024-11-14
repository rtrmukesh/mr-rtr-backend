# Use Ubuntu as the base image for easier Python installation
FROM ubuntu:20.04

# Install Python 3.8, pip, and ffmpeg
RUN apt-get update && apt-get install -y \
    python3.8 \
    python3-pip \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Ensure that python3 points to python3.8
RUN ln -sf /usr/bin/python3.8 /usr/bin/python3 && \
    python3 -m pip install --upgrade pip

# Install yt-dlp using pip for Python 3.8+
RUN python3 -m pip install yt-dlp

# Install Node.js and npm (modify as needed if Node.js is not already in the image)
RUN apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

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
