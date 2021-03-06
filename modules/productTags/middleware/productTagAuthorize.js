const responseHelper = require('../../../helpers/responseHelper');
const roleHelper = require('../../../helpers/roleHelper');
const ProductTagRepositoryClass = require('../repositories/ProductTagRepository');

const ProductTagRepository = new ProductTagRepositoryClass();

const indexAuthorize = (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager'])) {
        return req.xhr ? res.json(responseHelper.notAuthorized())
            : next(responseHelper.notAuthorized());
    }
    next();
};

const showArticlesAuthorize = async (req, res, next) => {
    try {
        const check = await ProductTagRepository.checkExistBySlug(req.params.slug);
        if (check) {
            return next();
        }
        next(responseHelper.notFound());
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const editAuthorize = async (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager'])) {
        return res.json(responseHelper.notAuthorized());
    }
    const { id } = req.params;
    try {
        const check = await ProductTagRepository.checkExist({ _id: id });
        if (!check) {
            return res.json(responseHelper.notFound());
        }
        return next();
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = { indexAuthorize, showArticlesAuthorize, editAuthorize };
