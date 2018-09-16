/* eslint-disable no-await-in-loop */
const faker = require('faker');
const getSlug = require('speakingurl');
const dateHelper = require('../../../helpers/dateHelper');
const Product = require('../../../modules/products/models/Product');
const ProductTypeRepositoryClass = require('../../../modules/productTypes/repositories/ProductTypeRepository');
const UserRepositoryClass = require('../../../modules/users/repositories/UserRepository');

const ProductTypeRepository = new ProductTypeRepositoryClass();
const UserRepository = new UserRepositoryClass();

async function dropProductsTable() {
    await Product.remove({}, (err) => {});
}
async function fakeProducts() {
    try {
        const [
            users,
            productTypes,
        ] = await Promise.all([
            UserRepository.baseGet(),
            ProductTypeRepository.baseGet(),
        ]);
        for (let i = 0; i < 40; i += 1) {
            const name = faker.commerce.productName();
            await Product.create({
                author: users[Math.floor(Math.random() * users.length)]._id,
                type: productTypes[Math.floor(Math.random() * productTypes.length)]._id,
                sku: i,
                name,
                detail: faker.lorem.paragraph(40),
                info: faker.lorem.paragraph(40),
                price: {
                    number: Math.floor(Math.random() * 1000000),
                    string: 'test',
                },
                'image.cover': 'test',
                quantity: Math.floor(Math.random() * 100),
                slug: getSlug(`${name}-${dateHelper.getSlugCurrentTime()}`),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { dropProductsTable, fakeProducts };
