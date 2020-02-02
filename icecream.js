const http = require('http');
const mango = require('./mango');

const port = process.env.PORT || 3000;

const server = http.createServer(mango);

server.listen(port);