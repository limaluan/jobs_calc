const express = require('express');
const server = express();
const router = require('./router');

server.set("view engine", "ejs");
server.use(router);
server.use(express.static("public"));

server.listen(3001, (err) => {
    if (!err) console.log('Server running on port: 3001');
})
