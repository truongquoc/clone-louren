/* eslint-disable no-await-in-loop */
const faker = require('faker');
const Request = require('../../../modules/requests/models/Request');

async function dropRequestsTable() {
    await Request.remove({}, (err) => {});
}

async function fakeRequests() {
    try {
        for (let i = 0; i < 20; i += 1) {
            await Request.create({
                name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                email: faker.internet.email(),
                telephone: faker.phone.phoneNumber(),
                title: faker.lorem.sentences(1),
                content: faker.lorem.paragraph(40),
            });
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { dropRequestsTable, fakeRequests };
