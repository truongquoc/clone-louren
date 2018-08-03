const sharp = require('sharp');
const fs = require('fs');

const optimizeImage = (file, image = {}) => {
    return fs.createReadStream(file.path);
    // return sharp(readStream)
    //     .resize(image.width, image.height)
    //     .jpeg({
    //         quality: image.quality || 100,
    //     })
    //     .toBuffer();
};

module.exports = { optimizeImage };
