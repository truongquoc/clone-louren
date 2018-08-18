const bcrypt = require('bcryptjs');
const User = require('../models/User');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');

class AuthRepository extends BaseRepository {
    model() {
        return User;
    }

    async login(data) {
        const user = await this.model.findOne({ email: data.email }).populate('roles', '-_id name');
        if (user && bcrypt.compareSync(data.password, user.password)) {
            return user;
        }

        return false;
    }
}

module.exports = AuthRepository;
