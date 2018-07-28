const { validationResult } = require('express-validator/check');

const BlogTagRepository = new (require('../repositories/blogTagRepository'))();
const ResponseHelper = require('../../../helpers/response.helper');
const PaginationHelper = require('../../../helpers/pagination.helper');


const index = async (req, res, next) => {
    try {
        const { query } = req;
        const blogTags = await BlogTagRepository.paginate({}, {
            pageUrl: req.baseUrl,
            query: query,
        });
        blogTags.renderPagination = PaginationHelper.renderPagination;

        return res.render('components/blogTags/admin/list', {
            blogTags,
            query: query
        });
    } catch (e) {
        next(ResponseHelper.error(e.message));
    }
};

const store = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.json(ResponseHelper.error(errors.mapped(),400));
    }
    try {
        const data = req.body;
        const tag = await BlogTagRepository.create(data);

        return res.json(ResponseHelper.success(tag));
    } catch (e) {
        return res.json(ResponseHelper.error(Element.message));
    }
};

const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(ResponseHelper.error(errors.mapped(), 400));
    }
    try {
        const data = req.body;
        const tag = await BlogTagRepository.update(data, req.params.id);

        return res.json(ResponseHelper.success(tag));
    } catch (e) {
        return res.json(ResponseHelper.error(e.message));
    }
};

const destroy = async (req, res ) => {
    const { id } = req.params;
    try {
        await BlogTagRepository.delete(id);

        return res.json(ResponseHelper.success());
    } catch (e) {
        return res.json(ResponseHelper.error(e.message));
    }
};

module.exports = { index, store, update, destroy };
