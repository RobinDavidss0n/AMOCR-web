FROM node:15.7.0

EXPOSE 8080:3000

WORKDIR /web-app/

COPY package*.json ./

RUN npm install

COPY src src

CMD npm run start