const { validationResult } = require('express-validator/check');
const responseHelper = require('../../../helpers/responseHelper');
const storageHelper = require('../../../helpers/storage/storageHelper');
const dateHelper = require('../../../helpers/dateHelper');
const imageHelper = require('../../../helpers/imageHelper');
const SlideRepositoryClass = require('../repositories/SlideRepository');

const SlideRepository = new SlideRepositoryClass();

const index = async (req, res, next) => {
    const { query } = req;
    try {
        const slides = await SlideRepository.list(query);

        return res.render('modules/slides/admin/list', {
            slides,
            query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const create = (req, res) => res.render('modules/slides/admin/create');

const store = async (req, res, next) => {
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        imageHelper.deleteImage(req.file, false);
        req.flash('oldValue', data);
        req.flash('errors', errors.mapped());
        return res.redirectBack();
    }
    try {
        const image = await imageHelper.optimizeImage(req.file, {
            width: 1920,
            quality: 65,
        });
        data.image = await storageHelper.storage('s3').upload(`articles/${dateHelper.getSlugCurrentTime()}.jpg`, image, 'public-read');
        await SlideRepository.create(data, req.session.cUser);
        req.flash('success', 'Đăng ảnh slide thành công');

        return res.redirect('/admin/slides');
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const edit = async (req, res, next) => {
    try {
        const slide = await SlideRepository.getById(req.params.id);

        return res.render('modules/slides/admin/edit', {
            slide,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const update = async (req, res, next) => {
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        imageHelper.deleteImage(req.file, false);
        req.flash('oldValue', data);
        req.flash('errors', errors.mapped());
        return res.redirectBack();
    }
    try {
        if (req.file) {
            const image = await imageHelper.optimizeImage(req.file, {
                width: 1920,
                quality: 65,
            });
            data.image = await storageHelper.storage('s3').upload(`articles/${dateHelper.getSlugCurrentTime()}.jpg`, image, 'public-read');
        }
        await SlideRepository.update(data, req.params.id);
        req.flash('success', 'Đăng ảnh slide thành công');

        return res.redirect('/admin/slides');
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const changeOrder = async (req, res) => {
    const { ids } = req.body;
    try {
        await SlideRepository.changeOrder(ids);

        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        await SlideRepository.deleteById(id);

        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    changeOrder,
    destroy,
};
