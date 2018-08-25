const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');
const Address = require('../models/Address');

class AddressRepository extends BaseRepository {
    model() {
        return Address;
    }

    store(data, id) {
        const addresses = data.addresses.map(address => ({
            propertyArticle: id,
            coordinate: [address.lat, address.lng],
        }));

        return this.baseCreate(addresses);
    }

    update(data) {
        const commands = [];
        for (let i = 0; i < data.addresses.length; i += 1) {
            commands.push(this.baseUpdate({
                coordinate: [data.addresses[i].lat, data.addresses[i].lng],
            }, { _id: data.addresses[i].id }));
        }

        return Promise.all(commands);
    }

    delete(data) {
        return this.baseDelete({ _id: { $in: data.addresses } });
    }
}

module.exports = AddressRepository;
