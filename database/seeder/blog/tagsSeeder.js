/* eslint-disable no-await-in-loop */
const faker = require('faker');
const getSlug = require('speakingurl');
const BlogTag = require('../../../modules/blogTags/models/BlogTag');

async function dropBlogTagsTable() {
    await BlogTag.remove({}, (err) => {});
}
async function fakeBlogTags() {
    try {
        for (let i = 0; i < 6; i += 1) {
            const name = faker.lorem.words(2);
            await BlogTag.create({
                name,
                slug: getSlug(name),
            });
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { dropBlogTagsTable, fakeBlogTags };
