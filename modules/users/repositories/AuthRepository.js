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

    async comparePassword(data, id) {
        const user = await this.getDetail({ _id: id }, { select: 'password' });
        return bcrypt.compareSync(data.password, user.password);
    }

    changePassword(data, id) {
        const salt = bcrypt.genSaltSync(10);
        const user = {
            password: bcrypt.hashSync(data.newPassword, salt),
        };
        return this.baseUpdate(user, { _id: id });
    }
}

module.exports = AuthRepository;
