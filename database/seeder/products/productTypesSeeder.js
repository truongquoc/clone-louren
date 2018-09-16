/* eslint-disable no-await-in-loop */
const faker = require('faker');
const getSlug = require('speakingurl');
const ProductType = require('../../../modules/productTypes/models/ProductType');

async function dropProductTypesTable() {
    await ProductType.remove({}, (err) => {});
}
async function fakeProductTypes() {
    try {
        for (let i = 0; i < 6; i += 1) {
            const name = faker.lorem.words(2);
            await ProductType.create({
                name,
                slug: getSlug(name),
            });
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { dropProductTypesTable, fakeProductTypes };
