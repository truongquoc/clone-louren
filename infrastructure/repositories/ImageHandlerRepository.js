const BaseRepository = require('./BaseRepository');
const Upload = require('../models/Upload');

class ImageHandlerRepository extends BaseRepository {
    model() {
        return Upload;
    }

    listByArticles(options) {
        return this.paginate({
            type: 1,
        }, options);
    }

    create(locations, id, isOriginal = false) {
        locations = locations.map(location => ({
            user: id,
            type: 1,
            isOriginal,
            url: location,
            createdAt: new Date(),
        }));
        return this.model.insertMany(locations);
    }

    delete(locations) {
        return this.model.deleteMany({ url: { $in: locations } });
    }
}

module.exports = ImageHandlerRepository;
