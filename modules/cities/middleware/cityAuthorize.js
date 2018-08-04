const responseHelper = require('../../../helpers/responseHelper');
const CityRepositoryClass = require('../repositories/CityRepository');

const CityRepository = new CityRepositoryClass();

const indexAuthorize = (req, res, next) => {
    next();
};

const editAuthorize = async (req, res, next) => {
    const { id } = req.params;
    try {
        const check = await CityRepository.checkExist({ _id: id });
        // Authorize user
        if (!check) {
            return res.json(responseHelper.notFound());
        }
        next();
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = { indexAuthorize, editAuthorize };
