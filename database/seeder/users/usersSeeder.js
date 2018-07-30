require('dotenv/config');
const getSlug = require('speakingurl');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const seeder = require('mongoose-seed');
const RoleRepositoryClass = require('../../../modules/users/repositories/RoleRepository');

const RoleRepository = new RoleRepositoryClass();

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    promiseLibrary: bluebird,
});
RoleRepository.getDetailByName('Admin').then((role) => {
    const items = [{
        roles: [role._id],
        name: 'Tai.Ltq',
        email: 'tai.ltq@yopmail.com',
        password: '$2y$12$rfbQj9ML4GFxjqt568hVuubvFghOhrEsLTfuSxf/UkYhyK35GtklO',
        gender: 1,
        telephone: 123456789,
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: getSlug('tai.ltq@yopmail.com'),
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
