const imageHelper = require('../../helpers/imageHelper');
const storageHelper = require('../../helpers/storage/storageHelper');
const dateHelper = require('../../helpers/dateHelper');
const responseHelper = require('../../helpers/responseHelper');

const store = async (req, res) => {
    try {
        const image = await imageHelper.optimizeImage(req.file, {
            width: 750,
            quality: 75,
        });
        const location = await storageHelper.storage('s3').upload(`articles/details/${dateHelper.getSlugCurrentTime()}`, image, 'public-read');
        return res.json(responseHelper.success(location));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = { store };
