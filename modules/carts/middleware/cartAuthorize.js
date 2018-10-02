const i18n = require('i18n');

const responseHelper = require('../../../helpers/responseHelper');
const CartRepositoryClass = require('../repositories/CartRepository');
const ProductRepositoryClass = require('../../products/repositories/ProductRepository');

const CartRepository = new CartRepositoryClass();
const ProductRepository = new ProductRepositoryClass();

const confirmCartAuthorize = async (req, res, next) => {
    try {
        const cart = await CartRepository.checkExist({ _id: req.params.id }, { select: 'products user' });
        if (!cart) {
            return next(responseHelper.notFound());
        }
        if (cart.user.toString() !== req.session.cUser._id) {
            return next(responseHelper.notAuthorized());
        }
        if (!cart.products.length) {
            return res.redirect('/gio-hang');
        }
        next();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const showUserInformationAuthorize = async (req, res, next) => {
    let cart;
    if (req.session.cUser) {
        cart = await CartRepository.checkExist({ user: req.session.cUser._id }, { select: 'products' });
    }
    if ((!req.session.cart || !req.session.cart.length) && (!cart || !cart.products.length)) {
        return res.redirect('/gio-hang');
    }
    next();
};

const changeQuantityAuthorize = async (req, res, next) => {
    try {
        const product = await ProductRepository.checkExist({
            _id: req.params.product,
            isDraft: false,
            isApproved: true,
        }, { select: 'quantity price.isAgreement' });
        if (!product) {
            return res.json(responseHelper.notFound());
        }
        if (product.quantity <= 0) {
            return res.json(responseHelper.error(i18n.__('product.out-of-stock.original'), 400));
        }
        if (product.quantity < (+req.body.quantity || 1)) {
            return res.json(responseHelper.error(i18n.__('product.not-enough-products.original'), 400));
        }
        if (product.price.isAgreement) {
            return res.json(responseHelper.error(i18n.__('product.negotiated-price.original'), 400));
        }
        next();
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const removeProductAuthorize = async (req, res, next) => {
    try {
        let product;
        if (req.session.cUser) {
            const cart = await CartRepository.checkExist({
                user: req.session.cUser._id,
            }, { select: 'products' });
            cart.products = cart.products || [];
            product = cart.products.find(element => (
                element.item.toString() === req.params.product
            ));
        } else {
            const products = req.session.cart || [];
            product = products.find(element => (
                element.item === req.params.product
            ));
        }
        if (!product) {
            return res.json(responseHelper.notFound());
        }
        next();
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const verifyProductQuantity = async (req, res, next) => {
    try {
        const { cUser } = req.session;
        if (cUser) {
            const cart = await CartRepository.getUserCart(cUser._id);
            if (cart && cart.products.length) {
                for (let i = 0; i < cart.products.length; i += 1) {
                    const element = cart.products[i];
                    if (element.item.quantity <= 0) {
                        req.flash('errors', {
                             quantity: { msg: i18n.__('product.out-of-stock.product', { name: element.item.name }) },
                        });
                        return res.redirectBack();
                    }
                    if (element.quantity > element.item.quantity) {
                        req.flash('errors', {
                            quantity: { msg: i18n.__('product.not-enough-products.product', { name: element.item.name }) },
                        });
                        return res.redirectBack();
                    }
                    if (element.item.price.isAgreement) {
                        req.flash('errors', {
                            quantity: { msg: i18n.__('product.negotiated-price.product', { name: element.item.name }) },
                        });
                        return res.redirectBack();
                    }
                }
            }
        } else {
            const cart = req.session.cart || [];
            const cartLength = cart.length;
            let products = cart.map(element => element.item);
            products = await ProductRepository.getManyByIds(products, { select: '_id name quantity price.isAgreement' });
            for (let i = 0; i < cartLength; i += 1) {
                const product = products.find(element => element._id.toString() === cart[i].item);
                if (product.quantity <= 0) {
                    req.flash('errors', {
                        quantity: { msg: i18n.__('product.out-of-stock.product', { name: product.name }) },
                    });
                    return res.redirectBack();
                }
                if (cart[i].quantity > product.quantity) {
                    req.flash('errors', {
                        quantity: { msg: i18n.__('product.not-enough-products.product', { name: product.name }) },
                    });
                    return res.redirectBack();
                }
                if (product.price.isAgreement) {
                    req.flash('errors', {
                        quantity: { msg: i18n.__('product.negotiated-price.product', { name: product.name }) },
                    });
                    return res.redirectBack();
                }
            }
        }
        next();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = {
    confirmCartAuthorize,
    showUserInformationAuthorize,
    changeQuantityAuthorize,
    removeProductAuthorize,
    verifyProductQuantity,
};
