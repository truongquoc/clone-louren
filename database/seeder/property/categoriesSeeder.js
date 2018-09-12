/* eslint-disable no-await-in-loop */
const faker = require('faker');
const getSlug = require('speakingurl');
const PropertyCategory = require('../../../modules/propertyCategories/models/PropertyCategory');

async function dropPropertyCategoriesTable() {
    await PropertyCategory.remove({}, (err) => {});
}
async function fakePropertyCategories() {
    try {
        for (let i = 0; i < 6; i += 1) {
            const name = faker.lorem.words(2);
            await PropertyCategory.create({
                name,
                slug: getSlug(name),
            });
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { dropPropertyCategoriesTable, fakePropertyCategories };
