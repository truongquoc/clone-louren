/* eslint-disable no-await-in-loop */
const faker = require('faker');
const getSlug = require('speakingurl');
const dateHelper = require('../../../helpers/dateHelper');
const BlogArticle = require('../../../modules/blogArticles/models/BlogArticle');
const BlogCategoryRepositoryClass = require('../../../modules/blogCategories/repositories/BlogCategoryRepository');
const BlogTagRepositoryClass = require('../../../modules/blogTags/repositories/BlogTagRepository');
const UserRepositoryClass = require('../../../modules/users/repositories/UserRepository');

const BlogCategoryRepository = new BlogCategoryRepositoryClass();
const BlogTagRepository = new BlogTagRepositoryClass();
const UserRepository = new UserRepositoryClass();

async function dropBlogArticlesTable() {
    await BlogArticle.remove({}, (err) => {});
}
async function fakeBlogArticles() {
    try {
        const [
            users,
            blogCategories,
            blogTags,
        ] = await Promise.all([
            UserRepository.baseGet(),
            BlogCategoryRepository.baseGet(),
            BlogTagRepository.baseGet(),
        ]);
        for (let i = 0; i < 40; i += 1) {
            const tags = [];
            const title = faker.lorem.words(10);
            for (let j = 0; j < Math.floor(Math.random() * blogTags.length); j += 1) {
                tags.push(blogTags[j]._id);
            }
            await BlogArticle.create({
                author: users[Math.floor(Math.random() * users.length)]._id,
                category: blogCategories[Math.floor(Math.random() * blogCategories.length)]._id,
                tags,
                title,
                description: faker.lorem.paragraph(2),
                content: faker.lorem.paragraph(40),
                display: { image: faker.image.dataUri() },
                isApproved: true,
                slug: getSlug(`${title}-${dateHelper.getSlugCurrentTime()}`),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { dropBlogArticlesTable, fakeBlogArticles };
