const { validationResult } = require('express-validator/check');
const roleHelper = require('../../../helpers/roleHelper');
const responseHelper = require('../../../helpers/responseHelper');
const AuthRepositoryClass = require('../repositories/AuthRepository');
const CartRepositoryClass = require('../../carts/repositories/CartRepository');

const AuthRepository = new AuthRepositoryClass();
const CartRepository = new CartRepositoryClass();

const index = (req, res) => res.render('modules/users/admin/index');

const showLoginForm = (req, res) => res.render('modules/users/admin/auth/login');

const login = async (req, res, next) => {
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('errors', errors.mapped());
        req.flash('oldValue', data);

        return res.redirectBack();
    }
    try {
        const user = await AuthRepository.login(data);
        if (!user || roleHelper.hasRoleOnly(user, 'User')) {
            req.flash('oldValue', data);
            req.flash('errors', { email: { msg: 'Email hoặc mật khẩu không chính xác' } });
            return res.redirectBack();
        }
        req.session.cUser = AuthRepository.getCurrentUserData(user);
        if (req.session.cart && req.session.cart.length) {
            await CartRepository.syncCart(user._id, req.session.cart);
            delete req.session.cart;
        }
        if (req.session.prevUrl) {
            res.redirect(req.session.prevUrl);
            delete req.session.prevUrl;
            return true;
        }
        return res.redirect('/admin');
    } catch (e) {
        return next(responseHelper.error(e.message));
    }
};

const logout = (req, res) => {
    const user = req.session.cUser;
    delete req.session.cUser;
    if (roleHelper.hasRoleOnly(user, 'User')) {
        return res.redirect('/dang-nhap');
    }
    return res.redirect('/admin/login');
};

const showChangePasswordForm = (req, res) => res.render('modules/users/admin/auth/changePassword');

const changePassword = async (req, res, next) => {
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('errors', errors.mapped());
        return res.redirectBack();
    }
    try {
        if (!await AuthRepository.comparePassword(data, req.session.cUser._id)) {
            req.flash('errors', { password: { msg: 'Password hiện tại không chính xác' } });
            return res.redirectBack();
        }
        await AuthRepository.changePassword(data, req.session.cUser._id);
        req.flash('success', 'Thay đổi mật khẩu thành công');
        return res.redirectBack();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const showForgotPasswordForm = (req, res) => res.render('modules/users/admin/auth/forgotPassword');

const sendMessage = async (req, res, next) => {
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('oldValue', data);
        req.flash('errors', errors.mapped());
        return res.redirectBack();
    }
    try {
        const user = await AuthRepository.getForgotPasswordUser(data);
        if (data.email) {
            await AuthRepository.sendMail(user, `${req.headers.origin}/admin/password/reset`);
            req.flash('success', 'Gửi mail thành công');
        } else {
            // Firebase implementation
        }
        return res.redirectBack();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const showResetPasswordForm = async (req, res) => res.render('modules/users/admin/auth/resetPassword');

const resetPassword = async (req, res, next) => {
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('oldValue', data);
        req.flash('errors', errors.mapped());
        return res.redirectBack();
    }
    try {
        await AuthRepository.resetPassword(data, req.params.token);
        req.flash('success', 'Khôi phục mật khẩu thành công');

        return res.redirect('/admin/login');
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = {
    index,
    showLoginForm,
    login,
    logout,
    showChangePasswordForm,
    changePassword,
    showForgotPasswordForm,
    sendMessage,
    showResetPasswordForm,
    resetPassword,
};
