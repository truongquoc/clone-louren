const responseHelper = require('../../../helpers/responseHelper');
const CartRepositoryClass = require('../repositories/CartRepository');
const ProductRepositoryClass = require('../../products/repositories/ProductRepository');

const CartRepository = new CartRepositoryClass();
const ProductRepository = new ProductRepositoryClass();

const confirmCartAuthorize = async (req, res, next) => {
    try {
        const cart = await CartRepository.checkExist({ _id: req.params.id }, { select: 'user' });
        if (!cart) {
            return next(responseHelper.notFound());
        }
        if (cart.user.toString() !== req.session.cUser._id) {
            return next(responseHelper.notAuthorized());
        }
        next();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const showUserInformationAuthorize = (req, res, next) => {
    if (!req.session.cart || !req.session.cart.length) {
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
        });
        if (!product) {
            return res.json(responseHelper.notFound());
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
                             quantity: { msg: `Sản phẩm "${product.name}" đã hết hàng` },
                        });
                        return res.redirectBack();
                    } else if (element.quantity > element.item.quantity) {
                        req.flash('errors', {
                            quantity: { msg: `Số lượng sản phẩm "${product.name}" trong kho không đủ` },
                        });
                        return res.redirectBack();
                    }
                }
            }
        } else {
            const cart = req.session.cart || [];
            const cartLength = cart.length;
            let products = cart.map(element => element.item);
            products = await ProductRepository.getManyByIds(products, { select: '_id name quantity' });
            for (let i = 0; i < cartLength; i += 1) {
                const product = products.find(element => element._id.toString() === cart[i].item);
                if (product.quantity <= 0) {
                    req.flash('errors', {
                        quantity: { msg: `Sản phẩm "${product.name}" đã hết hàng` },
                    });
                    return res.redirectBack();
                } else if (cart[i].quantity > product.quantity) {
                    req.flash('errors', {
                        quantity: { msg: `Số lượng sản phẩm "${product.name}" trong kho không đủ` },
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
