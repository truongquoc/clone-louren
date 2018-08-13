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
        conditions.deletedAt = null;
        const data = await this.model.paginate(conditions, {
            sort: { createdAt: -1 },
            populate: options.populate || [],
            page: options.query.page,
            limit: commonConstant.limit,
        });
        paginationHelper.setUpUrl(data, options);

        return data;
    }

    baseGet(conditions = {}, options) {
        conditions.deletedAt = null;

        return this.model.find(conditions).sort({ createdAt: -1 }).select('-createdAt -updatedAt -__v');
    }

    checkExist(conditions, options = {}) {
        conditions.deletedAt = null;

        return this.model.findOne(conditions).select(options.select || '_id');
    }

    checkExistWithTrashed(conditions, options = {}) {
        return this.model.findOne(conditions).select(options.select || '_id');
    }

    checkExistOnlyTrashed(conditions) {
        conditions.deletedAt = { $ne: null };

        return this.model.findOne(conditions).select('_id');
    }

    getDetail(conditions, options = {}) {
        conditions.deletedAt = null;

        return this.model.findOne(conditions);
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

        return this.model.update(conditions, { $set: data });
    }

    baseDelete(conditions) {
        return this.baseUpdate({ deletedAt: new Date() }, conditions);
    }

    delete(id) {
        return this.baseDelete({ _id: id });
    }
}

module.exports = BaseRepository;
