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

const certOptions = {
    key: fs.readFileSync('../../../../../home/taile/rootCA.key', 'utf8'),
    cert: fs.readFileSync('../../../../../home/taile/rootCA.crt', 'utf8'),
    passphrase: '123456',
};
main.engine('ejs', require('ejs-locals'));

main.set('view engine', 'ejs');
main.set('views', 'views');
main.use(morgan('dev'));
if (process.env.APP_ENV === 'local') {
    const app = express();
    app.use(vhost(process.env.APP_URL, main));
    app.listen(port, (error) => {
    // https.createServer(certOptions, app).listen(port, (error) => {
        if (error) {
            console.log('> Error: ', error);
            return;
        }
        console.log('Server is running on port', port);
    });
} else {
    main.listen(port, (error) => {
        if (error) {
            console.log('> Error: ', error);
            return;
        }
        console.log('Server is running on port', port);
    });
}
