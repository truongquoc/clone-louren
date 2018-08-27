/* eslint-disable no-await-in-loop */
const faker = require('faker');
const PropertyCondition = require('../../../modules/propertyConditions/models/PropertyCondition');

async function dropPropertyConditionsTable() {
    await PropertyCondition.remove({}, (err) => {});
}
async function fakePropertyConditions() {
    try {
        for (let i = 0; i < 20; i += 1) {
            await PropertyCondition.create({
                name: faker.lorem.words(2),
            });
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { dropPropertyConditionsTable, fakePropertyConditions };
