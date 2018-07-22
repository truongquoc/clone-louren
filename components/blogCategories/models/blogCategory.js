const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const getSlug = require('speakingurl');

const Schema = mongoose.Schema;

const BlogCategory = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    deletedAt: {
        type: Date
    }
}, {
    timestamps: true
});

BlogCategory.pre('validate', function (next) {
    if (this.isModified('slug')) {
        this.slug = getSlug(this.slug || this.name);
    }
    next();
});

BlogCategory.plugin(mongoosePaginate);

module.exports = mongoose.model('blog_categories', BlogCategory);
