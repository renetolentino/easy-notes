const express = require('express');
const app = express();
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const route = require('./routes/route');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// MIDDLWARES PARA LIDAR COM REQUESTS E RESPONSES
app.set('view engine', 'html');
console.log(path.join(__dirname, 'app/build'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'app/build')));
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());

// MIDDLEWARE PARA AS ROTAS DA API
app.use('/api/v1', apiRoutes);
app.use('/', route);

module.exports = app;
