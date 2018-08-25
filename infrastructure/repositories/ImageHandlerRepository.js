const BaseRepository = require('./BaseRepository');
const Upload = require('../models/Upload');

class ImageHandlerRepository extends BaseRepository {
    model() {
        return Upload;
    }

    create(locations) {
        locations = locations.map(location => ({ url: location, createdAt: new Date() }));
        return this.model.insertMany(locations);
    }

    delete(locations) {
        return this.model.deleteMany({ url: { $in: locations } });
    }
}

module.exports = ImageHandlerRepository;
