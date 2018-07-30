const { check } = require('express-validator/check');
const UserRepositoryClass = require('../repositories/UserRepository');

const UserRepository = new UserRepositoryClass();

const registerRequest = [
    check('name').not().isEmpty().withMessage('Tên không được bỏ trống'),
    check('email')
        .not().isEmpty().withMessage('Email không được bỏ trống')
        .custom(async (value) => {
            try {
                const user = await UserRepository.checkExistWithTrashed(value);
                if (user) {
                    throw new Error('Email đã tồn tại');
                }
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('password')
        .not().isEmpty().withMessage('Mật khẩu không được bỏ trống'),
    check('password_confirmation')
        .not().isEmpty().withMessage('Xác thực mật khẩu không được bỏ trống')
        .custom((value, { req }) => (value === req.body.password))
        .withMessage('Xác thực mật khẩu không đúng'),
    check('telephone')
        .not().isEmpty().withMessage('Số điện thoại không được bỏ trống'),
    check('gender')
        .not().isEmpty().withMessage('Giới tính không được bỏ trống')
        .isIn(['1', '2', '3'])
        .withMessage('Giới tính không hợp lệ'),
];

module.exports = { registerRequest };
