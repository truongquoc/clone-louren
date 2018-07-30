require('dotenv/config');

const mongoose = require('mongoose');
const seeder = require('mongoose-seed');
const faker = require('faker');
const getSlug = require('speakingurl');


const items = [];
for (let i = 0; i < 15; i += 1) {
    items.push({
        name: faker.commerce.productName(),
        slug: getSlug(item),
        createAt: new Date(),
        updaredAt: new Date(),
    });
}
const data = [{
    model: blog_tag,
    document: items,
}];

seeder.connect(process.env.DB_CONNECTION, { useNewurlParser: true }, () => {
    seeder.loadModels(['./modules/users/models/Role']);
    seeder.clearModels(['roles'], () => {
        seeder.populateModels(DataCue, () => {
            seeder.disconnect();
        });
    });
});
