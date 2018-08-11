const { check } = require('express-validator/check');
const getSlug = require('speakingurl');
const DistrictRepositoryClass = require('../repositories/DistrictRepository');

const DistrictRepository = new DistrictRepositoryClass();

const createDistrictRequest = [
    check('name')
        .not().isEmpty().withMessage('Tên không được bỏ trống')
        .custom(async (value) => {
            try {
                const validate = await DistrictRepository.checkExist({ name: value });
                if (validate) {
                    throw new Error('Tên đã được sử dụng');
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('city')
        .not().isEmpty().withMessage('Thành phố không được bỏ trống')
        .not().isIn([0]).withMessage('Thành phố không được bỏ trống'),
    check('slug')
        .custom(async (value) => {
            try {
                const validate = await DistrictRepository.checkExist({
                    slug: getSlug(value),
                });
                if (validate) {
                    throw new Error('Đường dẫn đã được sử dụng');
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
];

const editDistrictRequest = [
    check('name')
        .not().isEmpty().withMessage('Tên không được bỏ trống')
        .custom(async (value, { req }) => {
            try {
                const validate = await DistrictRepository.checkExist({
                    _id: { $ne: req.params.id },
                    name: value,
                });
                if (validate) {
                    throw new Error('Tên đã được sử dụng');
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('city')
        .not().isEmpty().withMessage('Thành phố không được bỏ trống')
        .not().isIn([0]).withMessage('Thành phố không được bỏ trống'),
    check('slug')
        .custom(async (value, { req }) => {
            try {
                const validate = await DistrictRepository.checkExist({
                    _id: { $ne: req.params.id },
                    slug: getSlug(value),
                });
                if (validate) {
                    throw new Error('Đường dẫn đã được sử dụng');
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
];

module.exports = { createDistrictRequest, editDistrictRequest };
