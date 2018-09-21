const responseHelper = require('../../../helpers/responseHelper');
const roleHelper = require('../../../helpers/roleHelper');
const UploadRepositoryClass = require('../repositories/UploadRepository');

const UploadRepository = new UploadRepositoryClass();

const indexAuthorize = (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager'])) {
        return req.xhr ? res.json(responseHelper.notAuthorized())
            : next(responseHelper.notAuthorized());
    }
    next();
};

const uploadAuthorize = async (req, res, next) => {
    if (roleHelper.hasRole(req.session.cUser, 'User')) {
        return next(responseHelper.notAuthorized());
    }
    next();
};

const storeAuthorize = (req, res, next) => {
    if (roleHelper.hasRole(req.session.cUser, 'User')) {
        return res.json(responseHelper.notAuthorized());
    }
    next();
};

const destroyAuthorize = async (req, res, next) => {
    try {
        const { cUser } = req.session;
        let check = true;
        const images = await UploadRepository.getManyByIds(req.body.images);
        images.forEach((image) => {
            if (image.user.toString() !== cUser._id && !roleHelper.hasRole(cUser, ['Admin', 'Manager'])) {
                check = false;
            }
        });
        if (!check) {
            return res.json(responseHelper.notAuthorized());
        }
        next();
    } catch (e) {
        console.log(e);

        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    indexAuthorize,
    uploadAuthorize,
    storeAuthorize,
    destroyAuthorize,
};
