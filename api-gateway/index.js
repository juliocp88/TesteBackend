const httpProxy = require('express-http-proxy');
const express = require('express');
const app = express();
var logger = require('morgan');
require('dotenv').config();
const selectProxyHost = require('./src/application');
 
app.use(logger('dev'));
 
app.use((req, res, next) => {
    httpProxy(selectProxyHost(req))(req, res, next);
});
 
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API Gateway listening on port ${port}...`);
});