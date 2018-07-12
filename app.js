require('dotenv/config');
const express = require('express');
const morgan = require('morgan');
const http = require('http');
const mongoose = require('mongoose');

const { port } = require('./config/config'); // import from manually created file
const app = express();
const server = http.createServer(app);

const { session } = require('./config/app')(app, express);
require('./config/database')(mongoose);

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(morgan('dev')); // like a middleware

server.listen(port, (error) => {
    if (error) {
        console.log('> Error: ', error);
        return;
    }

    console.log('Server is running on port', port);
});