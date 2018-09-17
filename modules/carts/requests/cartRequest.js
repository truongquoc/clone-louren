const { check } = require('express-validator/check');
const validator = require('validator');

const buyProductWithoutLoginRequest = [
    check('name').trim()
        .not().isEmpty().withMessage('Tên không được bỏ trống'),
    check('email').trim()
        .not().isEmpty().withMessage('Email không được bỏ trống')
        .custom(value => validator.isEmail(value))
        .withMessage('Email không đúng định dạng'),
    check('address').trim()
        .not().isEmpty().withMessage('Địa chỉ không được bỏ trống'),
    check('telephone').trim()
        .not().isEmpty().withMessage('Số điện thoại không được bỏ trống')
        .custom(value => validator.isMobilePhone(value, ['vi-VN']))
        .withMessage('Số điện thoại không đúng định dạng'),
];

module.exports = {
    buyProductWithoutLoginRequest,
};
