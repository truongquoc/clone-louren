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
        options.query.page = Math.abs(parseInt(options.query.page, 10)) || 1;
        options.limit = options.limit || commonConstant.limit;
        conditions.deletedAt = null;
        const [total, docs] = await Promise.all([
            this.model.countDocuments(conditions),
            this.model
                .find(conditions)
                .skip((options.query.page - 1) * options.limit)
                .limit(options.limit)
                .sort(options.sort || { createdAt: -1 })
                .select(options.select || '-deletedAt -__v'),
        ]);
        const data = { docs, total };
        paginationHelper.setUpUrl(data, options);

        return data;
    }

    baseGet(conditions = {}, options = {}) {
        conditions.deletedAt = null;

        return this.model.find(conditions).sort({ createdAt: -1 }).select(options.select || '-createdAt -updatedAt -__v');
    }

    getManyByIds(id, options = {}) {
        const conditions = {
            deletedAt: null,
            _id: { $in: id },
        };

        return this.model.find(conditions).sort({ createdAt: -1 }).select(options.select || '-createdAt -updatedAt -__v');
    }

    checkExist(conditions, options = {}) {
        conditions.deletedAt = null;

        return this.model.findOne(conditions).select(options.select || '_id');
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

    getById(id, options = {}) {
        const conditions = {
            deletedAt: null,
            _id: id,
        };

        return this.model.findOne(conditions).select(options.select || '-createdAt -updatedAt -__v');
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

    baseRevert(conditions) {
        conditions.deletedAt = { $ne: null };
        return this.model.update(conditions, { deletedAt: undefined }, { multi: true });
    }

    revertById(id) {
        return this.model.update({ _id: id, deletedAt: { $ne: null } }, { deletedAt: undefined });
    }

    forceDelete(conditions) {
        return this.model.deleteMany(conditions);
    }

    baseCount(conditions = {}) {
        conditions.deletedAt = null;

        return this.model.countDocuments(conditions);
    }
}

module.exports = BaseRepository;
