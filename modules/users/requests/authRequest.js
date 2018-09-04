const { check } = require('express-validator/check');

const loginRequest = [
    check('email').not().isEmpty().withMessage('Email không được bỏ trống'),
    check('password').not().isEmpty().withMessage('Mật khẩu không được bỏ trống'),
];

const changePasswordRequest = [
    check('password').trim()
        .not().isEmpty().withMessage('Mật khẩu không được bỏ trống'),
    check('newPassword').trim()
        .not().isEmpty().withMessage('Mật khẩu mới không được bỏ trống'),
    check('passwordConfirmation').custom((value, { req }) => value === req.body.newPassword).withMessage('Xác thực mật khẩu không chính xác'),
];

module.exports = { loginRequest, changePasswordRequest };
