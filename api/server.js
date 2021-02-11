const express = require('express');

const postsRouter = require('./posts/posts-router')
const usersRouter = require('./users/users-router')

const server = express();


// remember express by default cannot parse JSON in request bodies

// global middlewares and routes need to be connected here

server.use(express.json())
server.use('/api/posts', postsRouter)
server.use('/api/users', usersRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
