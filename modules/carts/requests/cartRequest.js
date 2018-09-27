const { check } = require('express-validator/check');
const validator = require('validator');

const buyProductRequest = [
    check('name').trim()
        .not().isEmpty().withMessage('Tên không được bỏ trống'),
    check('email').trim()
        .not().isEmpty().withMessage('Email không được bỏ trống')
        .custom(value => validator.isEmail(value))
        .withMessage('Email không đúng định dạng'),
    check('address').trim()
        .not().isEmpty().withMessage('Địa chỉ không được bỏ trống'),
    check('paymentMethod').trim()
        .not().isEmpty().withMessage('Hình thức thanh toán không được bỏ trống')
        .isIn(['cod', 'via-bank'])
        .withMessage('Hình thức thanh toán không hợp lệ'),
    check('telephone').trim()
        .not().isEmpty().withMessage('Số điện thoại không được bỏ trống')
        .custom(value => validator.isMobilePhone(value, ['vi-VN']))
        .withMessage('Số điện thoại không đúng định dạng'),
];

module.exports = {
    buyProductRequest,
};
