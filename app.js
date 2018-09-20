require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');

require('./config/database')(mongoose);

const app = express();
require('./config/app')(app, express);

app.engine('ejs', require('ejs-locals'));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.listen(process.env.APP_PORT || 3000, (error) => {
    if (error) return;
});
