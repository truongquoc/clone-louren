const { check } = require('express-validator/check');
const PropertyConditionRepositoryClass = require('../repositories/PropertyConditionRepository');

const PropertyConditionRepository = new PropertyConditionRepositoryClass();

const createConditionRequest = [
    check('name').trim()
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
    check('icon')
        .not().isEmpty().withMessage('Icon không được bỏ trống'),
];

const editConditionRequest = [
    check('name').trim()
        .not().isEmpty().withMessage('Tên không được bỏ trống')
        .custom(async (value, { req }) => {
            try {
                const validate = await PropertyConditionRepository.checkExistWithTrashed({
                    _id: { $ne: req.params.id },
                    name: value,
                });
                if (validate) {
                    throw new Error('Tên đã được sử dụng hoặc bị xóa');
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('icon')
        .not().isEmpty().withMessage('Icon không được bỏ trống'),
];

module.exports = { createConditionRequest, editConditionRequest };
