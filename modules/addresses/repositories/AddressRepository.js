const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');
const Address = require('../models/Address');
const paginationHelper = require('../../../helpers/paginationHelper');

class AddressRepository extends BaseRepository {
    model() {
        return Address;
    }

    async listById(id, type, options) {
        if (type === 'articles') {
            const addresses = await this.paginate({ propertyArticle: id }, options);
            paginationHelper.setUpUrl(addresses, options);

            return addresses;
        }
        // property projects
        return false;
    }

    store(data, id) {
        const addresses = data.addresses.map(address => ({
            propertyArticle: id,
            location: {
                type: 'Point',
                coordinates: [address.lat, address.lng],
            },
        }));

        return this.baseCreate(addresses);
    }

    update(data) {
        const commands = [];
        for (let i = 0; i < data.addresses.length; i += 1) {
            commands.push(this.baseUpdate({
                location: {
                    type: 'Point',
                    coordinates: [data.addresses[i].lat, data.addresses[i].lng],
                },
            }, { _id: data.addresses[i]._id }));
        }

        return Promise.all(commands);
    }

    delete(data) {
        return this.baseDelete({ _id: { $in: data.addresses } });
    }
}

module.exports = AddressRepository;
