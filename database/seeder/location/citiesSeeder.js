/* eslint-disable no-await-in-loop */
const faker = require('faker');
const getSlug = require('speakingurl');
const City = require('../../../modules/cities/models/City');

async function dropCitiesTable() {
    await City.remove({}, (err) => {});
}
async function fakeCities() {
    try {
        for (let i = 0; i < 10; i += 1) {
            const name = faker.lorem.words(2);
            await City.create({
                name,
                slug: getSlug(name),
            });
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { dropCitiesTable, fakeCities };
