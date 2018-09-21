const Info = require('../models/Info');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');

class InfoRepository extends BaseRepository {
    model() {
        return Info;
    }

    create(data) {
        const info = {
            title: data.title,
            company: data.company,
            deputy: data.deputy,
            tax: data.tax,
            phone: data.phone,
            fax: data.fax,
            location: data.location,
            email: data.email,
            security: data.security,
            google: data.google,
            facebook: data.facebook,
        };

        return this.baseCreate(info);
    }

    show() {
        return this.model.find().select('-createdAt -updatedAt -__v');
    }

    update(id, data) {
        return this.model.findByIdAndUpdate(id, data, { new: true, fields: '-_id -createdAt -updatedAt -__v' });
    }
}

module.exports = InfoRepository;
