const mongoose = require('mongoose');

const { Schema } = mongoose;

const Slide = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    title: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
        required: true,
    },
    url: {
        type: String,
        trim: true,
    },
    order: {
        type: Number,
        trim: true,
        default: 999,
    },
    deletedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('slides', Slide);
