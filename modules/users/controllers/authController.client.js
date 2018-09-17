const { validationResult } = require('express-validator/check');
const passport = require('../../../config/passport');
const responseHelper = require('../../../helpers/responseHelper');
const AuthRepositoryClass = require('../repositories/AuthRepository');
const UserRepositoryClass = require('../repositories/UserRepository');
const CartRepositoryClass = require('../repositories/CartRepository');

const AuthRepository = new AuthRepositoryClass();
const UserRepository = new UserRepositoryClass();
const CartRepository = new CartRepositoryClass();

const showLoginForm = (req, res) => res.render('modules/users/client/auth/login');

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
        if (!user) {
            req.flash('oldValue', data);
            req.flash('errors', { email: { msg: 'Email hoặc mật khẩu không chính xác' } });
            return res.redirectBack();
        }
        req.session.cUser = AuthRepository.getCurrentUserData(user);

        return res.redirect('/nguoi-dung');
    } catch (e) {
        return next(responseHelper.error(e.message));
    }
};

const facebookLogin = (req, res, next) => {
    passport.authenticate('facebook', {}, async (err, data) => {
        if (!data) {
            return next(responseHelper.error());
        }
        try {
            let user = await AuthRepository.findUserWithSocialMedia({
                name: 'facebook',
                id: data.id,
            });
            if (user && user.deletedAt) {
                req.flash('message', 'Tài khoản này đã bị chặn');
                return res.redirect('/login');
            }
            if (!user) {
                user = await AuthRepository.facebookLogin(data);
            }
            req.session.cUser = AuthRepository.getCurrentUserData(user);
            return res.redirect('/');
        } catch (e) {
            next(responseHelper.error(e.message));
        }
    })(req, res, next);
};

const googleLogin = (req, res, next) => {
    passport.authenticate('google', {}, async (err, data) => {
        if (!data) {
            return next(responseHelper.error());
        }
        try {
            let user = await AuthRepository.findUserWithSocialMedia({
                name: 'google',
                id: data.id,
                email: data.emails[0].value,
            });
            if (user && user.deletedAt) {
                req.flash('message', 'Tài khoản này đã bị chặn');
                return res.redirect('/login');
            }
            if (!user) {
                user = await AuthRepository.googleLogin(data);
            }
            req.session.cUser = AuthRepository.getCurrentUserData(user);
            return res.redirect('/');
        } catch (e) {
            next(responseHelper.error(e.message));
        }
    })(req, res, next);
};

const showRegisterForm = (req, res) => res.render('modules/users/client/auth/register');

const register = async (req, res, next) => {
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('oldValue', data);
        req.flash('errors', errors.mapped());
        return res.redirectBack();
    }
    try {
        const user = await UserRepository.create(data);
        await CartRepository.create(user._id);

        return res.redirect(307, `/dang-ky/${user._id}/thanh-cong`);
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const showSuccessRegisterPage = async (req, res, next) => {
    try {
        const user = await UserRepository.getById(req.params.id);

        return res.render('modules/users/client/auth/successRegister', {
            user,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const showForgotPasswordForm = (req, res) => res.render('modules/users/client/auth/forgotPassword');

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
        await AuthRepository.sendMail(user, `${req.headers.origin}/quen-mat-khau/khoi-phuc`);
        req.flash('success', 'Gửi mail thành công');

        return res.redirectBack();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const showResetPasswordForm = async (req, res) => res.render('modules/users/client/auth/resetPassword');

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

        return res.redirect('/dang-nhap');
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = {
    showLoginForm,
    login,
    facebookLogin,
    googleLogin,
    showRegisterForm,
    register,
    showSuccessRegisterPage,
    showForgotPasswordForm,
    sendMessage,
    showResetPasswordForm,
    resetPassword,
};
