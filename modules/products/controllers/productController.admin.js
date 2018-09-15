const { validationResult } = require('express-validator/check');
const url = require('url');
const getSlug = require('speakingurl');
const ProductRepositoryClass = require('../repositories/ProductRepository');
const ProductTypeRepositoryClass = require('../../productTypes/repositories/ProductTypeRepository');
const paginationHelper = require('../../../helpers/paginationHelper');
const responseHelper = require('../../../helpers/responseHelper');
const imageHelper = require('../../../helpers/imageHelper');
const dateHelper = require('../../../helpers/dateHelper');
const storageHelper = require('../../../helpers/storage/storageHelper');

const ProductRepository = new ProductRepositoryClass();
const ProductTypeRepository = new ProductTypeRepositoryClass();

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const products = await ProductRepository.adminList(undefined, {
            query,
            pageUrl: req.baseUrl,
        });
        products.renderPagination = paginationHelper.renderPagination;

        console.log(products);
        return res.render('modules/products/admin/list', {
            products, query,
        });
    } catch (e) {
        console.log(e);
        return next(responseHelper.error(e.message));
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
        console.log(e);
        return next(responseHelper.error(e.message));
    }
};

const create = async (req, res, next) => {
    try {
        const [productTypes] = await Promise.all([
            ProductTypeRepository.baseGet(),
        ]);
        console.log(productTypes);

        return res.render('modules/products/admin/create', {
            productTypes,
        });
    } catch (e) {
        console.log(e);
        return next(responseHelper.error(e.message));
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
                width: 750,
                quality: 75,
            });
            data.image = await storageHelper.storage('s3').upload(`articles/${dateHelper.getSlugCurrentTime()}.jpg`, image, 'public-read');
        }
        await ProductRepository.create(data, req.session.cUser);
        return res.redirect('/admin/product');
    } catch (e) {
        console.log(e);
        return next(responseHelper.error(e.message));
    }
};

const edit = async (req, res, next) => {
    try {
        const [product, productTypes] = await Promise.all([
            ProductRepository.getEditArticle(req.params.slug),
            ProductTypeRepository.baseGet(),
        ]);
        return res.render('modules/products/admin/edit', {
            productTypes, product,
        });
    } catch (e) {
        console.log(e);
        return next(responseHelper.error(e.message));
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
                width: 750,
                quality: 75,
            });
            data.image = await storageHelper.storage('s3').upload(`articles/${dateHelper.getSlugCurrentTime()}.jpg`, image, 'public-read');
        }
        await ProductRepository.update(data, req.params.id);
        return res.redirect(`/admin/product/edit/${getSlug(`${data.name || data.slug}-${data.createdTime}`)}`);
    } catch (e) {
        console.log(e);
        return next(responseHelper.error(e.message));
    }
};

const approve = async (req, res) => {
    try {
        const product = await ProductRepository.approve(req.params.id);

        return res.json(responseHelper.success(product));
    } catch (e) {
        console.log(e);
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

module.exports = {
    index, showMyProducts, create, store, edit, update, approve, destroy,
};
