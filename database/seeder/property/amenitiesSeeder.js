/* eslint-disable no-await-in-loop */
const faker = require('faker');
const PropertyAmenity = require('../../../modules/propertyAmenities/models/PropertyAmenity');

async function dropPropertyAmenitiesTable() {
    await PropertyAmenity.remove({}, (err) => {});
}
async function fakePropertyAmenities() {
    try {
        for (let i = 0; i < 20; i += 1) {
            await PropertyAmenity.create({
                name: faker.lorem.words(2),
            });
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { dropPropertyAmenitiesTable, fakePropertyAmenities };
