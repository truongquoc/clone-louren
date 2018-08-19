const responseHelper = require('../../../helpers/responseHelper');
const PropertyArticleRepositoryClass = require('../repositories/PropertyArticleRepository');

const PropertyArticleRepository = new PropertyArticleRepositoryClass();

const search = async (req, res, next) => {
    const { query } = req;
    try {
        const propertyArticles = await PropertyArticleRepository.search(query);
        console.log(propertyArticles);
        return res.render('modules/propertyArticles/client/list');
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = {
    search,
};
