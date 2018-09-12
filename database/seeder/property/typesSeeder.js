/* eslint-disable no-await-in-loop */
const faker = require('faker');
const getSlug = require('speakingurl');
const PropertyType = require('../../../modules/propertyTypes/models/PropertyType');

async function dropPropertyTypesTable() {
    await PropertyType.remove({}, (err) => {});
}
async function fakePropertyTypes() {
    try {
        for (let i = 0; i < 3; i += 1) {
            const name = faker.lorem.words(2);
            await PropertyType.create({
                name,
                slug: getSlug(name),
            });
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { dropPropertyTypesTable, fakePropertyTypes };
