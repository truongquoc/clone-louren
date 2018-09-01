/* eslint-disable no-await-in-loop */
const faker = require('faker');
const PropertyCondition = require('../../../modules/propertyConditions/models/PropertyCondition');

async function dropPropertyConditionsTable() {
    await PropertyCondition.remove({}, (err) => {});
}
async function fakePropertyConditions() {
    try {
        const icons = ['flaticon-air-conditioner', 'flaticon-apartment', 'flaticon-arrows', 'flaticon-bars', 'flaticon-bed', 'flaticon-building', 'flaticon-clock', 'flaticon-for-sale', 'flaticon-holidays', 'flaticon-internet', 'flaticon-machine', 'flaticon-monitor', 'flaticon-old-telephone-ringing', 'flaticon-park', 'flaticon-people', 'flaticon-people-1', 'flaticon-people-2', 'flaticon-person-enjoying-jacuzzi-hot-water-bath', 'flaticon-security', 'flaticon-shape', 'flaticon-sign-out-option', 'flaticon-social', 'flaticon-square-layouting-with-black-square-in-east-area', 'flaticon-summer', 'flaticon-symbol', 'flaticon-symbol-1', 'flaticon-tag', 'flaticon-technology', 'flaticon-technology-1', 'flaticon-technology-2', 'flaticon-transport', 'flaticon-vehicle', 'flaticon-weightlifting', 'flaticon-wifi'];
        for (let i = 0; i < 20; i += 1) {
            await PropertyCondition.create({
                name: faker.lorem.words(2),
                icon: icons[Math.floor(Math.random() * icons.length)],
            });
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { dropPropertyConditionsTable, fakePropertyConditions };
