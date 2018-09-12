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
        name: 'Tai.Ltq',
        email: 'tai.ltq@yopmail.com',
        password: bcrypt.hashSync('123123123', salt),
        gender: 1,
        telephone: 123456789,
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: getSlug('tai.ltq@yopmail.com'),
    },
    {
        roles: [role._id],
        name: 'vinh',
        email: '123@123.123',
        password: bcrypt.hashSync('123123123', salt),
        gender: 1,
        telephone: '123123123',
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: getSlug('123@123.123'),
    }];

    try {
        await User.create(items);
    } catch (e) {
        throw e;
    }
}

module.exports = { dropUsersTable, fakeUsers };
