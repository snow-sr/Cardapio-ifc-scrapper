FROM node:latest

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm i

COPY . .

RUN npm run build
EXPOSE 8087

CMD ["npm", "start"]