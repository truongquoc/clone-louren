/* eslint-disable no-await-in-loop */
const faker = require('faker');
const getSlug = require('speakingurl');
const City = require('../../../modules/cities/models/City');
const District = require('../../../modules/districts/models/District');

async function dropDistrictsTable() {
    await District.remove({}, (err) => {});
}
async function fakeDistricts() {
    try {
        const cities = await City.find({ deletedAt: null });
        for (let i = 0; i < 10; i += 1) {
            const name = faker.lorem.words(2);
            await District.create({
                city: cities[Math.floor(Math.random() * cities.length)]._id,
                name,
                slug: getSlug(name),
            });
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { dropDistrictsTable, fakeDistricts };
