/* eslint-disable no-await-in-loop */
const Product = require('../../../modules/products/models/Product');
const ProductBill = require('../../../modules/bills/models/ProductBill');
// const ProductRepositoryClass = require('../../../modules/products/repositories/ProductRepository');

// const ProductRepository = new ProductRepositoryClass();

async function dropProductBillsTable() {
    await ProductBill.remove({}, (err) => {});
}
async function fakeProductBills() {
    try {
        const [
            products,
        ] = await Promise.all([
            // ProductRepository.baseGet(),
            Product.find(),
        ]);
        for (let i = 0; i < 40; i += 1) {
            await ProductBill.create({
                product: products[Math.floor(Math.random() * products.length)]._id,
                quantity: Math.floor(Math.random() * 3) + 1,
                price: Math.floor(Math.random() * 1000000),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { dropProductBillsTable, fakeProductBills };
