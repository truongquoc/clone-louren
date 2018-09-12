/* eslint-disable no-await-in-loop */
const faker = require('faker');
const getSlug = require('speakingurl');
const BlogCategory = require('../../../modules/blogCategories/models/BlogCategory');

async function dropBlogCategoriesTable() {
    await BlogCategory.remove({}, (err) => {});
}
async function fakeBlogCategories() {
    try {
        for (let i = 0; i < 6; i += 1) {
            const name = faker.lorem.words(2);
            await BlogCategory.create({
                name,
                slug: getSlug(name),
            });
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { dropBlogCategoriesTable, fakeBlogCategories };
