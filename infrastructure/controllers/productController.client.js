const responseHelper = require('../../helpers/responseHelper');
const ProductTypeRepositoryClass = require('../../modules/productTypes/repositories/ProductTypeRepository');
const CartRepositoryClass = require('../../modules/carts/repositories/CartRepository');

const ProductTypeRepository = new ProductTypeRepositoryClass();
const CartRepository = new CartRepositoryClass();

const getPropertyTypes = async (req, res, next) => {
    try {
        res.locals.productTypes = await ProductTypeRepository.get();
        next();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const countCartProduct = async (req, res, next) => {
    try {
        const { cUser } = req.session;
        let productQuantity = 0;
        let { cart } = req.session;
        if (cUser) {
            cart = await CartRepository.getCartByUser(cUser._id);
            if (!cart) {
                cart = await CartRepository.create(cUser._id);
            }
            cart.products.forEach((element) => {
                if (element) {
                    productQuantity += parseInt(element.quantity, 10);
                }
            });
        } else if (cart && cart.length) {
            cart.forEach((element) => {
                productQuantity += parseInt(element.quantity, 10);
            });
        }
        res.locals.productQuantity = productQuantity;
        next();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = {
    getPropertyTypes,
    countCartProduct,
};
