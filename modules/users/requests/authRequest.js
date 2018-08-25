const { check } = require('express-validator/check');

const loginRequest = [
    check('email').not().isEmpty().withMessage('Email không được bỏ trống'),
    check('password').not().isEmpty().withMessage('Mật khẩu không được bỏ trống'),
];

const changePasswordRequest = [
    check('password').not().isEmpty(),
    check('newPassword').not().isEmpty(),
    check('passwordConfirmation').custom((value, { req }) => value === req.body.newPassword).withMessage('Xác thực password không chính xác'),
];

module.exports = { loginRequest, changePasswordRequest };
