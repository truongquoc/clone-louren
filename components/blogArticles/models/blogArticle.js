const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const BlogArticle = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'blog_categories',
        required: true
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'blog_tags',
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    display: {
        image: {
            type: String
        },
        video: {
            type: String
        },
        useVideo: {
            type: Boolean,
            default: false
        }
    },
    isApprove: {
        type: Boolean,
        default: false
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

BlogArticle.plugin(mongoosePaginate);

module.exports = mongoose.model('blog_articles', BlogArticle);