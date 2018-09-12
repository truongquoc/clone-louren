const sharp = require('sharp');
const fs = require('fs');
const { promisify } = require('util');
const { imageWidth, imageHeight, imageQuality } = require('../constants/commonConstant');

const unlinkAsync = promisify(fs.unlink);

const deleteImage = (file, hasTmp = true) => {
    if (file) {
        if (!file.length) {
            file = [file];
        }
        for (let i = 0; i < file.length; i += 1) {
            unlinkAsync(file[i].path);
            if (hasTmp) {
                unlinkAsync(`${file[i].path}-tmp`);
            }
        }
    }
};

const optimizeImage = async (file, image = {}) => {
    await sharp(file.path)
        .resize(image.width || imageWidth, image.height || imageHeight)
        .jpeg({ quality: image.quality || imageQuality })
        .toFile(`${file.path}-tmp`);
    const data = fs.createReadStream(`${file.path}-tmp`);
    deleteImage(file);
    return data;
};

const getOriginalImage = (file, deleteFile = true) => {
    const image = fs.createReadStream(`${file.path}`);
    if (deleteFile) {
        deleteImage(file, false);
    }
    return image;
};

module.exports = {
    deleteImage,
    optimizeImage,
    getOriginalImage,
};
