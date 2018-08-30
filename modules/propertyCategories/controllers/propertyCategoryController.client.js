const url = require('url');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');
const PropertyCategoryRepositoryClass = require('../repositories/PropertyCategoryRepository');
const PropertyArticleRepositoryClass = require('../../propertyArticles/repositories/PropertyArticleRepository');

const PropertyCategoryRepository = new PropertyCategoryRepositoryClass();
const PropertyArticleRepository = new PropertyArticleRepositoryClass();

const index = async (req, res, next) => {
    const { query } = req;
    try {
        const propertyCategory = await PropertyCategoryRepository.checkExistBySlug(req.params.slug);
        const propertyArticles = await PropertyArticleRepository.clientList({
            id: propertyCategory._id,
            type: 'category',
        }, { pageUrl: url.parse(req.originalUrl).pathname, query });
        propertyArticles.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/propertyCategories/client/list', {
            propertyCategory, propertyArticles, query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = { index };
