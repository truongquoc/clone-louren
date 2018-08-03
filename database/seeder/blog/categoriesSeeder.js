require('dotenv/config');
const seeder = require('mongoose-seed');
const faker = require('faker');
const getSlug = require('speakingurl');

const items = [];
for (let i = 0; i < 10; i += 1) {
    const name = faker.lorem.words(2);
    items.push({
        name,
        slug: getSlug(name),
    });
}
const data = [{
    model: 'blog_categories',
    documents: items,
}];

seeder.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    seeder.loadModels(['./modules/blogCategories/models/BlogCategory']);
    seeder.clearModels(['blog_categories'], () => {
        seeder.populateModels(data, () => {
            seeder.disconnect();
        });
    });
});
