# Use Ubuntu as the base image for easier Python installation
FROM ubuntu:20.04

# Install Python 3.8, pip, and ffmpeg
RUN apt-get update && apt-get install -y \
    python3.8 \
    python3-pip \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Ensure that python3 points to python3.8
RUN ln -s /usr/bin/python3.8 /usr/bin/python3 && \
    python3 -m pip install --upgrade pip

# Install yt-dlp using pip for Python 3.8+
RUN python3 -m pip install yt-dlp

# Continue with Node.js setup (assuming Node.js is already in the image)
# Set the working directory and install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Expose the application port
EXPOSE 8080

# Start the Node.js application
CMD ["node", "index.js"]
