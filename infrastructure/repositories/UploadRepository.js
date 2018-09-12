const BaseRepository = require('./BaseRepository');
const Upload = require('../models/Upload');

class UploadRepository extends BaseRepository {
    model() {
        return Upload;
    }

    listByArticles(id, options) {
        const condition = { type: 1 };
        if (id) {
            condition.user = id;
        }
        return this.paginate(condition, options);
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

module.exports = UploadRepository;
