const responseHelper = require('../../../helpers/responseHelper');
const CartRepositoryClass = require('../repositories/CartRepository');

const CartRepository = new CartRepositoryClass();

const confirmCartAuthorize = async (req, res, next) => {
    try {
        const cart = await CartRepository.checkExist({ _id: req.params.id }, { select: 'user' });
        if (!cart) {
            return next(responseHelper.notFound());
        }
        if (cart.user.toString() !== req.session.cUser._id) {
            return next(responseHelper.notAuthorized());
        }
        next();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const showUserInformationRequest = (req, res, next) => {
    if (!req.session.products || !req.session.products.length) {
        return res.redirect('/gio-hang');
    }
    next();
};

module.exports = {
    confirmCartAuthorize,
    showUserInformationRequest,
};
