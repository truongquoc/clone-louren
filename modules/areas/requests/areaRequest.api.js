const { check } = require('express-validator/check');
const responseHelper = require('../../../helpers/responseHelper');
const AreaRepositoryClass = require('../repositories/AreaRepository');

const AreaRepository = new AreaRepositoryClass();

const storeRequest = [
    check('areas').not().isEmpty().withMessage('Areas is required')
        .isArray().withMessage('Areas format is not valid')
        .custom((value) => {
            try {
                for (let i = 0; i < value.length; i += 1) {
                    if (!value[i].coordinates || !value[i].coordinates.length) {
                        throw new Error('Coordinate of area is not valid');
                    }
                    for (let j = 0; j < value[i].coordinates.length; j += 1) {
                        if (!value[i].coordinates[j][0] || !value[i].coordinates[j][1]) {
                            throw new Error('Coordinate of area is not valid');
                        }
                        if (value[i].coordinates[j][0] < -90 || value[i].coordinates[j][0] > 90) {
                            throw new Error('Latitude of area is not valid');
                        }
                        if (value[i].coordinates[j][1] < -180 || value[i].coordinates[j][1] > 180) {
                            throw new Error('Longitude of area is not valid');
                        }
                    }
                }
                return true;
            } catch (e) {
                return Promise.reject(responseHelper.error(e.message, 400));
            }
        }),
    check('areas.*.color').optional({ nullable: true }).isHexColor().withMessage('Color format is not valid'),
];

const updateRequest = [
    check('areas').not().isEmpty().withMessage('Areas is required')
        .isArray().withMessage('Areas format is not valid')
        .custom(async (value, { req }) => {
            try {
                const ids = [];
                for (let i = 0; i < value.length; i += 1) {
                    if (!value[i].coordinates || !value[i].coordinates.length) {
                        throw new Error('Coordinate of area is not valid');
                    }
                    for (let j = 0; j < value[i].coordinates.length; j += 1) {
                        if (!value[i].coordinates[j][0] || !value[i].coordinates[j][1]) {
                            throw new Error('Coordinate of area is not valid');
                        }
                        if (value[i].coordinates[j][0] < -90 || value[i].coordinates[j][0] > 90) {
                            throw new Error('Latitude of area is not valid');
                        }
                        if (value[i].coordinates[j][1] < -180 || value[i].coordinates[j][1] > 180) {
                            throw new Error('Longitude of area is not valid');
                        }
                    }
                    ids.push(value[i].id);
                }
                const areas = await AreaRepository.checkExistMany({
                    _id: { $in: ids },
                    propertyArticle: req.params.id,
                });
                if (areas.length !== value.length) {
                    throw new Error('Areas is not valid');
                }
                return true;
            } catch (e) {
                return Promise.reject(responseHelper.error(e.message, 400));
            }
        }),
    check('areas.*.color').optional({ nullable: true }).isHexColor().withMessage('Color format is not valid'),
];

const destroyRequest = [
    check('areas').not().isEmpty().withMessage('Areas is required')
        .isArray().withMessage('Areas format is not valid')
        .custom(async (value, { req }) => {
            try {
                const ids = [];
                for (let i = 0; i < value.length; i += 1) {
                    ids.push(value[i]);
                }
                const areas = await AreaRepository.checkExistMany({
                    _id: { $in: ids },
                    propertyArticle: req.params.id,
                });
                if (areas.length !== value.length) {
                    throw new Error('Areas is not valid');
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
