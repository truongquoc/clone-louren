const mongoose = require('mongoose');

const { Schema } = mongoose;

/*
* Type: 1: article
*       2: avatar
* */
const Upload = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    type: {
        type: Number,
        required: true,
        default: 1,
        enum: [1, 2],
    },
    url: {
        type: String,
        required: true,
    },
    isOriginal: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
    },
});

module.exports = mongoose.model('uploads', Upload);
