/* eslint-disable no-await-in-loop */
const faker = require('faker');
const getSlug = require('speakingurl');
const dateHelper = require('../../../helpers/dateHelper');
const UserRepositoryClass = require('../../../modules/users/repositories/UserRepository');
const DistrictRepositoryClass = require('../../../modules/districts/repositories/DistrictRepository');
const PropertyTypeRepositoryClass = require('../../../modules/propertyTypes/repositories/PropertyTypeRepository');
const PropertyStatusRepositoryClass = require('../../../modules/propertyStatuses/repositories/PropertyStatusRepository');
const PropertyCategoryRepositoryClass = require('../../../modules/propertyCategories/repositories/PropertyCategoryRepository');
const PropertyConditionRepositoryClass = require('../../../modules/propertyConditions/repositories/PropertyConditionRepository');
const PropertyAmenityRepositoryClass = require('../../../modules/propertyAmenities/repositories/PropertyAmenityRepository');
const PropertyArticle = require('../../../modules/propertyArticles/models/PropertyArticle');

const UserRepository = new UserRepositoryClass();
const DistrictRepository = new DistrictRepositoryClass();
const PropertyTypeRepository = new PropertyTypeRepositoryClass();
const PropertyStatusRepository = new PropertyStatusRepositoryClass();
const PropertyCategoryRepository = new PropertyCategoryRepositoryClass();
const PropertyConditionRepository = new PropertyConditionRepositoryClass();
const PropertyAmenityRepository = new PropertyAmenityRepositoryClass();

async function dropPropertyArticlesTable() {
    await PropertyArticle.remove({}, (err) => {});
}
async function fakePropertyArticles() {
    try {
        const [
            users,
            districts,
            propertyTypes,
            propertyStatuses,
            propertyCategories,
            propertyConditions,
            propertyAmenities,
        ] = await Promise.all([
            UserRepository.baseGet(),
            DistrictRepository.baseGet(),
            PropertyTypeRepository.baseGet(),
            PropertyStatusRepository.baseGet(),
            PropertyCategoryRepository.baseGet(),
            PropertyConditionRepository.baseGet(),
            PropertyAmenityRepository.baseGet(),
        ]);
        for (let i = 0; i < 40; i += 1) {
            const district = districts[Math.floor(Math.random() * districts.length)];
            const amenities = [];
            const conditions = [];
            const title = faker.lorem.words(10);
            let indexes = [];
            let loopTimes = 6;
            for (let j = 0; j < loopTimes; j += 1) {
                const index = Math.floor(Math.random() * propertyAmenities.length);
                if (indexes.indexOf(index) >= 0) {
                    loopTimes += 1;
                    continue;
                }
                indexes.push(index);
                amenities.push(propertyAmenities[index]._id);
            }
            indexes = [];
            loopTimes = 6;
            for (let j = 0; j < loopTimes; j += 1) {
                const index = Math.floor(Math.random() * propertyConditions.length);
                if (indexes.indexOf(index) >= 0) {
                    loopTimes += 1;
                    continue;
                }
                indexes.push(index);
                conditions.push({
                    condition: propertyConditions[index]._id,
                    quantity: Math.floor(Math.random() * 10),
                });
            }
            await PropertyArticle.create({
                author: users[Math.floor(Math.random() * users.length)]._id,
                category: propertyCategories[
                    Math.floor(Math.random() * propertyCategories.length)
                ]._id,
                type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)]._id,
                status: propertyStatuses[Math.floor(Math.random() * propertyStatuses.length)]._id,
                city: district.city,
                district: district._id,
                conditions,
                amenities,
                title,
                description: faker.lorem.paragraph(40),
                display: { image: faker.image.dataUri() },
                address: faker.address.streetAddress(),
                isApproved: true,
                slug: getSlug(`${title}-${dateHelper.getSlugCurrentTime()}`),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { dropPropertyArticlesTable, fakePropertyArticles };
