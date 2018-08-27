/* eslint-disable no-await-in-loop */
const faker = require('faker');
const PriceType = require('../../../modules/priceTypes/models/PriceType');

async function dropPriceTypesTable() {
    await PriceType.remove({}, (err) => {});
}
async function fakePriceTypes() {
    try {
        for (let i = 0; i < 5; i += 1) {
            await PriceType.create({
                name: faker.finance.currencyName(),
            });
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { dropPriceTypesTable, fakePriceTypes };
