const Constant = require('../../constants/commonConstant');
const PaginationHelper = require('../../helpers/pagination.helper');

class BaseRepository
{
    constructor() {
        if (new.target === BaseRepository/* || this.constructor !== BaseRepository*/) {
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
        options.query.page = (options.query.page === undefined) ? 1 : parseInt(options.query.page);
        conditions.deletedAt = null;
        const data = await this.model.paginate(conditions, { sort: { createdAt: -1 }, page: options.query.page, limit: Constant.limit });
        PaginationHelper.setUpUrl(data, options);

        return data;
    }

    get(conditions = {}, options) {
        conditions.deletedAt = null;

        return this.model.find(conditions).sort({ createdAt: -1 });
    }

    checkExist(conditions) {
        conditions.deletedAt = null;

        return this.model.findOne(conditions).select('_id');
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

        return this.model.update(conditions, data);
    }

    delete(conditions) {
        return this.baseUpdate({ deletedAt: new Date() }, conditions);
    }
}

module.exports = BaseRepository;
