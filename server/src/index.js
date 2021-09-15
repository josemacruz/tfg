const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./routes/index');

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/', indexRouter);


const PORT = process.env.PORT|| 8080;

app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))