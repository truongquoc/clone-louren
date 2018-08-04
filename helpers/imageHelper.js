const sharp = require('sharp');
const fs = require('fs');
const { promisify } = require('util');
const { imageWidth, imageHeight, imageQuality } = require('../constants/commonConstant');

const unlinkAsync = promisify(fs.unlink);

const optimizeImage = async (file, image = {}) => {
    await sharp(file.path)
        .resize(image.width || imageWidth, image.height || imageHeight)
        .jpeg({ quality: image.quality || imageQuality })
        .toFile(`${file.path}-tmp`);
    const data = fs.createReadStream(`${file.path}-tmp`);
    unlinkAsync(file.path);
    unlinkAsync(`${file.path}-tmp`);
    return data;
};

module.exports = { optimizeImage };
