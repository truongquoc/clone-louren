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

    getCart(conditions) {
        conditions.deletedAt = null;

        return this.model
            .findOne(conditions)
            .populate('products.item', 'price');
    }

    async createBill(id, userId) {
        const cart = await this.getCart({ _id: id });
        const products = [];
        cart.products.forEach((product) => {
            products.push({
                product: product.item._id,
                price: product.item.price.number,
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
            productBill,
            code,
            price: totalPrice,
        });
    }

    async createBillWithoutLogin(data, savedProducts) {
        let productBill = [];
        let check;
        const productIds = savedProducts.map(savedProduct => savedProduct._id);
        const products = await ProductRepository.getManyByIds(productIds);
        savedProducts.forEach((savedProduct) => {
            const findElement = products.find(element => (
                savedProduct._id === element._id.toString()
            ));
            const product = {
                product: savedProduct._id,
                quantity: savedProduct.quantity,
                price: findElement.price.number,
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
        });
    }
}

module.exports = CartRepository;
