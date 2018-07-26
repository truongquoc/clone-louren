const User = require('../models/user');
const BaseRepository = require('../../../infrastructure/repositories/baseRepository');
const RoleRepository = new (require('./roleRepository'))();

class UserRepository extends BaseRepository
{
    model() {
        return User;
    }

    getDetailByEmail(email) {
        return this.getDetailWithTrashed({ email: email });
    }

    async create(data) {
        const userRole = await RoleRepository.getDetailByName('User');
        const user = {
            roles: [userRole._id],
            name: data.name,
            email: data.email,
            password: data.password,
            telephone: data.telephone,
            gender: data.gender
        };

        return this.baseCreate(user);
    }
}

module.exports = UserRepository;
