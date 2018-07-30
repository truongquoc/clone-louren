const { validationResult } = require('express-validator/check');
const BlogCategoryRepositoryClass = require('../repositories/BlogCategoryRepository');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');

const BlogCategoryRepository = new BlogCategoryRepositoryClass();

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const blogCategories = await BlogCategoryRepository.paginate({}, {
            pageUrl: req.baseUrl,
            query,
        });
        blogCategories.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/blogCategories/admin/list', {
            blogCategories,
            query,
        });
    } catch (e) {
        return next(responseHelper.error(e.message));
    }
};

const store = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(responseHelper.error(errors.mapped(), 400));
    }
    try {
        const data = req.body;
        const category = await BlogCategoryRepository.create(data);

        return res.json(responseHelper.success(category));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(responseHelper.error(errors.mapped(), 400));
    }
    try {
        const data = req.body;
        const category = await BlogCategoryRepository.update(data, req.params.id);

        return res.json(responseHelper.success(category));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        await BlogCategoryRepository.delete(id);

        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    index, store, update, destroy,
};
