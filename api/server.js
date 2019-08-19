const express = require('express');

const configureMiddleware = require('./middleware.js');
const authRouter = require('../routes/authRoutes.js');

const server = express();
configureMiddleware(server);

server.use('/api/auth', authRouter);

// sanity check route
/*server.get('/', (req,res) => {
    res.send("This is working.");
});
*/

module.exports = server;
