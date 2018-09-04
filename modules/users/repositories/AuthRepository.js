const getSlug = require('speakingurl');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');
const RoleRepositoryClass = require('./RoleRepository');

const RoleRepository = new RoleRepositoryClass();

class AuthRepository extends BaseRepository {
    model() {
        return User;
    }

    async login(data) {
        const user = await this.model.findOne({ email: data.email, deletedAt: null }).populate('roles', '-_id name');
        if (user && bcrypt.compareSync(data.password, user.password)) {
            return user;
        }

        return false;
    }

    async findUserWithSocialMedia(socialMedia) {
        const socialMediaName = `socialMedias.${socialMedia.name}`;
        const condition = {};
        if (socialMedia.name === 'google') {
            condition.$or = [{ socialMediaName: socialMedia.id }, { email: socialMedia.email }];
        } else {
            condition[socialMediaName] = socialMedia.id;
        }

        return this.model
            .findOne(condition)
            .populate('roles', '-_id name');
    }

    async facebookLogin(data) {
        const role = await RoleRepository.getDetailByName('User');
        const user = {
            roles: [role._id],
            name: `${data.name.givenName} ${data.name.familyName}`,
            avatar: data.photos[0].value,
            socialMedias: {
                facebook: data.id,
            },
            slug: data.id,
        };
        if (data.emails && data.emails[0].value) {
            user.email = data.emails[0].value;
            user.slug = getSlug(data.emails[0].value);
        }
        return this.baseCreate(user);
    }

    async googleLogin(data) {
        const role = await RoleRepository.getDetailByName('User');
        const user = {
            roles: [role._id],
            name: data.displayName,
            email: data.emails[0].value,
            avatar: data.photos[0].value,
            socialMedias: {
                google: data._json.id,
            },
            slug: getSlug(data.emails[0].value),
        };
        return this.baseCreate(user);
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
