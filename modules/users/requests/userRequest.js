const { check } = require('express-validator/check');
const validator = require('validator');
const moment = require('moment');
const UserRepositoryClass = require('../repositories/UserRepository');

const UserRepository = new UserRepositoryClass();

const registerRequest = [
    check('name').trim()
        .not().isEmpty().withMessage('Tên không được bỏ trống'),
    check('email').trim()
        .not().isEmpty().withMessage('Email không được bỏ trống')
        .custom(value => (validator.isEmail(value)))
        .withMessage('Email không đúng định dạng')
        .custom(async (value) => {
            try {
                const user = await UserRepository.checkExistWithTrashed({
                    email: value,
                });
                if (user) {
                    throw new Error('Email đã tồn tại');
                }
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('password').trim()
        .not().isEmpty().withMessage('Mật khẩu không được bỏ trống'),
    check('passwordConfirmation')
        .not().isEmpty().withMessage('Xác thực mật khẩu không được bỏ trống')
        .custom((value, { req }) => (value === req.body.password))
        .withMessage('Xác thực mật khẩu không đúng'),
    check('telephone').trim()
        .not().isEmpty().withMessage('Số điện thoại không được bỏ trống')
        .custom(value => (validator.isMobilePhone(value, ['vi-VN'])))
        .withMessage('Số điện thoại không đúng định dạng'),
    check('gender')
        .not().isEmpty().withMessage('Giới tính không được bỏ trống')
        .isIn(['1', '2', '3'])
        .withMessage('Giới tính không hợp lệ'),
];

const editProfileRequest = [
    check('name').trim()
        .not().isEmpty().withMessage('Tên không được bỏ trống'),
    check('telephone').trim()
        .not().isEmpty().withMessage('Số điện thoại không được bỏ trống')
        .custom(value => (validator.isMobilePhone(value, ['vi-VN'])))
        .withMessage('Số điện thoại không đúng định dạng'),
    check('gender').not().isEmpty().withMessage('Giới tính không được bỏ trống')
        .isIn(['1', '2', '3'])
        .withMessage('Giới tính không hợp lệ'),
    check('birthday').trim()
        .not().isEmpty().withMessage('Ngày sinh không được bỏ trống')
        .custom(value => (moment(value, 'DD/MM/YYYY').isValid() && moment().year() - moment(value, 'DD/MM/YYYY').year() >= 18))
        .withMessage('Ngày sinh không hợp lệ'),
];

const editRequest = [
    check('name').trim()
        .not().isEmpty().withMessage('Tên không được bỏ trống'),
    check('email').trim()
        .not().isEmpty().withMessage('Email không được bỏ trống')
        .custom(value => (validator.isEmail(value)))
        .withMessage('Email không đúng định dạng')
        .custom(async (value, { req }) => {
            try {
                const user = await UserRepository.checkExistWithTrashed({
                    _id: { $ne: req.params.id },
                    email: value,
                });
                if (user) {
                    throw new Error('Email đã tồn tại');
                }
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('telephone').trim()
        .custom(value => (value ? validator.isMobilePhone(value, ['vi-VN']) : true))
        .withMessage('Số điện thoại không đúng định dạng'),
    check('roles').not().isEmpty().withMessage('Vai trò không được bỏ trống'),
    check('imagesQuantity').not().isEmpty().withMessage('Số lượng ảnh không được bỏ trống')
        .custom(value => (parseInt(value, 10) > 0)).withMessage('Số lượng không hợp lệ'),
];

module.exports = { registerRequest, editProfileRequest, editRequest };
