const { check } = require('express-validator/check');
const getSlug = require('speakingurl');
const CityRepositoryClass = require('../repositories/CityRepository');

const CityRepository = new CityRepositoryClass();

const createCityRequest = [
    check('name')
        .not().isEmpty().withMessage('Tên không được bỏ trống')
        .custom(async (value) => {
            try {
                const validate = await CityRepository.checkExist({ name: value });
                if (validate) {
                    throw new Error('Tên đã được sử dụng');
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('slug')
        .custom(async (value) => {
            try {
                const validate = await CityRepository.checkExist({
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

const editCityRequest = [
    check('name')
        .not().isEmpty().withMessage('Tên không được bỏ trống')
        .custom(async (value, { req }) => {
            try {
                const validate = await CityRepository.checkExist({
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
    check('slug')
        .custom(async (value, { req }) => {
            try {
                const validate = await CityRepository.checkExist({
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

module.exports = { createCityRequest, editCityRequest };