const { check } = require('express-validator/check');

const loginRequest = [
    check('email').not().isEmpty().withMessage('Email không được bỏ trống'),
    check('password').not().isEmpty().withMessage('Mật khẩu không được bỏ trống')
];

module.exports = { loginRequest };