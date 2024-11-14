# Use Node.js 16 as the base image
FROM node:16

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
    python3.8 \
    python3.8-pip \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Ensure that python3 points to python3.8 and pip uses python3.8
RUN ln -s /usr/bin/python3.8 /usr/bin/python3 && \
    python3 -m pip install --upgrade pip

# Install yt-dlp using pip for Python 3.8+
RUN python3 -m pip install yt-dlp

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
