require('dotenv/config');
const getSlug = require('speakingurl');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const seeder = require('mongoose-seed');
const bcrypt = require('bcryptjs');
const RoleRepositoryClass = require('../../../modules/users/repositories/RoleRepository');

const RoleRepository = new RoleRepositoryClass();
const salt = bcrypt.genSaltSync(10);

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    promiseLibrary: bluebird,
});
RoleRepository.getDetailByName('Admin').then((role) => {
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

    const data = [{
        model: 'users',
        documents: items,
    }];

    seeder.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
        seeder.loadModels(['./modules/users/models/User']);
        seeder.clearModels(['users'], () => {
            seeder.populateModels(data, () => {
                seeder.disconnect();
            });
        });
    });
});
