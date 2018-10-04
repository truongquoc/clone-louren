const mongoose = require('mongoose');
const getSlug = require('speakingurl');
const i18n = require('i18n');

const { Schema } = mongoose;

const BlogCategory = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    names: {
        en: {
            type: String,
            required: true,
            trim: true,
            // unique: true,
        },
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

BlogCategory.virtual('getName').get(function callback() {
    const locale = i18n.getLocale();
    if (locale === 'vi') {
        return this.name;
    }
    if (locale === 'en') {
        return this.names.en;
    }
    return '';
});

module.exports = mongoose.model('blog_categories', BlogCategory);
