require('dotenv/config');
const _ = require('lodash');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const seeder = require('mongoose-seed');
const async = require('async');
const faker = require('faker');
const getSlug = require('speakingurl');

const BlogCategory = require('../../../components/blogCategories/models/blogCategory');
const BlogTag = require('../../../components/blogTags/models/blogTag');
const User = require('../../../components/users/models/user');


new Promise((resolve) => {
    mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        promiseLibrary: require('bluebird')
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
        }
    ], (err, results) => {
        resolve(results);
        mongoose.connection.close();
    });
}).then((results) => {
    return new Promise((resolve) => {
        let items = [];
        let title;
        for (let i = 0; i < 20; i++) {
            title = faker.lorem.paragraph(1);
            items.push({
                category: _.sample(results[1])._id,
                tags: [
                    _.sample(results[2])._id,
                    _.sample(results[2])._id
                ],
                author: _.sample(results[0])._id,
                title: title,
                content: faker.lorem.paragraph(40),
                display: { image: faker.image.imageUrl },
                slug: getSlug(title),
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }
        resolve(items);
    });
}).then((items) => {
    seeder.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, function () {
        let data = [{
            model: 'blog_articles',
            documents: items
        }];
        seeder.loadModels(['./components/blogArticles/models/blogArticle']);
        seeder.clearModels(['blog_articles'], function () {
            seeder.populateModels(data, function () {
                seeder.disconnect();
            });
        });
    });
});
