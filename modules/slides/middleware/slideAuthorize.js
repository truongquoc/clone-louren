const responseHelper = require('../../../helpers/responseHelper');
const roleHelper = require('../../../helpers/roleHelper');
const SlideRepositoryClass = require('../repositories/SlideRepository');

const SlideRepository = new SlideRepositoryClass();

const indexAuthorize = (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager'])) {
        return next(responseHelper.notAuthorized());
    }
    next();
};

const editAuthorize = async (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager'])) {
        return next(responseHelper.notAuthorized());
    }
    const { id } = req.params;
    try {
        const check = await SlideRepository.checkExist({ _id: id });
        if (!check) {
            return next(responseHelper.notFound());
        }
        next();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const changeOrderAuthorize = async (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager'])) {
        return res.json(responseHelper.notAuthorized());
    }
    const { ids } = req.body;
    try {
        const check = await SlideRepository.baseGet({ _id: ids }, { select: '_id' });
        if (check.length !== ids.length) {
            return res.json(responseHelper.notFound());
        }
        next();
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    indexAuthorize,
    editAuthorize,
    changeOrderAuthorize,
};
