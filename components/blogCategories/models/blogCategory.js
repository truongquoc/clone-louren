const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
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

BlogCategory.plugin(mongoosePaginate);

module.exports = mongoose.model('blog_categories', BlogCategory);
