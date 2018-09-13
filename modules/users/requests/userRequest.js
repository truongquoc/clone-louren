const { check } = require('express-validator/check');
const validator = require('validator');
const moment = require('moment');
const commonConstant = require('../../../constants/commonConstant');
const UserRepositoryClass = require('../repositories/UserRepository');

const UserRepository = new UserRepositoryClass();

const registerRequest = [
    check('name').trim()
        .not().isEmpty().withMessage('Tên không được bỏ trống'),
    check('email').trim()
        .not().isEmpty().withMessage('Email không được bỏ trống')
        .custom(value => validator.isEmail(value))
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
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Xác thực mật khẩu không đúng'),
    check('telephone').trim()
        .not().isEmpty().withMessage('Số điện thoại không được bỏ trống')
        .custom(value => validator.isMobilePhone(value, ['vi-VN']))
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
        .custom(value => validator.isMobilePhone(value, ['vi-VN']))
        .withMessage('Số điện thoại không đúng định dạng'),
    check('gender').not().isEmpty().withMessage('Giới tính không được bỏ trống')
        .isIn(['1', '2', '3'])
        .withMessage('Giới tính không hợp lệ'),
    check('birthday').trim()
        .not().isEmpty().withMessage('Ngày sinh không được bỏ trống')
        .custom(value => moment(value, 'DD/MM/YYYY').isValid() && moment().year() - moment(value, 'DD/MM/YYYY').year() >= 18)
        .withMessage('Ngày sinh không hợp lệ'),
];

const editRequest = [
    check('name').trim()
        .not().isEmpty().withMessage('Tên không được bỏ trống'),
    check('email').trim()
        .not().isEmpty().withMessage('Email không được bỏ trống')
        .custom(value => validator.isEmail(value))
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
    check('roles').custom((value, { req }) => {
        if (req.params.id === req.session.cUser._id) {
            return true;
        }
        return value && value.length;
    }).withMessage('Vai trò không được bỏ trống'),
];

const clientEditProfileRequest = editProfileRequest.concat(
    check('email').trim()
        .custom(async (value, { req }) => {
            try {
                if (!req.session.cUser.email) {
                    if (!value) {
                        throw new Error('Email không được bỏ trống');
                    }
                    if (!validator.isEmail(value)) {
                        throw new Error('Email không đúng định dạng');
                    }
                    const user = await UserRepository.checkExistWithTrashed({ email: value });
                    if (user) {
                        throw new Error('Email đã tồn tại');
                    }
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
);

const uploadAvatar = [
    check('avatar').custom((value, { req }) => {
        try {
            if (!req.file) {
                throw new Error('Ảnh không được bỏ trống');
            }
            if (commonConstant.imageTypes.indexOf(req.file.mimetype) < 0) {
                throw new Error('Loại ảnh không hợp lệ');
            } else if (req.file.size > commonConstant.imageMaxsize) {
                throw new Error('Kích thước ảnh quá lớn');
            }
            return true;
        } catch (e) {
            return Promise.reject(e.message);
        }
    }),
];

module.exports = {
    registerRequest,
    editProfileRequest,
    editRequest,
    clientEditProfileRequest,
    uploadAvatar,
};
