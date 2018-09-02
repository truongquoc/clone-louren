const passport = require('../../../config/passport');
const responseHelper = require('../../../helpers/responseHelper');

const adminRedirectIfAuthenticated = (req, res, next) => {
    // If user doesn't have user role
    // --> redirect to admin, if not, redirect to user management page
    if (req.session.cUser) {
        return res.redirect('/admin');
    }
    next();
};

const adminRedirectIfNotAuthenticated = (req, res, next) => {
    if (!req.session.cUser) {
        req.session.prevUrl = req.originalUrl;

        return res.redirect('/admin/login');
    }
    // Check if user has user role, next() to render error page
    return next();
};

const apiAuth = (req, res, next) => {
    passport.authenticate('bearer', { session: false }, (err, data) => {
        if (err) {
            return res.json(responseHelper.error(err.message));
        }
        if (!data) {
            return res.json(responseHelper.error('INVALID_TOKEN', 400));
        }
        req.user = data.user;
        next();
    })(req, res, next);
};

module.exports = {
    adminRedirectIfAuthenticated,
    adminRedirectIfNotAuthenticated,
    apiAuth,
};
