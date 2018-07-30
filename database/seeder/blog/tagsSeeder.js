require('dotenv/config');

const mongoose = require('mongoose');
const seeder = require('mongoose-seed');
const faker = require('faker');
const getSlug = require('speakingurl');


const items = [];
for (let i = 0; i < 15; i += 1) {
    items.push({
        name: faker.commerce.productName(),
        slug: getSlug(faker.commerce.productName()),
        createAt: new Date(),
        updaredAt: new Date(),
    });
}
const data = [{
    model: 'blog_tags',
    document: items,
}];
console.log(data[0]);
seeder.connect(process.env.DB_CONNECTION, { useNewurlParser: true }, () => {
    seeder.loadModels(['./modules/blogTags/models/BlogTag']);
    seeder.clearModels(['blog_tags'], () => {
        seeder.populateModels(data, () => {
            seeder.disconnect();
        });
        console.log(data[0]);
    });
});
