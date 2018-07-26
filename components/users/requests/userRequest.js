const { check } = require('express-validator/check');

const UserRepository = new (require('../repositories/userRepository'))();

const registerRequest = [
    check('name').not().isEmpty().withMessage('Tên không được bỏ trống'),
    check('email')
        .not().isEmpty().withMessage('Email không được bỏ trống')
        .custom(async value => {
            const user = await UserRepository.getDetailByEmail(value);
            if (user) {
                return Promise.reject('Email đã tồn tại');
            }
        }),
    check('password')
        .not().isEmpty().withMessage('Mật khẩu không được bỏ trống'),
    check('password_confirmation')
        .not().isEmpty().withMessage('Xác thực mật khẩu không được bỏ trống')
        .custom((value, { req }) => (value === req.body.password)).withMessage('Xác thực mật khẩu không đúng'),
    check('telephone')
        .not().isEmpty().withMessage('Số điện thoại không được bỏ trống'),
    check('gender')
        .not().isEmpty().withMessage('Giới tính không được bỏ trống')
        .isIn(['1', '2', '3']).withMessage('Giới tính không hợp lệ'),
];

module.exports = { registerRequest };