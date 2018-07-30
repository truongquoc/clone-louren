const Role = require('../models/Role');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');

class RoleRepository extends BaseRepository {
    model() {
        return Role;
    }

    getDetailByName(name) {
        return Role.findOne({ name });
    }
}

module.exports = RoleRepository;
