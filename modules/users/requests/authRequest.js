const { check } = require('express-validator/check');
const validator = require('validator');
const moment = require('moment');
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

const resetPasswordRequest = [
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

const clientForgotPasswordRequest = [
    check('method').trim().isIn(['1']).withMessage('Phương thức không hợp lệ'),
    check('email').trim()
        .custom(async (value, { req }) => {
            try {
                if (!value && req.body.method === '1') {
                    throw new Error('Email không được bỏ trống');
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
                if (!value && req.body.method === '2') {
                    throw new Error('Số điện thoại không được bỏ trống');
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

const clientRegisterRequest = [
    check('name').trim()
        .not().isEmpty().withMessage('Tên không được bỏ trống'),
    check('email').trim()
        .not().isEmpty().withMessage('Email không được bỏ trống')
        .custom(value => validator.isEmail(value))
        .withMessage('Email không đúng định dạng')
        .custom(async (value) => {
            try {
                const user = await AuthRepository.checkExistWithTrashed({
                    email: value,
                });
                if (user) {
                    throw new Error('Email đã tồn tại');
                }
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('password').trim()
        .not().isEmpty().withMessage('Mật khẩu không được bỏ trống'),
    check('passwordConfirmation')
        .not().isEmpty().withMessage('Xác thực mật khẩu không được bỏ trống')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Xác thực mật khẩu không đúng'),
    check('address').trim()
        .not().isEmpty().withMessage('Địa chỉ không được bỏ trống'),
    check('telephone').trim()
        .not().isEmpty().withMessage('Số điện thoại không được bỏ trống')
        .custom(value => validator.isMobilePhone(value, ['vi-VN']))
        .withMessage('Số điện thoại không đúng định dạng'),
    check('gender')
        .custom(value => (value ? ['1', '2', '3'].includes(value) : true))
        .withMessage('Giới tính không hợp lệ'),
    check('birthday').trim()
        .custom(value => (value ? (moment(value, 'DD/MM/YYYY').isValid() && moment().year() - moment(value, 'DD/MM/YYYY').year() >= 18) : true))
        .withMessage('Ngày sinh không hợp lệ'),
];

module.exports = {
    loginRequest,
    forgotPasswordRequest,
    clientForgotPasswordRequest,
    changePasswordRequest,
    resetPasswordRequest,
    clientRegisterRequest,
};
