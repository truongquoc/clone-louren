const commonConstant = require('../../constants/commonConstant');
const paginationHelper = require('../../helpers/paginationHelper');

class BaseRepository {
    constructor() {
        if (new.target === BaseRepository) {
            throw new TypeError('Cannot construct Abstract instances directly');
        }
        this.model = this.model();
    }

    /**
     * Return model to use other methods
     ** Implementation required
     */
    model() {
        throw new Error('You have to implement this method!');
    }

    async paginate(conditions = {}, options = {}) {
        options.query.page = parseInt(options.query.page, 10) || 1;
        options.limit = options.limit || commonConstant.limit;
        conditions.deletedAt = null;
        const [total, docs] = await Promise.all([
            this.model.count(conditions),
            this.model
                .find(conditions)
                .skip((options.query.page - 1) * options.limit)
                .limit(options.limit)
                .sort({ createdAt: -1 })
                .select(options.select || '-deletedAt -__v'),
        ]);
        const data = { docs, total };
        paginationHelper.setUpUrl(data, options);

        return data;
    }

    baseGet(conditions = {}, options) {
        conditions.deletedAt = null;

        return this.model.find(conditions).sort({ createdAt: -1 }).select('-createdAt -updatedAt -__v');
    }

    checkExist(conditions) {
        conditions.deletedAt = null;

        return this.model.findOne(conditions).select('_id');
    }

    checkExistMany(conditions) {
        conditions.deletedAt = null;

        return this.model.find(conditions).select('_id');
    }

    checkExistWithTrashed(conditions) {
        return this.model.findOne(conditions).select('_id');
    }

    checkExistOnlyTrashed(conditions) {
        conditions.deletedAt = { $ne: null };

        return this.model.findOne(conditions).select('_id');
    }

    getDetail(conditions, options = {}) {
        conditions.deletedAt = null;

        return this.model.findOne(conditions).select(options.select || '-createdAt -updatedAt -__v');
    }

    getDetailOnlyTrashed(conditions, options = {}) {
        conditions.deletedAt = { $ne: null };

        return this.model.findOne(conditions);
    }

    baseCreate(data) {
        return this.model.create(data);
    }

    baseUpdate(data, conditions) {
        conditions.deletedAt = null;

        return this.model.update(conditions, { $set: data }, { multi: true });
    }

    baseDelete(conditions) {
        return this.baseUpdate({ deletedAt: new Date() }, conditions);
    }

    deleteById(id) {
        return this.baseDelete({ _id: id });
    }
}

module.exports = BaseRepository;
