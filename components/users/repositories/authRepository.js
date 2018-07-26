const bcrypt = require('bcryptjs');

const User = require('../models/user');
const BaseRepository = require('../../../infrastructure/repositories/baseRepository');

class AuthRepository extends BaseRepository
{
    model() {
        return User;
    }

    async login(data) {
        const user = await this.getDetail({ email: data.email });
        if (user && bcrypt.compareSync(data.password, user.password)) {
            return user;
        }

        return false;
    }
}

module.exports = AuthRepository;