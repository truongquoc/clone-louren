const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const i18n = require('i18n');

const config = require('./config');
const helpers = require('../helpers/helpers');
const routes = require('./routes');
const { dbUrl } = require('./config');
const schedule = require('../infrastructure/commands/schedule');
const minifyHTML = require('./minifyHTML');

module.exports = (app, express) => {
    app.use(helmet());
    app.use(minifyHTML);

    app.use(cookieParser(process.env.SESSION_SECRET));

    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    app.use(express.json());
    app.use(favicon('./public/client/images/logo/favicon.png'));

    const sessionMiddleware = session({
        secret: process.env.SESSION_SECRET,
        name: 'mayhienhome.cookie',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: parseInt(config.sessionLifetime, 10) * 1000 },
        store: new MongoStore({ url: dbUrl }),
    });

    app.use(sessionMiddleware);

    app.use(flash());

    i18n.configure({
        locales: ['en', 'vi'],
        directory: 'lang',
        objectNotation: true,
        defaultLocale: 'vi',
    });

    app.use((req, res, next) => {
        helpers(res);
        next();
    });

    app.use('/public', express.static('./public', {
        // maxAge: '36000000',
    }));

    routes(app);

    schedule();

    return {
        session: sessionMiddleware,
    };
};
