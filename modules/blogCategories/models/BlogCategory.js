const mongoose = require('mongoose');
const getSlug = require('speakingurl');

const { Schema } = mongoose;

const BlogCategory = new Schema({
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

BlogCategory.pre('validate', function callback(next) {
    if (this.isModified('slug')) {
        this.slug = getSlug(this.slug || this.name);
    }
    next();
});

module.exports = mongoose.model('blog_categories', BlogCategory);
