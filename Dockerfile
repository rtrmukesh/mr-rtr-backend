FROM node:18
WORKDIR /app
COPY pakage*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "index.js"]