const roleHelper = require('../../../helpers/roleHelper');
const responseHelper = require('../../../helpers/responseHelper');

const indexAuthorize = (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, 'Admin')) {
        next(responseHelper.notAuthorized());
    }
    next();
};

module.exports = {
    indexAuthorize,
};
