const mongoose = require('mongoose');

const { Schema } = mongoose;

const BlogArticle = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'blog_categories',
        required: true,
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'blog_tags',
        // unique: true
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    display: {
        image: {
            type: String,
            trim: true,
        },
        video: {
            type: String,
            trim: true,
        },
        useVideo: {
            type: Boolean,
            default: false,
        },
    },
    isDraft: {
        type: Boolean,
        default: false,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    deletedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('blog_articles', BlogArticle);
