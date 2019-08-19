const express = require('express');

const configureMiddleware = require('./middleware.js');
const authRouter = require('../routes/authRoutes.js');
const userRouter = require('../routes/userRoutes.js');
const carRouter = require('../routes/carRoutes.js');
const statRouter = require('../routes/statRoutes.js');

const server = express();
configureMiddleware(server);

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);
server.use('/api/cars', carRouter);
server.use('/api/stats', statRouter);

// sanity check route
/*server.get('/', (req,res) => {
    res.send("This is working.");
});
*/

module.exports = server;
