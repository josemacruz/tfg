FROM node
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
ENV REACT_APP_NAME=client
ENV CHOKIDAR_USEPOLLING=true
EXPOSE 3000
CMD ['npm',"run","start"]