const { validationResult } = require('express-validator/check');

const BlogTagReponsitory = new (require('../repositories/blogTagRepositotiy'));
const ResponseHelper = require('../../../helpers/response.helper');
const PaginationHelper = require('../../../helpers/pagination.helper');


const index = async (req, res, next) => {
    try {
        const { query } = req;
        const blogTags = await BlogTagReponsitory.paginate({}, {
            pageUrl: req.baseUrl,
            query: query,
        });
        blogTags.renderPagination = PaginationHelper.renderPagination;

        return res.render('components/blogTags/admin/list', {
            blogTags,
            page: parseInt(query.page)
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
        const tag = await BlogTagReponsitory.store(data);

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
        const tag = await BlogTagReponsitory.update(data, req.params.id);
        return res.json(ResponseHelper.success(tag));

    } catch( e ) {
        return res.json(ResponseHelper.error(e.message));
    }
};

const destroy = async (req, res ) => {
    const { id } = req.params;

    try {
        await BlogTagReponsitory.delete({ _id: id });
        return res.json(ResponseHelper.success());

    } catch ( e ) {
        return res.json(ResponseHelper.error(e.message));
    }
};

module.exports = {
    index,
    store,
    update,
    destroy,
};