class BaseRepository
{
    constructor() {
        if (new.target === BaseRepository) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        this.model = this.model();
    }

    /**
     * Implementation required
     */
    model() {
        throw new Error('You have to implement the method doSomething!');
    }

    get(conditions = {}, options = {}) {
        const pagination = {
            limit: options.limit || 15,
            skip: ((options.page || 1) - 1) * limit
        };

        conditions.deletedAt = null;
        let query = this.model.find(conditions);
        // Put more conditions here
        query.sort({ createdAt: -1 });
        query.skip(pagination.skip);
        query.limit(pagination.limit);

        return query;
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
