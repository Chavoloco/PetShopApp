const http = require('http');
const requestHandler = require('./requestHandler');
const resourses = require('./resourses');

global.resourses = resourses;

const hostname = '127.0.0.1';
const port = 3000;



const server =  http.createServer(requestHandler);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


//modular codigo para que no tenga tantas lineas de codigo