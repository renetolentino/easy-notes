const express = require('express');
const app = express();
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const route = require('./routes/route');
const bodyParser = require('body-parser');
const LocalStrategy = require('./utils/LocalStrategy');
const cors = require('cors');
const session = require('express-session');
const crypto = require('crypto');
require('dotenv').config();

// MIDDLWARES PARA LIDAR COM REQUESTS E RESPONSES
console.log(path.join(__dirname, 'app/build/index.html'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'app/build')));
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());
app.use(LocalStrategy.useLocalStrategy);
app.use(
  session({
    secret: crypto.randomBytes(32).toString('hex'),
    resave: false,
    saveUninitialized: true,
    // 1000ms = 1 sec; 60 sec = 1 min; 60 min = 1 hour; 24 hour = 1 day; 30 days = 1 month; 3 months at total
    cookie: { secure: true, maxAge: 1000 * 60 * 60 * 24 * 30 * 3 },
  })
);

// MIDDLEWARE PARA AS ROTAS DA API
app.use('/api/v1', apiRoutes);
app.use('/', route);

module.exports = app;
