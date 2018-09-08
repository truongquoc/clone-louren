const responseHelper = require('../../../helpers/responseHelper');
const roleHelper = require('../../../helpers/roleHelper');
const PropertyStatusRepositoryClass = require('../repositories/PropertyStatusRepository');

const PropertyStatusRepository = new PropertyStatusRepositoryClass();

const indexAuthorize = (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Property Manager'])) {
        return req.xhr ? res.json(responseHelper.notAuthorized())
            : next(responseHelper.notAuthorized());
    }
    next();
};

const editAuthorize = async (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Property Manager'])) {
        return res.json(responseHelper.notAuthorized());
    }
    const { id } = req.params;
    try {
        const check = await PropertyStatusRepository.checkExist({ _id: id });
        // Authorize user
        if (!check) {
            return res.json(responseHelper.notFound());
        }
        next();
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const showArticlesAuthorize = async (req, res, next) => {
    try {
        const check = await PropertyStatusRepository.checkExistBySlug(req.params.slug);
        if (check) {
            return next();
        }
        next(responseHelper.notFound());
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = {
    indexAuthorize,
    editAuthorize,
    showArticlesAuthorize,
};
