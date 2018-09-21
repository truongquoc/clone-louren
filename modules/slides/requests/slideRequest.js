const { check } = require('express-validator/check');
const commonConstant = require('../../../constants/commonConstant');

const createSlideRequest = [
    check('image').custom((value, { req }) => {
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

const editSlideRequest = [
    check('image').custom((value, { req }) => {
        try {
            if (!req.file && !req.body.imageUrl) {
                throw new Error('Ảnh không được bỏ trống');
            }
            if (req.file) {
                if (commonConstant.imageTypes.indexOf(req.file.mimetype) < 0) {
                    throw new Error('Loại ảnh không hợp lệ');
                } else if (req.file.size > commonConstant.imageMaxsize) {
                    throw new Error('Kích thước ảnh quá lớn');
                }
            }
            return true;
        } catch (e) {
            return Promise.reject(e.message);
        }
    }).withMessage('Ảnh hoặc video không được bỏ trống'),
];

module.exports = {
    createSlideRequest,
    editSlideRequest,
};
