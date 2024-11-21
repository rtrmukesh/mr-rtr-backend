# Use Node.js 18 as the base image
FROM node:18

# Install required tools and add the deadsnakes PPA for Python 3.12
RUN apt-get update && apt-get install -y \
    software-properties-common && \
    add-apt-repository ppa:deadsnakes/ppa && \
    apt-get update && apt-get install -y \
    python3.12 \
    python3.12-venv \
    python3.12-dev \
    build-essential 

# Verify Python installation
RUN python3.12 --version

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to install dependencies
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Expose the application port
EXPOSE 8080

# Run the application
CMD ["node", "index.js"]
