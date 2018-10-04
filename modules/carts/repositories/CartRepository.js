const { roundPrice } = require('../../../helpers/adminHelper');
const Cart = require('../models/Cart');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');
const ProductRepositoryClass = require('../../products/repositories/ProductRepository');
const ProductBillRepositoryClass = require('../../bills/repositories/ProductBillRepository');
const BillRepositoryClass = require('../../bills/repositories/BillRepository');

const ProductRepository = new ProductRepositoryClass();
const ProductBillRepository = new ProductBillRepositoryClass();
const BillRepository = new BillRepositoryClass();

class CartRepository extends BaseRepository {
    model() {
        return Cart;
    }

    getCartByUser(id) {
        const conditions = {
            user: id,
            deletedAt: null,
        };

        return this.model.findOne(conditions);
    }

    getCart(conditions) {
        conditions.deletedAt = null;

        return this.model
            .findOne(conditions)
            .populate('products.item', 'price.number discount');
    }

    async createBill(data, userId) {
        const cart = await this.getCart({ user: userId });
        const products = [];
        cart.products.forEach((product) => {
            const { item } = product;
            const price = item.price.number;
            products.push({
                product: item._id,
                price: roundPrice(price - (price * (parseFloat(item.discount) || 0))),
                quantity: product.quantity,
            });
        });
        let code = Math.floor(Math.random() * 1000000);
        let [productBill, check] = await Promise.all([
            ProductBillRepository.baseCreate(products),
            BillRepository.checkExist({ code }),
        ]);
        while (check) {
            code = Math.floor(Math.random() * 1000000);
            check = await BillRepository.checkExist({ code });
        }
        let totalPrice = 0;
        productBill.forEach((element) => {
            totalPrice += element.price * element.quantity;
        });
        productBill = productBill.map(element => element._id);

        return BillRepository.baseCreate({
            user: userId,
            userInformation: {
                name: data.name,
                email: data.email,
                telephone: data.telephone,
                address: data.address,
                paymentMethod: data.paymentMethod,
                note: data.note,
            },
            productBill,
            code,
            price: totalPrice,
            language: data.language,
        });
    }

    async createBillWithoutLogin(data, savedProducts) {
        let productBill = [];
        let check;
        const productIds = savedProducts.map(savedProduct => savedProduct.item);
        const products = await ProductRepository.getManyByIds(productIds, { select: '_id price.number discount' });
        savedProducts.forEach((savedProduct) => {
            const findElement = products.find(element => (
                savedProduct.item === element._id.toString()
            ));
            const price = findElement.price.number;
            const product = {
                product: savedProduct.item,
                quantity: savedProduct.quantity,
                price: roundPrice(price - (price * (parseFloat(findElement.discount) || 0))),
            };
            productBill.push(product);
        });
        let code = Math.floor(Math.random() * 1000000);
        [productBill, check] = await Promise.all([
            ProductBillRepository.baseCreate(productBill),
            BillRepository.checkExist({ code }),
        ]);
        while (check) {
            code = Math.floor(Math.random() * 1000000);
            check = await BillRepository.checkExist({ code });
        }
        let totalPrice = 0;
        productBill.forEach((element) => {
            totalPrice += element.price * element.quantity;
        });
        productBill = productBill.map(element => element._id);

        return BillRepository.baseCreate({
            userInformation: {
                name: data.name,
                email: data.email,
                telephone: data.telephone,
                address: data.address,
                note: data.note,
            },
            productBill,
            code,
            price: totalPrice,
            language: data.language,
        });
    }

    emptyCart(userId) {
        return this.baseUpdate({ products: [] }, { user: userId });
    }

    create(user) {
        return this.model.create({ user });
    }

    async syncCart(user, tempProducts) {
        const cart = await this.getDetail({ user });
        tempProducts.forEach((element) => {
            const item = cart.products.find(e => e.item._id.toString() === element.item);
            if (item) {
                item.quantity += element.quantity;
            } else {
                cart.products.push(element);
            }
        });

        return cart.save();
    }

    updateProducts(id, products) {
        return this.baseUpdate({ products }, { _id: id });
    }

    getUserCart(user) {
        return this.model
            .findOne({ user, deletedAt: null })
            .populate({
                path: 'products.item',
                select: 'name quantity price.isAgreement',
                match: { deletedAt: null },
            })
            .select('_id');
    }
}

module.exports = CartRepository;
