const mongoose = require('mongoose');

const { Schema } = mongoose;

const BlogTags = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
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

module.exports = mongoose.model('blog_tags', BlogTags);
