const { validationResult } = require('express-validator/check');
const BlogTagRepositoryClass = require('../repositories/BlogTagRepository');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');

const BlogTagRepository = new BlogTagRepositoryClass();

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const blogTags = await BlogTagRepository.paginate({}, {
            pageUrl: req.baseUrl,
            query,
        });
        blogTags.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/blogTags/admin/list', {
            blogTags, query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const store = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(responseHelper.error(errors.mapped(), 400));
    }
    try {
        const data = req.body;
        const tag = await BlogTagRepository.create(data);

        return res.json(responseHelper.success(tag));
    } catch (e) {
        return res.json(responseHelper.error(Element.message));
    }
};

const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(responseHelper.error(errors.mapped(), 400));
    }
    try {
        const data = req.body;
        const tag = await BlogTagRepository.update(data, req.params.id);

        return res.json(responseHelper.success(tag));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        await BlogTagRepository.delete(id);

        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    index, store, update, destroy,
};
