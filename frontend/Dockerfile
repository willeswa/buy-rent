FROM node:12 as build-deps

WORKDIR /app/frontend

COPY package.json package-lock.json /app/frontend/

RUN npm install

COPY . /app/frontend/

EXPOSE 80

RUN npm start