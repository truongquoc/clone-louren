require('dotenv/config');
const _ = require('lodash');
const mongoose = require('mongoose');
const seeder = require('mongoose-seed');
const bluebird = require('bluebird');
const async = require('async');
const faker = require('faker');
const getSlug = require('speakingurl');
const BlogCategory = require('../../../modules/blogCategories/models/BlogCategory');
const BlogTag = require('../../../modules/blogTags/models/BlogTag');
const User = require('../../../modules/users/models/User');

mongoose.Promise = bluebird;

new Promise((resolve) => {
    mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        promiseLibrary: bluebird,
    });
    return async.parallel([
        (callback) => {
            User.find({}, { _id: 1 })
                .exec((err, userIds) => {
                    callback(null, userIds);
                });
        },
        (callback) => {
            BlogCategory.find({}, { _id: 1 })
                .exec((err, blogCategoryIds) => {
                    callback(null, blogCategoryIds);
                });
        },
        (callback) => {
            BlogTag.find({}, { _id: 1 })
                .exec((err, blogTagIds) => {
                    callback(null, blogTagIds);
                });
        },
    ], (err, results) => {
        resolve(results);
        mongoose.connection.close();
    });
}).then(results => new Promise((resolve) => {
    const items = [];
    let title;
    for (let i = 0; i < 20; i += 1) {
        title = faker.lorem.paragraph(1);
        items.push({
            category: _.sample(results[1])._id,
            tags: [
                _.sample(results[2])._id,
                _.sample(results[2])._id,
            ],
            author: _.sample(results[0])._id,
            title,
            content: faker.lorem.paragraph(40),
            display: { image: faker.image.imageUrl },
            slug: getSlug(title),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    resolve(items);
})).then((items) => {
    seeder.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
        const data = [{
            model: 'blog_articles',
            documents: items,
        }];
        seeder.loadModels(['./modules/blogArticles/models/BlogArticle']);
        seeder.clearModels(['blog_articles'], () => {
            seeder.populateModels(data, () => {
                seeder.disconnect();
            });
        });
    });
});
