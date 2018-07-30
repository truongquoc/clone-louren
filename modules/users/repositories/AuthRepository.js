const bcrypt = require('bcryptjs');
const User = require('../models/User');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');

class AuthRepository extends BaseRepository {
    model() {
        return User;
    }

    async login(data) {
        const user = await this.getDetail({ email: data.email });
        console.log(data.password, user);
        if (user && bcrypt.compareSync(data.password, user.password)) {
            return user;
        }

        return false;
    }
}

module.exports = AuthRepository;
