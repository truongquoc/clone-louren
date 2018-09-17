const roleHelper = require('../../../helpers/roleHelper');
const responseHelper = require('../../../helpers/responseHelper');
const BillRepositoryClass = require('../repositories/BillRepository');

const BillRepository = new BillRepositoryClass();

const indexAuthorize = (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Product Creator'])) {
        return next(responseHelper.notAuthorized());
    }
    next();
};

const showAuthorize = async (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Product Creator'])) {
        return next(responseHelper.notAuthorized());
    }
    try {
        const bill = await BillRepository.checkExist({ code: req.params.code });
        if (!bill) {
            return next(responseHelper.notFound());
        }
        next();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};
const clientShowAuthorize = async (req, res, next) => {
    try {
        const bill = await BillRepository.checkExist({ code: req.params.code });
        if (!bill) {
            return next(responseHelper.notFound());
        }
        next();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};


const approveAuthorize = async (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Product Creator'])) {
        return res.json(responseHelper.notAuthorized());
    }
    try {
        const bill = await BillRepository.checkExist({ _id: req.params.id });
        if (!bill) {
            return res.json(responseHelper.notFound());
        }
        next();
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const revertAuthorize = async (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Product Creator'])) {
        return res.json(responseHelper.notAuthorized());
    }
    try {
        const bill = await BillRepository.checkExistOnlyTrashed({ _id: req.params.id });
        if (!bill) {
            return res.json(responseHelper.notFound());
        }
        next();
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    indexAuthorize,
    showAuthorize,
    approveAuthorize,
    revertAuthorize,
    clientShowAuthorize,
};
