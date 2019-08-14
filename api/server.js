const express = require('express');

const configureMiddleware = require('./middleware.js');

const server = express();
configureMiddleware(server);

// sanity check route
server.get('/', (res) => {
    res.send("This is working.");
});

module.exports = server;