const express = require('express');
const server = express();
const router = require('./router');
const path = require("path");

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

server.use(express.urlencoded());
server.use(router);
server.use(express.static("public"));

server.listen(3001, (err) => {
    if (!err) console.log('Server running on port: 3001');
})
