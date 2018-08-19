const responseHelper = require('../../helpers/responseHelper');
const roleHelper = require('../../helpers/roleHelper');

const indexAuthorize = (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager'])) {
        return next(responseHelper.notAuthorized());
    }
    next();
};

module.exports = {
    indexAuthorize,
};
