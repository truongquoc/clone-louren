const stringHelper = require('../../../helpers/stringHelper');
const Request = require('../models/Request');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');

class RequestRepository extends BaseRepository {
    model() {
        return Request;
    }

    async list(options = {}) {
        const search = new RegExp(options.query.search, 'i');

        return this.paginate({ email: search }, options);
    }

    create(data) {
        const request = {
            name: data.name,
            email: data.email,
            telephone: data.telephone,
            title: data.title,
            content: stringHelper.parseTextareaContent(data.content),
        };

        return this.baseCreate(request);
    }

    async approve(id) {
        const request = await this.model.findById(id).select('isApproved');
        request.isApproved = !request.isApproved;
        return request.save();
    }
}

module.exports = RequestRepository;
