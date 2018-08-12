const { check } = require('express-validator/check');
const PropertyConditionRepositoryClass = require('../repositories/PropertyConditionRepository');

const PropertyConditionRepository = new PropertyConditionRepositoryClass();

const createConditionRequest = [
    check('name')
        .not().isEmpty().withMessage('Tên không được bỏ trống')
        .custom(async (value) => {
            try {
                const validate = await PropertyConditionRepository.checkExist({ name: value });
                if (validate) {
                    throw new Error('Tên đã được sử dụng');
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
];

const editConditionRequest = [
    check('name')
        .not().isEmpty().withMessage('Tên không được bỏ trống')
        .custom(async (value, { req }) => {
            try {
                const validate = await PropertyConditionRepository.checkExist({
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
];

module.exports = { createConditionRequest, editConditionRequest };
