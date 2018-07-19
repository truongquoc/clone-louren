const Constant = require('../../constants/constants');

class BaseRepository
{
    constructor() {
        if (new.target === BaseRepository || this.constructor !== BaseRepository) {
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

    prePaginate(conditions, options) {
        options.page = parseInt(options.page) || 1;
        conditions.deletedAt = null;

        return this.model
            .paginate(conditions, { page: options.page, limit: Constant.limit })
            .sort({ createdAt: -1 });
    }

    async paginate(conditions = {}, options = {}) {
        const data = await this.prePaginate(conditions, options);

        data.firstPageUrl = `${options.pageUrl}?page=1`;
        data.lastPageUrl = `${options.pageUrl}?page=${data.pages}`;
        if (!options.page || (options.page >= 1 && options.page < data.pages)) {
            data.nextPageUrl = `${options.pageUrl}?page=${options.page + 1}`;
        }
        if (options.page > 1 && options.page <= data.pages) {
            data.previousPageUrl = `${options.pageUrl}?page=${options.page - 1}`;
        }
        delete data.limit;
        delete data.page;
        delete data.pages;

        return data;
    }

    get(conditions = {}, options) {
        conditions.deletedAt = null;

        return this.model.find(conditions).sort({ createdAt: -1 });
    }

    getDetail(conditions, options = {}) {
        conditions.deletedAt = null;

        return this.model.findOne(conditions);
    }

    create(data) {
        return this.model.create(data);
    }

    update(data, conditions) {
        return this.model.update(conditions, { $set: data });
    }

    delete(conditions) {
        return this.update({ deletedAt: new Date() }, conditions);
    }
}
