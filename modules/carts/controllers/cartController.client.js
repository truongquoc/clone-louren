const { validationResult } = require('express-validator/check');
const responseHelper = require('../../../helpers/responseHelper');
const CartRepositoryClass = require('../repositories/CartRepository');
const BillRepositoryClass = require('../../bills/repositories/BillRepository');

const CartRepository = new CartRepositoryClass();
const BillRepository = new BillRepositoryClass();

const index = (req, res, next) => {
    return res.render('modules/carts/client/index');
};

const showUserInformationForm = (req, res, next) => {
    return res.render('modules/carts/client/userInformation', {
        products: req.session.products,
    });
};

const buyProductWithoutLogin = async (req, res, next) => {
    const errors = validationResult(req);
    const data = req.body;
    if (!errors.isEmpty()) {
        req.flash('oldValue', data);
        req.flash('errors', errors.mapped());
        return res.redirectBack();
    }
    try {
        const bill = await CartRepository.createBillWithoutLogin(data, req.session.products);
        await BillRepository.sendConfirmEmail(bill._id);
        req.flash('success', 'Gửi yêu cầu mua thành công, hãy kiểm tra lại email của bạn.');

        return res.redirect('/gio-hang');
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const buyProduct = async (req, res, next) => {
    try {
        const bill = await CartRepository.createBill(req.params.id, req.session.cUser._id);
        await BillRepository.sendConfirmEmail(bill._id);
        await CartRepository.deleteById(req.params.id);
        req.flash('success', 'Gửi yêu cầu mua thành công, hãy kiểm tra lại email của bạn.');

        return res.redirect('/nguoi-dung/don-hang');
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = {
    index,
    buyProductWithoutLogin,
    showUserInformationForm,
    buyProduct,
};
