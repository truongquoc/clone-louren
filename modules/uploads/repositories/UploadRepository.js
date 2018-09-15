const commonConstant = require('../../../constants/commonConstant');
const paginationHelper = require('../../../helpers/paginationHelper');
const UserRepositoryClass = require('../../users/repositories/UserRepository');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');
const Upload = require('../models/Upload');

const UserRepository = new UserRepositoryClass();

class UploadRepository extends BaseRepository {
    model() {
        return Upload;
    }

    async list(id, options) {
        options.query.page = parseInt(options.query.page, 10) || 1;
        options.limit = options.limit || commonConstant.limit;
        const conditions = { deletedAt: null };
        if (options.query.search) {
            const search = new RegExp(options.query.search, 'i');
            const users = await UserRepository.baseGet({ name: search }, { select: '_id' });
            const userIds = users.map((user) => user._id);
            conditions.user = { $in: userIds };
        }
        if (id) {
            conditions.user = id;
        }
        const [total, docs] = await Promise.all([
            this.model.countDocuments(conditions),
            this.model
                .find(conditions)
                .populate('user', '-_id name')
                .skip((options.query.page - 1) * options.limit)
                .limit(options.limit)
                .sort({ createdAt: -1 })
                .select(options.select || '-deletedAt -__v'),
        ]);
        const data = { docs, total };
        paginationHelper.setUpUrl(data, options);

        return data;
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

    delete(ids) {
        return this.model.deleteMany({ _id: { $in: ids } });
    }

    deleteByUrl(images) {
        return this.model.deleteMany({ url: { $in: images } });
    }
}

module.exports = UploadRepository;
