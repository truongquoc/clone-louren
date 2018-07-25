const adminRedirectIfAuthenticated = (req, res, next) => {
    // If user doesn't have user role --> redirect to admin, if not, redirect to user management page
    if (req.session.cUser) {
        return res.redirect('/admin');
    }
    next();
};

const adminRedirectIfNotAuthenticated = (req, res, next) => {
    if (!req.session.cUser) {
        return res.redirect('/admin/login');
    }
    // Check if user has user role, next() to render error page
    next();
};

module.exports = { adminRedirectIfAuthenticated, adminRedirectIfNotAuthenticated };