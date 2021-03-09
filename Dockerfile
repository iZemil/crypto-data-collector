FROM node:14.16.0-alpine
WORKDIR '/app'
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

FROM node:14.16.0-alpine
WORKDIR '/app'
COPY package*.json ./
RUN npm i
COPY . .
CMD [ "npm", "start" ]