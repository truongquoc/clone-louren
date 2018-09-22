const responseHelper = require('../../../helpers/responseHelper');
const roleHelper = require('../../../helpers/roleHelper');
const ProductRepositoryClass = require('../repositories/ProductRepository');

const ProductRepository = new ProductRepositoryClass();

const indexAuthorize = (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager'])) {
        return next(responseHelper.notAuthorized());
    }
    next();
};

const showMyProductsAuthorize = (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Product Creator'])) {
        return next(responseHelper.notAuthorized());
    }
    next();
};

const showAuthorize = async (req, res, next) => {
    try {
        const product = await ProductRepository.checkExist({
            slug: req.params.slug,
        }, { select: 'author isDraft isApproved' });
        if (!product) {
            return next(responseHelper.notFound());
        }
        if (product.isApproved && !product.isDraft) {
            return next();
        }
        if ((!product.isApproved || product.isDraft) && req.session.cUser
            && (roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager'])
                || req.session.cUser._id === product.author.toString())) {
            return next();
        }
        next(responseHelper.notFound());
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const createProductAuthorize = (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Product Creator'])) {
        return next(responseHelper.notAuthorized());
    }
    next();
};

const editAuthorize = async (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Product Creator'])) {
        const response = responseHelper.notAuthorized();
        return req.xhr ? res.json(response) : next(response);
    }
    const condition = req.params.slug ? { slug: req.params.slug } : { _id: req.params.id };
    try {
        const product = await ProductRepository.getDetail(condition, { select: 'author' });
        if (!product) {
            const response = responseHelper.notFound();
            return req.xhr ? res.json(response) : next(response);
        }
        if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager'])
            && product.author.toString() !== req.session.cUser._id) {
            const response = responseHelper.notAuthorized();
            return req.xhr ? res.json(response) : next(response);
        }
        next();
    } catch (e) {
        const response = responseHelper.error(e.message);
        return req.xhr ? res.json(response) : next(response);
    }
};

const approveAuthorize = async (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager'])) {
        return res.json(responseHelper.notAuthorized());
    }
    try {
        const product = await ProductRepository.checkExist({
            _id: req.params.id,
        });
        if (!product) {
            return res.json(responseHelper.notFound());
        }
        next();
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    indexAuthorize,
    showMyProductsAuthorize,
    showAuthorize,
    createProductAuthorize,
    editAuthorize,
    approveAuthorize,
};
