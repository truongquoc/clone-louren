const Constant = require('../../constants/commonConstant');
const PaginationHelper = require('../../helpers/pagination.helper');

class BaseRepository
{
    constructor() {
        if (new.target === BaseRepository/* || this.constructor !== BaseRepository*/) {
            throw new TypeError("Cannot construct Abstract instances directly");
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
        // Pagination url
        PaginationHelper.setUpQueryParameters(data, 'pageUrl', options, false);
        if (options.query.page > 1) {
            PaginationHelper.setUpQueryParameters(data, 'prevPageUrl', options, -1);
        }
        PaginationHelper.setUpQueryParameters(data, 'currentPageUrl', options);
        if (!options.query.page || (options.query.page >= 1 && options.query.page < data.pages)) {
            PaginationHelper.setUpQueryParameters(data, 'nextPageUrl', options, 1);
        }

        return data;
    }

    get(conditions = {}, options) {
        conditions.deletedAt = null;

        return this.model.find(conditions).sort({ createdAt: -1 });
    }

    checkExist(conditions) {
        conditions.deletedAt = null;

        return this.model.count(conditions);
    }

    getDetail(conditions, options = {}) {
        conditions.deletedAt = null;

        return this.model.findOne(conditions);
    }

    create(data) {
        return this.model.create(data);
    }

    update(data, conditions) {
        conditions.deletedAt = null;

        return this.model.update(conditions, data);
    }

    async delete(conditions) {
        return await this.update({ deletedAt: new Date() }, conditions);
    }
}

module.exports.BaseRepository = BaseRepository;
