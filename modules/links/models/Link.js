const mongoose = require('mongoose');

const { Schema } = mongoose;

const linkSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
    },
    stt: {
        type: Number,
        min: 0,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('links', linkSchema);
