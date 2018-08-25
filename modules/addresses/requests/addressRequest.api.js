const { check, oneOf } = require('express-validator/check');
const AddressRepositoryClass = require('../repositories/AddressRepository');

const AddressRepository = new AddressRepositoryClass();

const storeRequest = oneOf([
    check('addresses').not().isEmpty().withMessage('Addresses is required')
        .isArray().withMessage('Addresses format is not valid')
        .custom((value) => {
            try {
                for (let i = 0; i < value.length; i += 1) {
                    if (!value[i].lat || !value[i].lng) {
                        throw new Error('Coordinate of address is not valid');
                    }
                    if (value[i].lat < -90 || value[i].lat > 90) {
                        throw new Error('Latitude of address is not valid');
                    }
                    if (value[i].lng < -180 || value[i].lng > 180) {
                        throw new Error('Longitude of address is not valid');
                    }
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
]);

const updateRequest = [
    check('addresses').not().isEmpty().withMessage('Addresses is required')
        .isArray().withMessage('Addresses format is not valid')
        .custom(async (value, { req }) => {
            try {
                const ids = [];
                for (let i = 0; i < value.length; i += 1) {
                    if (!value[i].id || !value[i].lat || !value[i].lng) {
                        throw new Error('Coordinate of address is not valid');
                    }
                    if (value[i].lat < -90 || value[i].lat > 90) {
                        throw new Error('Latitude of address is not valid');
                    }
                    if (value[i].lng < -180 || value[i].lng > 180) {
                        throw new Error('Longitude of address is not valid');
                    }
                    ids.push(value[i].id);
                }
                const addresses = await AddressRepository.checkExistMany({
                    _id: { $in: ids },
                    propertyArticle: req.params.id,
                });
                if (addresses.length !== value.length) {
                    throw new Error('Addresses is not valid');
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
];

const destroyRequest = [
    check('addresses').not().isEmpty().withMessage('Addresses is required')
        .isArray().withMessage('Addresses format is not valid')
        .custom(async (value, { req }) => {
            try {
                const ids = [];
                for (let i = 0; i < value.length; i += 1) {
                    ids.push(value[i]);
                }
                const addresses = await AddressRepository.checkExistMany({
                    _id: { $in: ids },
                    propertyArticle: req.params.id,
                });
                if (addresses.length !== value.length) {
                    throw new Error('Addresses is not valid');
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
];

module.exports = {
    storeRequest,
    updateRequest,
    destroyRequest,
};
