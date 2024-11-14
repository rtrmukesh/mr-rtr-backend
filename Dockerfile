# Use Node.js 16 image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Install required dependencies for building Python from source
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
    libsqlite3-dev \
    tk-dev \
    libgdbm-compat-dev && \
    apt-get clean

# Download and install Python 3.9 from source
RUN curl -O https://www.python.org/ftp/python/3.9.7/Python-3.9.7.tgz && \
    tar -xvzf Python-3.9.7.tgz && \
    cd Python-3.9.7 && \
    ./configure --enable-optimizations && \
    make -j 2 && \
    make altinstall && \
    cd .. && \
    rm -rf Python-3.9.7 Python-3.9.7.tgz

# Verify Python version
RUN python3.9 --version

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app's code into the container
COPY . .

# Expose the port the app will run on
EXPOSE 8080

# Command to run the app
CMD ["node", "index.js"]
