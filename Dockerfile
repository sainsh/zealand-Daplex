FROM node:latest

WORKDIR /usr/src/daplex
COPY package.json .
RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]

COPY . .