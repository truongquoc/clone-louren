/* eslint-disable no-await-in-loop */
const faker = require('faker');
const getSlug = require('speakingurl');
const PropertyStatus = require('../../../modules/propertyStatuses/models/PropertyStatus');

async function dropPropertyStatusesTable() {
    await PropertyStatus.remove({}, (err) => {});
}
async function fakePropertyStatuses() {
    try {
        for (let i = 0; i < 2; i += 1) {
            const name = faker.lorem.words(2);
            await PropertyStatus.create({
                name,
                slug: getSlug(name),
            });
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { dropPropertyStatusesTable, fakePropertyStatuses };
