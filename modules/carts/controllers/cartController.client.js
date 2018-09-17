const responseHelper = require('../../../helpers/responseHelper');
const CartRepositoryClass = require('../repositories/CartRepository');
const BillRepositoryClass = require('../../bills/repositories/BillRepository');

const CartRepository = new CartRepositoryClass();
const BillRepository = new BillRepositoryClass();

const index = (req, res, next) => {
    return res.render('modules/carts/client/index');
};

const sendConfirmEmail = async (req, res, next) => {
    try {
        const bill = await CartRepository.createBill(req.params.id, req.session.cUser._id);
        await BillRepository.sendConfirmEmail(bill._id);
        await CartRepository.deleteById(req.params.id);
        req.flash('success', 'Gửi yêu cầu mua thành công, hãy kiểm tra lại email của bạn.');

        return res.redirect('/nguoi-dung');
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = {
    index,
    sendConfirmEmail,
};
