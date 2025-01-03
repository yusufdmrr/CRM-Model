FROM node:latest

# Gerekli bağımlılıkları yükle
RUN apt-get update && apt-get install -y build-essential

WORKDIR /usr/src/index
COPY package*.json .
RUN npm install -g npm
RUN npm ci
COPY . .
CMD ["npm", "start"]
