# Use Ubuntu as the base image for easier Python installation
FROM ubuntu:20.04

# Set non-interactive mode for APT to avoid prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install Python 3.8, pip, and ffmpeg
RUN apt-get update && apt-get install -y \
    python3.8 \
    python3-pip \
    ffmpeg \
    locales \
    && locale-gen en_US.UTF-8 \
    && update-locale LANG=en_US.UTF-8 \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables for locale
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# Ensure that python3 points to python3.8
RUN ln -s /usr/bin/python3.8 /usr/bin/python3 && \
    python3 -m pip install --upgrade pip

# Install yt-dlp using pip for Python 3.8+
RUN python3 -m pip install yt-dlp

# Set the working directory and install Node.js dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Expose the application port
EXPOSE 8080

# Start the Node.js application
CMD ["node", "index.js"]
