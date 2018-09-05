const { check } = require('express-validator/check');
const AuthRepositoryClass = require('../repositories/AuthRepository');

const AuthRepository = new AuthRepositoryClass();

const loginRequest = [
    check('email').trim().not().isEmpty().withMessage('Email không được bỏ trống'),
    check('password').trim().not().isEmpty().withMessage('Mật khẩu không được bỏ trống'),
];

const changePasswordRequest = [
    check('password').trim()
        .not().isEmpty().withMessage('Mật khẩu không được bỏ trống'),
    check('newPassword').trim()
        .not().isEmpty().withMessage('Mật khẩu mới không được bỏ trống'),
    check('passwordConfirmation').custom((value, { req }) => value === req.body.newPassword).withMessage('Xác thực mật khẩu không chính xác'),
];

const forgotPasswordRequest = [
    check('email').trim()
        .custom(async (value, { req }) => {
            try {
                if (!value && !req.body.telephone) {
                    throw new Error('Email hoặc số điện thoại không được bỏ trống');
                }
                if (value) {
                    const user = await AuthRepository.checkExist({ email: value });
                    if (!user) {
                        throw new Error('Không tìm thấy tài khoản');
                    }
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('telephone').trim()
        .custom(async (value, { req }) => {
            try {
                if (!value && !req.body.email) {
                    throw new Error('Email hoặc số điện thoại không được bỏ trống');
                }
                if (value) {
                    const user = await AuthRepository.checkExist({ telephone: value });
                    if (!user) {
                        throw new Error('Không tìm thấy tài khoản');
                    }
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
];

const resetPasswordRequest = changePasswordRequest.splice(1);

module.exports = {
    loginRequest,
    changePasswordRequest,
    forgotPasswordRequest,
    resetPasswordRequest,
};
