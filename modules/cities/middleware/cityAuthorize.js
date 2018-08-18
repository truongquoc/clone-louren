const responseHelper = require('../../../helpers/responseHelper');
const roleHelper = require('../../../helpers/roleHelper');
const CityRepositoryClass = require('../repositories/CityRepository');

const CityRepository = new CityRepositoryClass();

const indexAuthorize = (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Property Manager'])) {
        return req.xhr ? res.json(responseHelper.notAuthorized())
            : next(responseHelper.notAuthorized());
    }
    next();
};

const editAuthorize = async (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Property Manager'])) {
        return res.json(responseHelper.notAuthorized());
    }
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
