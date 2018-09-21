const { check } = require('express-validator/check');
const validator = require('validator');

module.exports = {
    create: [
        check('title').not().isEmpty().withMessage('Tên Website không được rỗng'),
        check('deputy').withMessage('Tên đại diện không hợp lệ').custom((value) => {
            if (value) {
                return /\d/g.test(value);
            }

            return true;
        }),
        check('tax', 'Mã số thuế không hợp lệ').custom((value) => {
            if (value) {
                return /\d/.test(value);
            }

            return true;
        }),
        check('phone', 'Số điện thoại không hợp lệ').custom((value) => {
            if (value) {
                return /^[^0-9. ]{10,12}$/.test(value);
            }

            return true;
        }),
        check('fax', 'Số điện thoại không hợp lệ').custom((value) => {
            if (value) {
                return /^[^0-9. ]{10,12}$/.test(value);
            }

            return true;
        }),
        check('email', 'Email Không hợp lệ').custom((value) => {
            if (value) {
                return validator.isEmail(value);
            }

            return true;
        }),
        check('security', 'Email Không hợp lệ').custom((value) => {
            if (value) {
                return validator.isEmail(value);
            }

            return true;
        }),
    ],
};
