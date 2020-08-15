const express = require('express');
const home = require('../routes/home');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const tracks = require('../routes/tracks');
const streams = require('../routes/streams');
const users = require('../routes/users');
const auth = require('../routes/auth');
const streamEnds = require('../routes/streamEnds');
const error = require('../middleware/error');
const morgan = require('morgan'); //morgan logs the requests on the console

module.exports = function(app) {
    app.use(express.json()); //middleware, we use app.use() every time we want to add a function to the middleware
    app.use(express.urlencoded({ extended: true})); //this let the user input key=x&value=y type body in the url
    app.use(express.static('public')); //lets you use the files from folder as localhost:5000/readme.txt for example
    
    if(app.get('env') == 'development') {
        app.use(morgan('tiny'));
    }
    
    app.use('/', home);
    app.use('/api/genres', genres); //for any route that has /api/library use the "library router"
    app.use('/api/customers', customers);
    app.use('/api/tracks', tracks);
    app.use('/api/streams', streams);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/streamEnds', streamEnds);
    app.use(error); //this middleware for the error handling needs to be placed after de routing middlewares

};