const moment = require('moment');
const bcrypt = require('bcryptjs');
const getSlug = require('speakingurl');
const commonConstant = require('../../../constants/commonConstant');
const paginationHelper = require('../../../helpers/paginationHelper');
const User = require('../models/User');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');
const RoleRepositoryClass = require('./RoleRepository');

const RoleRepository = new RoleRepositoryClass();

class UserRepository extends BaseRepository {
    model() {
        return User;
    }

    async list(options) {
        options.query.page = parseInt(options.query.page, 10) || 1;
        options.limit = commonConstant.limit;
        const search = new RegExp(options.query.search, 'i');
        const [total, docs] = await Promise.all([
            this.model.count({ email: search, deletedAt: null }),
            this.model
                .find({ email: search, deletedAt: null })
                .populate('roles', '-_id name', { deletedAt: null })
                .skip((options.query.page - 1) * options.limit)
                .limit(options.limit)
                .sort({ createdAt: -1 }),
        ]);
        const data = { docs, total };
        paginationHelper.setUpUrl(data, options);

        return data;
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
            slug: getSlug(data.email),
        };

        return this.baseCreate(user);
    }

    async update(data, id) {
        const user = await this.getDetail({ _id: id });
        user.name = data.name;
        user.email = data.email;
        user.telephone = data.telephone;
        user.roles = data.roles;
        user.images.max = data.imagesQuantity;

        return user.save();
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

    async addImagesQuantity(quantity, id) {
        const user = await this.getDetail({ _id: id }, { select: 'images' });
        if (user.images.uploaded + quantity > user.images.max) {
            throw new Error('Số lượng ảnh thêm vào đã vượt qua số lượng hôm nay');
        }
        user.images.uploaded += quantity;
        return user.save();
    }

    resetUploadedImages() {
        return this.baseUpdate({ uploadedImages: 0 }, { deletedAt: null });
    }
}

module.exports = UserRepository;
