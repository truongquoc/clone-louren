const { validationResult } = require('express-validator/check');
const url = require('url');
const getSlug = require('speakingurl');
const roleHelper = require('../../../helpers/roleHelper');
const paginationHelper = require('../../../helpers/paginationHelper');
const responseHelper = require('../../../helpers/responseHelper');
const imageHelper = require('../../../helpers/imageHelper');
const dateHelper = require('../../../helpers/dateHelper');
const storageHelper = require('../../../helpers/storage/storageHelper');
const ProductRepositoryClass = require('../repositories/ProductRepository');
const ProductTypeRepositoryClass = require('../../productTypes/repositories/ProductTypeRepository');
const UploadRepositoryClass = require('../../uploads/repositories/UploadRepository');

const ProductRepository = new ProductRepositoryClass();
const ProductTypeRepository = new ProductTypeRepositoryClass();
const UploadRepository = new UploadRepositoryClass();

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const products = await ProductRepository.adminList(undefined, {
            query,
            pageUrl: req.baseUrl,
        });
        products.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/products/admin/list', {
            products, query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const showMyProducts = async (req, res, next) => {
    try {
        const { query } = req;
        const products = await ProductRepository.adminList(req.session.cUser._id, {
            query,
            pageUrl: url.parse(req.originalUrl).pathname,
        });
        products.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/products/admin/me', {
            products, query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const create = async (req, res, next) => {
    const { query } = req;
    try {
        const images = await UploadRepository.list(undefined, 1, {
            query,
            pageUrl: url.parse(req.originalUrl).pathname,
            limit: 20,
        });
        images.renderPagination = paginationHelper.renderPagination;
        if (req.xhr) {
            return res.render('modules/products/admin/ajax/pickImages', {
                images,
                query,
            });
        }
        const productTypes = await ProductTypeRepository.baseGet();

        return res.render('modules/products/admin/create', {
            productTypes,
            images,
            query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const store = async (req, res, next) => {
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        imageHelper.deleteImage(req.file, false);
        req.flash('oldValue', data);
        req.flash('errors', errors.mapped());
        return res.redirectBack();
    }
    data.createdTime = req.attributes.createdTime;
    try {
        if (req.file) {
            const image = await imageHelper.optimizeImage(req.file, {
                width: 500,
                quality: 75,
            });
            data.image = await storageHelper.storage('local').upload(`products/${dateHelper.getSlugCurrentTime()}.jpg`, image, 'public-read');
        }
        await ProductRepository.create(data, req.session.cUser);
        req.flash('success', 'Tạo sản phẩm thành công');

        return res.redirect('/admin/products');
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const edit = async (req, res, next) => {
    const { query } = req;
    try {
        const images = await UploadRepository.list(undefined, 1, {
            query,
            pageUrl: url.parse(req.originalUrl).pathname,
            limit: 20,
        });
        images.renderPagination = paginationHelper.renderPagination;
        if (req.xhr) {
            return res.render('modules/products/admin/ajax/pickImages', {
                images,
                query,
            });
        }
        const [product, productTypes] = await Promise.all([
            ProductRepository.getEditArticle(req.params.slug),
            ProductTypeRepository.baseGet(),
        ]);
        return res.render('modules/products/admin/edit', {
            productTypes,
            product,
            images,
            query,
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
    data.createdTime = req.attributes.createdTime;
    try {
        if (req.file) {
            const image = await imageHelper.optimizeImage(req.file, {
                width: 500,
                quality: 75,
            });
            data.image = await storageHelper.storage('local').upload(`products/${dateHelper.getSlugCurrentTime()}.jpg`, image, 'public-read');
        }
        await ProductRepository.update(data, req.params.id);
        req.flash('success', 'Chỉnh sửa sản phẩm thành công');

        return res.redirect(`/admin/products/edit/${getSlug(`${data.name || data.slug}-${data.createdTime}`)}`);
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const approve = async (req, res) => {
    try {
        const product = await ProductRepository.approve(req.params.id);

        return res.json(responseHelper.success(product));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        await ProductRepository.deleteById(id);

        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const listImages = async (req, res, next) => {
    try {
        const product = await ProductRepository.getEditArticle(req.params.slug);

        return res.render('modules/products/admin/listImages', {
            product,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const changeImageOrder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(responseHelper.error(errors.mapped(), 400));
    }
    try {
        const { images } = req.body;
        await ProductRepository.changeImageOrder(images, req.params.id);
        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    index,
    showMyProducts,
    create,
    store,
    edit,
    update,
    approve,
    destroy,
    listImages,
    changeImageOrder,
};
