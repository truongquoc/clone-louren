const { validationResult } = require('express-validator/check');
const i18n = require('i18n');

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
                .findOne({ user: req.session.cUser._id, deletedAt: null })
                .select('products')
                .populate('products.item', 'name price quantity slug discount image.cover');
        } else if (req.session.cart) {
            const sessionCart = [...req.session.cart];

            const arrIdProducts = sessionCart.map(e => e.item);

            const products = await Product
                .find({ _id: arrIdProducts })
                .select('name price discount quantity image.cover slug');

            cart.products = sessionCart.map((s) => {
                const id = s.item;
                const item = products.find(p => p._id.toString() === id.toString());

                return { ...s, item };
            });
        }

        const totalPrice = cart.products.reduce((total, product) => {
            const { price, discount } = product.item;
            if (price.isAgreement) {
                return total;
            }
            const discounted = discount ? price.number * (1 - discount) : price.number;
            const add = product.item.discount ? Math.round(discounted / 1000) * 1000 : discounted;
            return total + (add * product.quantity);
        }, 0);

        return res.render('modules/carts/client/index', { cart, totalPrice });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const addToCart = async (req, res, next) => {
    try {
        const { id, quantity } = req.body;
        let total = 0;
        const product = await ProductRepository.clientCheckExistById(id, { select: '_id quantity price.isAgreement' });

        if (!product) {
            return res.json(responseHelper.notFound());
        }
        if (product.quantity <= 0) {
            return res.json(responseHelper.error(i18n.__('product.out-of-stock.original'), 400));
        }
        if (product.quantity < (+quantity || 1)) {
            return res.json(responseHelper.error(i18n.__('product.not-enough-products.original'), 400));
        }
        if (product.price.isAgreement) {
            return res.json(responseHelper.error(i18n.__('product.negotiated-price.original'), 400));
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
                existItem.quantity = +existItem.quantity + (+quantity || 1);
            } else {
                cart.products = [{
                    item: id,
                    quantity: (+quantity || 1),
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
                existItem.quantity = +existItem.quantity + (+quantity || 1);
            } else {
                shopCart.push({ item: id, quantity: (+quantity || 1) });
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
        const productInfo = await ProductRepository.getById(product, { select: 'price.number discount' });
        let returnQuantity;
        if (cUser) {
            const cart = await CartRepository.getCartByUser(req.session.cUser._id);

            const existItem = cart.products.find(e => e.item.toString() === product);

            if (existItem) {
                returnQuantity = +(existItem.quantity);
                existItem.quantity = +quantity;
                await CartRepository.updateProducts(cart._id, cart.products);
            }
        } else {
            const shopCart = req.session.cart || [];
            const existItem = shopCart.find(e => e.item === product);

            if (existItem) {
                returnQuantity = +existItem.quantity;
                existItem.quantity = +quantity;
            }
        }

        return res.json(responseHelper.success([
            returnQuantity - quantity,
            productInfo.price.number,
            productInfo.discount,
        ]));
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
        product = await ProductRepository.getById(product.item, { select: 'price discount' });

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

const buyProduct = async (req, res, next) => {
    const errors = validationResult(req);
    const data = req.body;
    if (!errors.isEmpty()) {
        req.flash('oldValue', data);
        req.flash('errors', errors.mapped());
        return res.redirectBack();
    }
    try {
        let bill;
        let redirectRoute;
        const user = req.session.cUser;
        const commands = [];
        if (user) {
            bill = await CartRepository.createBill(data, user._id);
            commands.push(CartRepository.emptyCart(user._id));
            redirectRoute = '/nguoi-dung/don-hang';
        } else {
            bill = await CartRepository.createBillWithoutLogin(data, req.session.cart);
            delete req.session.cart;
            redirectRoute = '/gio-hang';
        }
        commands.push(BillRepository.sendConfirmEmail(bill._id));
        await Promise.all(commands);

        req.flash('success', i18n.__('product.order.success-message'));

        return res.redirect(redirectRoute);
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = {
    index,
    buyProduct,
    showUserInformationForm,
    addToCart,
    changeQuantity,
    removeProduct,
};
