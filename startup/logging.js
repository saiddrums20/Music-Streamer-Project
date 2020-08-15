require('express-async-errors'); //if for some reason this doesnt work, switch to the async middlewares for each route
const winston = require('winston');
//require('winston-mongodb');

module.exports = function () {

    winston.handleExceptions(
        new winston.transports.Console( { colorize: true, prettyPrint: true }),
        new winston.transports.File( { filename: 'uncaughtExceptions.log' }));
    
    process.on('unhandledRejection', (ex) => {
        throw ex; //when throwing it, winston will catch it and proceed
    });
    
    winston.add(winston.transports.File, { filename: 'logfile.log '});
    //winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/MusicStreamer' }); //logs it in db, Check the empty values later
    
};