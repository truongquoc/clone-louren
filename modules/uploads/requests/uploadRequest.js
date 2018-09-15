const { check } = require('express-validator/check');
const commonConstant = require('../../../constants/commonConstant');

const uploadImageRequest = [
    check('images').custom((value, { req }) => {
        try {
            if (req.files.length === 0) {
                throw new Error('Ảnh không được để trống');
            }
            req.files.forEach((image) => {
                if (commonConstant.imageTypes.indexOf(image.mimetype) < 0) {
                    throw new Error('Loại ảnh không hợp lệ');
                } else if (image.size > commonConstant.imageMaxsize) {
                    throw new Error('Kích thước ảnh quá lớn');
                }
            });
            return true;
        } catch (e) {
            return Promise.reject(e.message);
        }
    }),
];

module.exports = {
    uploadImageRequest,
};
