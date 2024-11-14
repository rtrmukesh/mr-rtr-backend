# Use Node.js 16 image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Install required dependencies and build tools for Python 3.9
RUN apt-get update && \
    apt-get install -y \
    build-essential \
    zlib1g-dev \
    libncurses5-dev \
    libgdbm-dev \
    libnss3-dev \
    libssl-dev \
    libreadline-dev \
    libffi-dev \
    curl \
    libbz2-dev \
    python3.9 \
    python3.9-venv \
    python3.9-dev \
    python3-pip && \
    apt-get clean

# Ensure Python 3.9 is the default
RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.9 1 && \
    update-alternatives --install /usr/bin/pip pip /usr/bin/pip3 1

# Verify Python version
RUN python3 --version
RUN pip --version

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app's code into the container
COPY . .

# Expose the port the app will run on
EXPOSE 8080

# Command to run the app
CMD ["node", "index.js"]
