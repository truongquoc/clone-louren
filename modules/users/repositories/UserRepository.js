const moment = require('moment');
const User = require('../models/User');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');
const RoleRepositoryClass = require('./RoleRepository');
const paginationHelper = require('../../../helpers/paginationHelper');

const RoleRepository = new RoleRepositoryClass();

class UserRepository extends BaseRepository {
    model() {
        return User;
    }

    async list(options) {
        options.query.page = parseInt(options.query.page, 10) || 1;
        const search = new RegExp(options.query.search, 'i');
        const conditions = { email: search, deletedAt: null };
        const users = await this.model.paginate(conditions, {
            populate: [{
                path: 'roles',
                select: '-_id name',
                sort: { createdAt: -1 },
            }],
        });
        paginationHelper.setUpUrl(users, options);

        return users;
    }

    show(slug) {
        return this.getUserWithRoles({ slug });
    }

    getUserWithRoles(condition) {
        condition.deletedAt = null;
        return this.model.findOne(condition).populate('roles', '_id name');
    }

    async create(data) {
        const userRole = await RoleRepository.getDetailByName('User');
        const salt = bcrypt.genSaltSync(10);
        const user = {
            roles: [userRole._id],
            name: data.name,
            email: data.email,
            password: bcrypt.hashSync(data.password, salt),
            telephone: data.telephone,
            gender: data.gender,
        };

        return this.baseCreate(user);
    }

    update(data, id) {
        const user = {
            name: data.name,
            email: data.email,
            telephone: data.telephone,
            roles: data.roles,
        };

        return this.baseUpdate(user, { _id: id });
    }

    updateProfile(data, id) {
        const user = {
            name: data.name,
            telephone: data.telephone,
            birthday: moment(data.birthday, 'DD/MM/YYYY'),
            gender: data.gender,
        };

        return this.baseUpdate(user, { _id: id });
    }
}

module.exports = UserRepository;
