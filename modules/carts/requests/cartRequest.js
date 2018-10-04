const { check } = require('express-validator/check');
const validator = require('validator');

const buyProductRequest = [
    check('name').trim()
        .not().isEmpty().withMessage('validation.required'),
    check('email').trim()
        .not().isEmpty().withMessage('validation.required')
        .custom(value => validator.isEmail(value))
        .withMessage('Email không đúng định dạng'),
    check('address').trim()
        .not().isEmpty().withMessage('validation.required'),
    check('paymentMethod').trim()
        .not().isEmpty().withMessage('validation.required')
        .isIn(['cod', 'via-bank'])
        .withMessage('validation.not-valid'),
    check('telephone').trim()
        .not().isEmpty().withMessage('validation.required')
        .custom(value => validator.isMobilePhone(value, ['vi-VN']))
        .withMessage('validation.wrong-format'),
];

module.exports = {
    buyProductRequest,
};
