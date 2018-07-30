const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

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

BlogTags.plugin(mongoosePaginate);

module.exports = mongoose.model('blog_tags', BlogTags);
