const http = require ('http');
const app = require('./app')
const port = process.env.PORT || 5555
const server = http.createServer(app);
server.listen(port);

module.exports = app