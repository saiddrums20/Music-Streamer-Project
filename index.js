const config = require('config');
const express = require('express');
const debug = require('debug')('app:startup');
const app = express(); //returns an object express
const winston = require('winston');

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

app.set('view engine', 'pug');
app.set('views', './views');
debug(`Application Name: ${config.get('name')}`);

const port = process.env.PORT || 3000; //evironmental variable for the port
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;