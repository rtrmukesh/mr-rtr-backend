# Use Node.js 16 as the base image
FROM node:16

# Install necessary dependencies and Python 3.8+
RUN apt-get update && apt-get install -y \
    software-properties-common \
    && add-apt-repository ppa:deadsnakes/ppa \
    && apt-get update \
    && apt-get install -y \
    python3.8 \
    python3.8-pip \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Install yt-dlp using pip for Python 3.8+
RUN python3.8 -m pip install --upgrade pip && \
    pip3 install yt-dlp

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
