const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const Upload = new Schema({
    url: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
    },
});

Upload.plugin(mongoosePaginate);

module.exports = mongoose.model('uploads', Upload);
