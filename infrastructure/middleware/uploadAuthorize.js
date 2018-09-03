const responseHelper = require('../../helpers/responseHelper');
const roleHelper = require('../../helpers/roleHelper');

const indexAuthorize = (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager'])) {
        return next(responseHelper.notAuthorized());
    }
    next();
};

const uploadAuthorize = async (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Property Manager', 'Property Writer'])) {
        return next(responseHelper.notAuthorized());
    }
    next();
};

const storeAuthorize = (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Property Manager', 'Property Writer', 'Blog Manager', 'Blogger'])) {
        return res.json(responseHelper.notAuthorized());
    }
    next();
};

module.exports = {
    indexAuthorize,
    uploadAuthorize,
    storeAuthorize,
};
