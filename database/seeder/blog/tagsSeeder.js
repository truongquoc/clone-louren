require('dotenv/config');
const seeder = require('mongoose-seed');
const faker = require('faker');
const getSlug = require('speakingurl');

const items = [];
for (let i = 0; i < 15; i += 1) {
    const title = faker.lorem.words(2);
    items.push({
        name: title,
        slug: getSlug(title),
        createAt: new Date(),
        updaredAt: new Date(),
    });
}

const data = [{
    model: 'blog_tags',
    documents: items,
}];

seeder.connect(process.env.DB_CONNECTION, { useNewurlParser: true }, () => {
    seeder.loadModels(['./modules/blogTags/models/BlogTag']);
    seeder.clearModels(['blog_tags'], () => {
        seeder.populateModels(data, () => {
            seeder.disconnect();
        });
    });
});
