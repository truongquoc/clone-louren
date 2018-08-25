const { validationResult } = require('express-validator/check');
const responseHelper = require('../../../helpers/responseHelper');
const AuthRepositoryClass = require('../repositories/AuthRepository');

const AuthRepository = new AuthRepositoryClass();

const index = (req, res) => (
    res.render('modules/users/admin/index')
);

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
        if (user) {
            req.session.cUser = {
                _id: user.id,
                roles: user.roles,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                slug: user.slug,
                createdAt: user.createdAt,
            };
            if (req.session.prevUrl) {
                res.redirect(req.session.prevUrl);
                delete req.session.prevUrl;

                return true;
            }

            return res.redirect('/admin');
        }
        req.flash('oldValue', data);
        req.flash('errors', { email: { msg: 'Email hoặc mật khẩu không chính xác' } });

        return res.redirectBack();
    } catch (e) {
        return next(responseHelper.error(e.message));
    }
};

const logout = (req, res) => {
    delete req.session.cUser;
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
        req.flash('success', true);
        return res.redirectBack();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const showForgotPasswordForm = (req, res) => {

};

const sendMessageToMail = (req, res) => {

};

const sendMessageToDevice = (req, res) => {

};

module.exports = {
    index,
    showLoginForm,
    login,
    logout,
    showChangePasswordForm,
    changePassword,
    showForgotPasswordForm,
    sendMessageToMail,
    sendMessageToDevice,
};
