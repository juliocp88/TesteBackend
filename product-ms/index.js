
const http  = require('http');
require('dotenv').config();

const app = require('./src/application');

const port = process.env.PORT || 3002;

let server = http.createServer(app);

server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});



