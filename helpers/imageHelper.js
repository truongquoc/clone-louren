const sharp = require('sharp');
const fs = require('fs');
const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink);

const optimizeImage = (file, image = {}) => {
    const data = fs.createReadStream(file.path);
    unlinkAsync(file.path);
    return data;
    // return sharp(readStream)
    //     .resize(image.width, image.height)
    //     .jpeg({
    //         quality: image.quality || 100,
    //     })
    //     .toBuffer();
};

module.exports = { optimizeImage };
