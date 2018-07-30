const methodOverride = require('method-override');
const router = require('../routes/routes'); // if file is index, we can import without file name

// add more methods to router
module.exports = function (app) {
    app.use(methodOverride('X-HTTP-Method-Override'));

    app.use(methodOverride((req, res) => {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            const method = req.body._method;
            delete req.body._method;
            return method;
        }
        return undefined;
    }));

    app.use((req, res, next) => {
        res.redirectBack = () => {
            const backURL = req.header('Referer') || '/';

            return res.redirect(backURL);
        };

        next();
    });

    app.use(router);
};
