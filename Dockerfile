# Use Node.js 16 image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Install Python 3.9 and required dependencies from deadsnakes PPA
RUN apt-get update && \
    apt-get install -y software-properties-common && \
    add-apt-repository ppa:deadsnakes/ppa && \
    apt-get update && \
    apt-get install -y \
    python3.9 \
    python3.9-venv \
    python3.9-dev \
    python3-pip && \
    apt-get clean

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app's code into the container
COPY . .

# Expose the port the app will run on
EXPOSE 8080

# Command to run the app
CMD ["node", "index.js"]
