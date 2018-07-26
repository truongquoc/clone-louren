const { validationResult } = require('express-validator/check');

const BlogCategoryRepository = new (require('../repositories/blogCategoryRepository'))();
const ResponseHelper = require('../../../helpers/response.helper');
const PaginationHelper = require('../../../helpers/pagination.helper');

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const blogCategories = await BlogCategoryRepository.paginate({}, {
            pageUrl: req.baseUrl,
            query: query
        });
        blogCategories.renderPagination = PaginationHelper.renderPagination;

        return res.render('components/blogCategories/admin/list', {
            blogCategories,
            page: parseInt(query.page)
        });
    } catch (e) {
        next(ResponseHelper.error(e.message));
    }
};

const store = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(ResponseHelper.error(errors.mapped(), 400));
    }
    try {
        const data = req.body;
        const category = await BlogCategoryRepository.create(data);

        return res.json(ResponseHelper.success(category));
    } catch (e) {
        return res.json(ResponseHelper.error(e.message));
    }
};

const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(ResponseHelper.error(errors.mapped(), 400));
    }
    try {
        const data = req.body;
        const category = await BlogCategoryRepository.update(data, req.params.id);

        return res.json(ResponseHelper.success(category));
    } catch (e) {
        return res.json(ResponseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        await BlogCategoryRepository.delete({ _id: id });

        return res.json(ResponseHelper.success());
    } catch (e) {
        return res.json(ResponseHelper.error(e.message));
    }
};

module.exports = { index, store, update, destroy };
