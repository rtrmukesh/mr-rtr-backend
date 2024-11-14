# Use Node.js 16 image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Install Python 3.9 and required dependencies
RUN apt-get update && \
    apt-get install -y \
    python3.9 \
    python3.9-venv \
    python3.9-dev \
    python3-pip \
    build-essential \
    zlib1g-dev \
    libncurses5-dev \
    libgdbm-dev \
    libnss3-dev \
    libssl-dev \
    libreadline-dev \
    libffi-dev \
    curl \
    libbz2-dev && \
    apt-get clean

# Install yt-dlp directly using pip
RUN python3.9 -m pip install --upgrade pip && \
    python3.9 -m pip install yt-dlp

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app's code into the container
COPY . .

# Expose the port the app will run on
EXPOSE 8080

# Command to run the app
CMD ["node", "index.js"]
