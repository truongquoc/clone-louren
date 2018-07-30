const User = require('../models/User');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');
const RoleRepositoryClass = require('./RoleRepository');

const RoleRepository = new RoleRepositoryClass();

class UserRepository extends BaseRepository {
    model() {
        return User;
    }

    async create(data) {
        const userRole = await RoleRepository.getDetailByName('User');
        const user = {
            roles: [userRole._id],
            name: data.name,
            email: data.email,
            password: data.password,
            telephone: data.telephone,
            gender: data.gender,
        };

        return this.baseCreate(user);
    }
}

module.exports = UserRepository;
