const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const District = new Schema({
    city: {
        type: Schema.Types.ObjectId,
        ref: 'cities',
        required: true
    },
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

District.plugin(mongoosePaginate);

module.exports = mongoose.model('districts', District);
