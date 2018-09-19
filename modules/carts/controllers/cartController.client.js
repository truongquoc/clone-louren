const { validationResult } = require('express-validator/check');

const Cart = require('../../carts/models/Cart');
const Product = require('../../products/models/Product');

const responseHelper = require('../../../helpers/responseHelper');
const CartRepositoryClass = require('../repositories/CartRepository');
const BillRepositoryClass = require('../../bills/repositories/BillRepository');
const ProductRepositoryClass = require('../../products/repositories/ProductRepository');

const CartRepository = new CartRepositoryClass();
const BillRepository = new BillRepositoryClass();
const ProductRepository = new ProductRepositoryClass();

const index = async (req, res, next) => {
    try {
        let cart = {
            products: [],
        };

        if (req.session.cUser) {
            cart = await Cart
                .findOne({ user: req.session.cUser._id })
                .select('products')
                .populate('products.item', 'name price slug image.cover');
        } else if (req.session.cart) {
            const sessionCart = [...req.session.cart];

            const arrIdProducts = sessionCart.map(e => e.item);

            const products = await Product
                .find({ _id: arrIdProducts })
                .select('name price slug image.cover');

            cart.products = sessionCart.map((s) => {
                const id = s.item;
                const item = products.find(p => p._id.toString() === id.toString());

                return { ...s, item };
            });
        }

        const totalPrice = cart.products.reduce((total, product) => (
            total + (product.item.price.number * product.quantity)
        ), 0);

        return res.render('modules/carts/client/index', { cart, totalPrice });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const addToCart = async (req, res, next) => {
    try {
        const { id } = req.body;
        let total = 0;
        const product = await Product.findOne({
            _id: id,
            isApproved: true,
            isDraft: false,
            deletedAt: null,
        });

        if (!product) {
            return res.json(responseHelper.notFound());
        }

        if (req.session.cUser) {
            const cart = await Cart
                .findOne({
                    user: req.session.cUser._id,
                    deletedAt: null,
                })
                .select('products');

            const existItem = cart.products.find(e => e.item.toString() === id);

            if (existItem) {
                existItem.quantity += 1;
            } else {
                cart.products = [{
                    item: id,
                    quantity: 1,
                }, ...cart.products];
            }

            await cart.save();
            total = cart.products
                .map(element => element.quantity)
                .reduce((a, b) => a + parseInt(b, 10), 0);
        } else {
            const shopCart = req.session.cart || [];

            const existItem = shopCart.find(e => e.item === id);

            if (existItem) {
                existItem.quantity = parseInt(existItem.quantity, 10) + 1;
            } else {
                shopCart.push({ item: id, quantity: 1 });
            }

            req.session.cart = shopCart;
            total = shopCart
                .map(element => element.quantity)
                .reduce((a, b) => a + parseInt(b, 10), 0);
        }

        return res.json(responseHelper.success(total));
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const changeQuantity = async (req, res) => {
    try {
        const { product } = req.params;
        const { quantity } = req.body;
        const { cUser } = req.session;
        let returnQuantity;
        if (cUser) {
            const cart = await CartRepository.getCartByUser(req.session.cUser._id);

            const existItem = cart.products.find(e => e.item.toString() === product);
            if (existItem) {
                returnQuantity = existItem.quantity;
                existItem.quantity = quantity;
            }
            await CartRepository.updateProducts(cart._id, cart.products);
        } else {
            const shopCart = req.session.cart || [];
            const existItem = shopCart.find(e => e.item === product);
            if (existItem) {
                returnQuantity = existItem.quantity;
                existItem.quantity = quantity;
            }
        }

        return res.json(responseHelper.success(returnQuantity - quantity));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const removeProduct = async (req, res) => {
    try {
        const { cUser } = req.session;
        const id = req.params.product;
        let product;
        if (cUser) {
            const cart = await CartRepository.getCartByUser(cUser._id);
            product = cart.products.find(element => (
                element.item.toString() === id
            ));
            cart.products = cart.products.filter(element => (
                element.item.toString() !== id
            ));
            await cart.save();
        } else {
            const products = req.session.cart || [];
            product = products.find(element => (
                element.item.toString() === id
            ));
            req.session.cart = products.filter(element => (
                element.item !== id
            ));
        }
        const { quantity } = product;
        product = await ProductRepository.getById(product.item, { select: 'price.number discount' });

        return res.json(responseHelper.success({
            product, quantity,
        }));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const showUserInformationForm = (req, res) => res.render('modules/carts/client/userInformation', {
    products: req.session.cart,
});

const buyProductWithoutLogin = async (req, res, next) => {
    const errors = validationResult(req);
    const data = req.body;
    if (!errors.isEmpty()) {
        req.flash('oldValue', data);
        req.flash('errors', errors.mapped());
        return res.redirectBack();
    }
    try {
        const bill = await CartRepository.createBillWithoutLogin(data, req.session.cart);
        await BillRepository.sendConfirmEmail(bill._id);
        delete req.session.cart;
        req.flash('success', 'Gửi yêu cầu mua thành công, hãy kiểm tra lại email của bạn.');

        return res.redirect('/gio-hang');
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const buyProduct = async (req, res, next) => {
    try {
        const bill = await CartRepository.createBill(req.params.id, req.session.cUser._id);
        await Promise.all([
            BillRepository.sendConfirmEmail(bill._id),
            CartRepository.emptyCart(req.params.id),
        ]);
        req.flash('success', 'Gửi yêu cầu mua thành công, hãy kiểm tra lại email của bạn.');

        return res.redirect('/nguoi-dung/don-hang');
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = {
    index,
    buyProductWithoutLogin,
    showUserInformationForm,
    buyProduct,
    addToCart,
    changeQuantity,
    removeProduct,
};
