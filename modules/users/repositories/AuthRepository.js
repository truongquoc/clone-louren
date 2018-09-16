const getSlug = require('speakingurl');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
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

    getForgotPasswordUser(data) {
        if (data.email) {
            return this.getDetail({ email: data.email });
        }
        return this.getDetail({ telephone: data.telephone });
    }

    async sendMail(user, url) {
        user.resetPasswordToken = await (new Promise((resolve, reject) => {
            crypto.randomBytes(20, (err, buf) => {
                if (err) {
                    reject(err);
                }
                const token = buf.toString('hex');
                resolve(token);
            });
        }));
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();
        const smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.emailAddress,
                pass: config.emailPassword,
            },
        });
        const mailOptions = {
            to: user.email,
            from: config.emailAddress,
            subject: 'Louren: Khôi phục mật khẩu',
            text: `Bạn nhận được mail này vì bạn (hoặc một người khác) đã yêu cầu khôi phục password cho tài khoản này.\n\n
			Hãy click vào link dưới đây, hoặc copy và paste đường link này vào trình duyệt của bạn:\n\n
			${url}/${user.resetPasswordToken}\n\n
			Nếu bạn không làm việc này, hãy bỏ qua mail này và mật khẩu của bạn sẽ không thay đổi\n\n`,
        };

        return smtpTransport.sendMail(mailOptions);
    }

    findUserWithToken(token) {
        return this.getDetail({
            resetPasswordToken: token,
        });
    }

    resetPassword(data, token) {
        const salt = bcrypt.genSaltSync(10);
        const user = {
            password: bcrypt.hashSync(data.newPassword, salt),
            resetPasswordToken: undefined,
            resetPasswordExpires: undefined,
        };
        return this.baseUpdate(user, { resetPasswordToken: token });
    }

    getCurrentUserData(user) {
        return {
            _id: user._id,
            roles: user.roles,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            slug: user.slug,
            createdAt: user.createdAt,
            token: jwt.sign({
                user,
            }, config.jwtSecret, { expiresIn: parseInt(config.sessionLifetime, 10) }),
        };
    }
}

module.exports = AuthRepository;
