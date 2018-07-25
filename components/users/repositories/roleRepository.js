const Role = require('../models/role');
const BaseRepository = require('../../../infrastructure/repositories/baseRepository');

class RoleRepository extends BaseRepository
{
    model() {
        return Role;
    }

    getDetailByName(name) {
        return this.getDetail({ name: name });
    }
}

module.exports = RoleRepository;