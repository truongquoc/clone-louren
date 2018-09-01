const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const helpers = require('../helpers/helpers');
const routes = require('./routes');
const { dbUrl } = require('./config');
const schedule = require('../infrastructure/commands/schedule');

// Main connection (session, flash, bodyParser, router after config, helper)
module.exports = function (app, express) {
    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    app.use(express.json());

    const sessionMiddleware = session({
        secret: 'keyboaasdfasdfrdasdfasdfcat',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 7200000 },
        store: new MongoStore({ url: dbUrl }),
    });

    app.use(sessionMiddleware);

    app.use(flash());

    app.use((req, res, next) => {
        helpers(res);
        next();
    });

    app.use('/public', express.static('./public'));

    routes(app);

    schedule();

    return {
        session: sessionMiddleware,
    };
};
