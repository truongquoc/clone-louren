const Link = require('../models/Link');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');

class LinkRepository extends BaseRepository {
    model() {
        return Link;
    }

    count() {
        return this.model.countDocuments();
    }

    findById(id) {
        return this.model.findById(id).select('-_id title url');
    }

    findByTitle(title) {
        return this.model.findOne({ title }).select('_id');
    }

    create(data) {
        const link = {
            title: data.title,
            url: data.url,
            stt: data.stt,
        };

        return this.baseCreate(link);
    }

    find() {
        return this.model.find().select('-_id title url').sort('stt');
    }

    show() {
        return this.model.find().select('title').sort('stt');
    }

    update(id, data) {
        return this.model.findByIdAndUpdate(id, data);
    }

    delete(id) {
        return this.model.findOneAndDelete(id);
    }
}

module.exports = LinkRepository;
