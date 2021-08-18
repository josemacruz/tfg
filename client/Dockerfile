FROM node:14

WORKDIR /app

COPY . /app/

ENV REACT_APP_REST=/api

RUN npm install

RUN npm run build

CMD ['npm',"start"]