const Request = require('../models/Request');
const paginationHelper = require('../../../helpers/paginationHelper');
const commonConstant = require('../../../constants/commonConstant');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');

class RequestRepository extends BaseRepository {
    model() {
        return Request;
    }

    async list(options = {}) {
        options.query.page = parseInt(options.query.page, 10) || 1;
        const search = new RegExp(options.query.search, 'i');
        const data = await this.model.paginate({
            email: search,
            deletedAt: null,
        }, {
            sort: { createdAt: -1 },
            page: options.query.page,
            limit: commonConstant.limit,
        });
        paginationHelper.setUpUrl(data, options);

        return data;
    }

    async approve(id) {
        const request = await this.model.findById(id).select('isApproved');
        request.isApproved = !request.isApproved;
        return request.save();
    }
}

module.exports = RequestRepository;
