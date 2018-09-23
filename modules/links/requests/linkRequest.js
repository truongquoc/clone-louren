const { check } = require('express-validator/check');
const validator = require('validator');

module.exports = {
    create: [
        check('title')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Tiêu đề không được rỗng'),
        check('url')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Đường dẫn không được rỗng')
            .custom(value => validator.isURL(value, {
                require_protocol: false,
                require_host: false,
            }))
            .withMessage('Đường dẫn không đúng định dạng'),
    ],
};
