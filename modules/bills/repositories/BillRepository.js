const Bill = require('../models/Bill');
const paginationHelper = require('../../../helpers/paginationHelper');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');
const commonConstant = require('../../../constants/commonConstant');
const storageHelper = require('../../../helpers/storage/storageHelper');

class BillRepository extends BaseRepository {
    model() {
        return Bill;
    }

    async listBills(id, options) {
        options.query.page = parseInt(options.query.page, 10) || 1;
        options.limit = commonConstant.clientLimit;
        const search = new RegExp(options.query.search, 'i');
        const conditions = {
            deletedAt: null,
        };
        if (id) {
            conditions.user = id;
        }
        const [total, docs] = await Promise.all([
            this.model.countDocuments(conditions),
            this.model
                .find(conditions)
                .populate('products', '-_id product quantity price')
                .skip((options.query.page - 1) * options.limit)
                .limit(options.limit)
                .sort({ createdAt: -1 }),

        ]);
        const data = { docs, total };
        paginationHelper.setUpUrl(data, options);

        return data;
    }
}

module.exports = BillRepository;
