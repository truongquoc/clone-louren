const Cart = require('../../carts/models/Cart');
const Product = require('../../products/models/Product');
const responseHelper = require('../../../helpers/responseHelper');

const index = (req, res) => {
    return res.render('modules/carts/client/index');
};

const addToCart = async (req, res, next) => {
    try {
        const { id } = req.body;
        const product = await Product.findById(id);

        if (!product) {
            return res.json({ status: 404, message: 'NOT FOUND', payload: {} });
        }

        if (req.session.cUser) {
            const cart = await Cart
                .findOne({ user: req.session.cUser._id })
                .select('products');
        } else {
            req.session.cart = req.session.cart || [];

            const shopCart = req.session.cart;

            const existItem = shopCart.find(e => e.item === id);

            if (existItem) {
                existItem.quantity += 1;
            } else {
                shopCart.push({ item: id, quantity: 1 });
            }

            req.session.cart = shopCart;
        }

        res.json({ status: 200, message: 'OK', payload: product });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = {
    index,
    addToCart,
};
