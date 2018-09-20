require('dotenv/config');
const getSlug = require('speakingurl');
const bcrypt = require('bcryptjs');
const User = require('../../../modules/users/models/User');
const RoleRepositoryClass = require('../../../modules/users/repositories/RoleRepository');

const RoleRepository = new RoleRepositoryClass();
const salt = bcrypt.genSaltSync(10);

async function dropUsersTable() {
    await User.remove({}, (err) => {});
}

async function fakeUsers() {
    const role = await RoleRepository.getDetailByName('Admin');

    const items = [{
        roles: [role._id],
        name: 'Admin',
        email: 'mayhienhome@gmail.com',
        password: bcrypt.hashSync('1', salt),
        avatar: '/public/admin/img/default-150x150.png',
        gender: 1,
        telephone: 123456789,
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: getSlug('mayhienhome@gmail.com'),
    }];

    try {
        await User.create(items);
    } catch (e) {
        throw e;
    }
}

module.exports = { dropUsersTable, fakeUsers };
