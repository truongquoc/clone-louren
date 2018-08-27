const { check } = require('express-validator/check');
const AreaRepositoryClass = require('../repositories/AreaRepository');

const AreaRepository = new AreaRepositoryClass();

function isPolygon(coordinates) {
    if (!coordinates.length) {
        throw new Error('Coordinate of area is not valid');
    }
    for (let j = 0; j < coordinates.length; j += 1) {
        const coordinate = coordinates[j];
        if (!coordinate[0] || coordinate[0] < -90 || coordinate[0] > 90) {
            throw new Error('Latitude of area is not valid');
        }
        if (!coordinate[1] || coordinate[1] < -180 || coordinate[1] > 180) {
            throw new Error('Longitude of area is not valid');
        }
    }
}

function isRectangle(coordinates) {
    if (!coordinates.north || coordinates.north < -90 || coordinates.north > 90) {
        throw new Error('North of area is not valid');
    }
    if (!coordinates.south || coordinates.south < -90 || coordinates.south > 90) {
        throw new Error('South of area is not valid');
    }
    if (!coordinates.east || coordinates.east < -180 || coordinates.east > 180) {
        throw new Error('East of area is not valid');
    }
    if (!coordinates.west || coordinates.west < -180 || coordinates.west > 180) {
        throw new Error('West of area is not valid');
    }
    return true;
}

const storeRequest = [
    check('areas').not().isEmpty().withMessage('Areas is required')
        .isArray().withMessage('Areas format is not valid')
        .custom((value) => {
            try {
                for (let i = 0; i < value.length; i += 1) {
                    if (!value[i].coordinates || !value[i].shape) {
                        throw new Error('Area is not valid');
                    }
                    if (value[i].shape === 1) {
                        isPolygon(value[i].coordinates);
                    } else if (value[i].shape === 2) {
                        isRectangle(value[i].coordinates);
                    } else {
                        throw new Error('Shape is not valid');
                    }
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('areas.*.shape').isNumeric().withMessage('Shape format is not valid'),
    check('areas.*.color').optional({ nullable: true }).isHexColor().withMessage('Color format is not valid'),
];

const updateRequest = [
    check('areas').not().isEmpty().withMessage('Areas is required')
        .isArray().withMessage('Areas format is not valid')
        .custom(async (value, { req }) => {
            try {
                const ids = [];
                for (let i = 0; i < value.length; i += 1) {
                    if (!value[i]._id || !value[i].coordinates || !value[i].shape) {
                        throw new Error('Area is not valid');
                    }
                    if (value[i].shape === 1) {
                        isPolygon(value[i].coordinates);
                    } else if (value[i].shape === 2) {
                        isRectangle(value[i].coordinates);
                    } else {
                        throw new Error('Shape is not valid');
                    }
                    ids.push(value[i]._id);
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
    check('areas.*.shape').isNumeric().withMessage('Shape format is not valid'),
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
