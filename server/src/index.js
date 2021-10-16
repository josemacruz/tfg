const express = require('express');
const cors = require('cors');
const http = require("http");
const socketIo = require('socket.io');
const indexRouter = require('./routes/index');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json())
app.use(cors());
app.use('/', indexRouter);

const PORT = process.env.PORT|| 8080;

server.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))