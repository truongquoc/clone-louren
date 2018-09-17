/* eslint-disable no-await-in-loop */
const Cart = require('../../../modules/carts/models/Cart');
const ProductRepositoryClass = require('../../../modules/products/repositories/ProductRepository');
const UserRepositoryClass = require('../../../modules/users/repositories/UserRepository');

const ProductRepository = new ProductRepositoryClass();
const UserRepository = new UserRepositoryClass();

async function dropCartsTable() {
    await Cart.remove({}, (err) => {});
}
async function fakeCarts() {
    try {
        const [
            products,
            users,
        ] = await Promise.all([
            ProductRepository.baseGet(),
            UserRepository.baseGet(),
        ]);
        for (let i = 0; i < 40; i += 1) {
            const cartProducts = [];
            const indexes = [];
            let loopTimes = 6;
            for (let j = 0; j < loopTimes; j += 1) {
                const index = Math.floor(Math.random() * products.length);
                if (indexes.indexOf(index) >= 0) {
                    loopTimes += 1;
                    continue;
                }
                indexes.push(index);
                cartProducts.push({
                    item: products[index]._id,
                    quantity: Math.floor(Math.random() * products.length) + 1,
                });
            }
            await Cart.create({
                products: cartProducts,
                user: users[Math.floor(Math.random() * users.length)]._id,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { dropCartsTable, fakeCarts };
