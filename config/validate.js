const { check } = require('express-validator/check');
const getSlug = require('speakingurl');

const User = require('../models/users/user.model');
const Article = require('../models/blog/article.model');
const Category = require('../models/blog/category.model');
const ChatRoom = require('../models/chat/chat-room.model');
const DateHelper = require('../helpers/dateHelper');

const loginRequest = [
    check('email')
        .not().isEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is invalid'),
    check('password')
        .not().isEmpty().withMessage('Password is required')
];

const registerRequest = [
    check('name')
        .not().isEmpty().withMessage('Name is required'),
    check('email')
        .not().isEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is invalid')
        .custom(value => {
            return User.findOne({ email: value }).then(user => {
                if (user) {
                    return Promise.reject('Email already in use');
                }
            })
        }),
    check('password')
        .not().isEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        .custom((value, { req }) => (
            value === req.body.password_confirmation
        )).withMessage('Password is not valid'), // not work. Weather API, Middleware
    check('password_confirmation')
        .not().isEmpty().withMessage('Password confirmation is required')
];

const createArticleRequest = [
    check('title')
        .not().isEmpty().withMessage('Title is required')
        .custom((value, { req }) => {
            const currentTime = DateHelper.getSlugCurrentTime();
            return Article.findOne({
                slug: getSlug(value) + '-' + currentTime
            }).then(article => {
                if (article) {
                    return Promise.reject('Path already in use');
                }
                req.attributes = {
                    createdTime: currentTime
                };
            });
        }),
    check('content')
        .not().isEmpty().withMessage('Content is required')
];

const editArticleRequest = [
    check('title')
        .not().isEmpty().withMessage('Title is required')
        .custom((value, { req }) => {
            return Article.findOne({
                _id: req.params.id,
            }).then(article => {
                // Get created time from article user want to edit --> concat to slug and find
                const createdTimes = article.slug.match(/[0-9]{16}/g);
                const createdTime = createdTimes[createdTimes.length - 1];

                return Article.findOne({
                    _id: { $ne: req.params.id },
                    slug: getSlug(value) + '-' + createdTime
                }).then(editedArticle => {
                    if (editedArticle) {
                        return Promise.reject('Path already in use');
                    }
                    req.attributes = {
                        createdTime: createdTime
                    };
                });
            });
        }),
    check('content')
        .not().isEmpty().withMessage('Content is required')
];

const createCategoryRequest = [
    check('name')
        .not().isEmpty().withMessage('Name is required')
        .custom(value => {
            return Category.findOne({ name: value, deletedAt: null }).then(category => {
                if (category) {
                    return Promise.reject('Category name already in use');
                }
            });
        }),
    check('slug')
        .custom(value => {
            return Category.findOne({ slug: value, deletedAt: null }).then(category => {
                if (category) {
                    return Promise.reject('Category slug already in use');
                }
            });
        })
];

const editCategoryRequest = [
    check('name')
        .not().isEmpty().withMessage('Name is required')
        .custom((value, { req }) => {
            return Category.findOne({ _id: { $ne: req.params.id }, name: value }).then(category => {
                if (category) {
                    return Promise.reject('Category name already in use');
                }
            });
        }),
    check('slug')
        .custom((value, { req }) => {
            return Category.findOne({ _id: { $ne: req.params.id }, slug: getSlug(value) }).then(category => {
                if (category) {
                    return Promise.reject('Slug already in use');
                }
            });
        })
];

const createChatRoomRequest = [
    check('name')
        .not().isEmpty().withMessage('Name is required')
        .custom((value, { req }) => {
            const currentTime = DateHelper.getSlugCurrentTime();
            const slug = getSlug(value) + '-' + currentTime;

            return ChatRoom.findOne({ slug: slug }).then(chatRoom => {
                if (chatRoom) {
                    return Promise.reject('Name already in use');
                }
                req.attributes = {
                    createdTime: currentTime
                }
            }).catch(err => {

            });
        })
];

const editChatRoomRequest = [
    check('name')
        .not().isEmpty().withMessage('Name is required')
        .custom((value, { req }) => {
            return ChatRoom.findOne({ _id: req.params.id }).then(chatRoom => {
                // Get created time from article user want to edit --> concat to slug and find
                const createdTimes = chatRoom.slug.match(/[0-9]{16}/g);
                const createdTime = createdTimes[createdTimes.length - 1];

                return ChatRoom.findOne({
                    _id: { $ne: req.params.id },
                    slug: getSlug(value) + '-' + createdTime
                }).then(chatRoom => {
                    if (chatRoom) {
                        return Promise.reject('Name already in use');
                    }
                    req.attributes = {
                        createdTime: createdTime
                    };
                }).catch(err => {

                });
            }).catch(err => {

            });
        })
];

module.exports = {
    loginRequest, registerRequest,
    createArticleRequest, editArticleRequest,
    createCategoryRequest, editCategoryRequest,
    createChatRoomRequest, editChatRoomRequest
};