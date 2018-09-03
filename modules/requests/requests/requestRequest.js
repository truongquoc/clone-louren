const { check } = require('express-validator/check');
const validator = require('validator');

const createRequestRequest = [
    check('name').not().isEmpty().withMessage('Tên không được bỏ trống'),
    check('email').not().isEmpty().withMessage('Email không được bỏ trống')
        .custom(value => (validator.isEmail(value)))
        .withMessage('Email không đúng định dạng'),
    check('telephone').not().isEmpty().withMessage('Số điện thoại không được bỏ trống')
        .custom(value => (validator.isMobilePhone(value, ['vi-VN'])))
        .withMessage('Số điện thoại không đúng định dạng'),
    check('title').trim().not().isEmpty()
        .withMessage('Tiêu đề không được bỏ trống'),
    check('content').trim().not().isEmpty()
        .withMessage('Nội dung không được bỏ trống')
        .custom(value => (validator.escape(value) === value))
        .withMessage('Nội dung không đúng định dạng'),
];

module.exports = {
    createRequestRequest,
};
