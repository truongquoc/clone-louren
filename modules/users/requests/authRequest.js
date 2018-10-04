const { check } = require('express-validator/check');
const validator = require('validator');
const moment = require('moment');

const AuthRepositoryClass = require('../repositories/AuthRepository');

const AuthRepository = new AuthRepositoryClass();

const loginRequest = [
    check('email').trim().not().isEmpty().withMessage('validation.required'),
    check('password').trim().not().isEmpty().withMessage('validation.required'),
];

const changePasswordRequest = [
    check('password').trim()
        .not().isEmpty().withMessage('Mật khẩu không được bỏ trống'),
    check('newPassword').trim()
        .not().isEmpty().withMessage('Mật khẩu mới không được bỏ trống'),
    check('passwordConfirmation').custom((value, { req }) => value === req.body.newPassword).withMessage('Xác thực mật khẩu không chính xác'),
];

const resetPasswordRequest = [
    check('newPassword').trim().not().isEmpty().withMessage('validation.required'),
    check('passwordConfirmation').custom((value, { req }) => value === req.body.newPassword)
        .withMessage('validation.not-valid'),
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

const clientForgotPasswordRequest = [
    check('method').trim().isIn(['1']).withMessage('validation.not-valid'),
    check('email').trim()
        .custom(async (value, { req }) => {
            try {
                if (!value && req.body.method === '1') {
                    throw new Error('validation.required');
                }
                if (value) {
                    const user = await AuthRepository.checkExist({ email: value });
                    if (!user) {
                        throw new Error('validation.account-not-exist');
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
                if (!value && req.body.method === '2') {
                    throw new Error('validation.required');
                }
                if (value) {
                    const user = await AuthRepository.checkExist({ telephone: value });
                    if (!user) {
                        throw new Error('validation.account-not-exist');
                    }
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
];

const clientRegisterRequest = [
    check('name').trim()
        .not().isEmpty().withMessage('validation.required'),
    check('email').trim()
        .not().isEmpty().withMessage('validation.required')
        .custom(value => validator.isEmail(value))
        .withMessage('validation.wrong-format')
        .custom(async (value) => {
            try {
                const user = await AuthRepository.checkExistWithTrashed({
                    email: value,
                });
                if (user) {
                    throw new Error('validation.exist');
                }
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('password').trim()
        .not().isEmpty().withMessage('validation.required'),
    check('passwordConfirmation')
        .not().isEmpty().withMessage('validation.required')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('validation.not-valid'),
    check('address').trim()
        .not().isEmpty().withMessage('validation.required'),
    check('telephone').trim()
        .not().isEmpty().withMessage('validation.required')
        .custom(value => validator.isMobilePhone(value, ['vi-VN']))
        .withMessage('validation.wrong-format'),
    check('gender')
        .custom(value => (value ? ['1', '2', '3'].includes(value) : true))
        .withMessage('validation.not-valid'),
    check('birthday').trim()
        .custom(value => (value ? (moment(value, 'DD/MM/YYYY').isValid() && moment().year() - moment(value, 'DD/MM/YYYY').year() >= 18) : true))
        .withMessage('validation.not-valid'),
];

module.exports = {
    loginRequest,
    forgotPasswordRequest,
    clientForgotPasswordRequest,
    changePasswordRequest,
    resetPasswordRequest,
    clientRegisterRequest,
};
