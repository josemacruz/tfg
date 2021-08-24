FROM node
WORKDIR /app
COPY package.json .
RUN npm install --force
COPY . .
ENV REACT_APP_NAME=client
EXPOSE 3000
CMD ['npm',"start"]