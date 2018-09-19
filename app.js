require('dotenv/config');
const express = require('express');
const morgan = require('morgan');
const vhost = require('vhost');
const https = require('https');
const fs = require('fs');
const mongoose = require('mongoose');
require('./config/database')(mongoose);
const { port } = require('./config/config'); // import from manually created file

const main = express();
const { session } = require('./config/app')(main, express);

main.engine('ejs', require('ejs-locals'));

main.set('view engine', 'ejs');
main.set('views', 'views');
main.use(morgan('dev'));

main.listen(port, (error) => {
    if (error) {
        console.log('> Error: ', error);
        return;
    }
    console.log('Server is running on port', port);
});
