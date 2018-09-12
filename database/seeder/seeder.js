const Listr = require('listr');
require('dotenv/config');
const mongoose = require('mongoose');
const { dbUrl } = require('../../config/config');
const { dropRequestsTable, fakeRequests } = require('./requests/requestsSeeder');
const { dropCitiesTable, fakeCities } = require('./location/citiesSeeder');
const { dropDistrictsTable, fakeDistricts } = require('./location/districtsSeeder');
const { dropPropertyAmenitiesTable, fakePropertyAmenities } = require('./property/amenitiesSeeder');
const { dropPropertyConditionsTable, fakePropertyConditions } = require('./property/conditionsSeeder');
const { dropPropertyCategoriesTable, fakePropertyCategories } = require('./property/categoriesSeeder');
const { dropPropertyTypesTable, fakePropertyTypes } = require('./property/typesSeeder');
const { dropPropertyStatusesTable, fakePropertyStatuses } = require('./property/statusesSeeder');
const { dropPriceTypesTable, fakePriceTypes } = require('./property/priceTypesSeeder');
const { dropPropertyArticlesTable, fakePropertyArticles } = require('./property/articlesSeeder');
const { dropBlogCategoriesTable, fakeBlogCategories } = require('./blog/categoriesSeeder');
const { dropBlogTagsTable, fakeBlogTags } = require('./blog/tagsSeeder');
const { dropBlogArticlesTable, fakeBlogArticles } = require('./blog/articlesSeeder');

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
    if (err) {
        throw new Error(`Unable to connect to database: ${err.toString()}`);
    }
});

const pumpItUp = () => [
    ...[
        {
            title: 'Drop requests table👌',
            task: async () => {
                await dropRequestsTable();
            },
        },
        {
            title: 'Create simple data for Request model👌',
            task: async () => {
                await fakeRequests();
            },
        },
        {
            title: 'Drop cities table👌',
            task: async () => {
                await dropCitiesTable();
            },
        },
        {
            title: 'Create simple data for City model👌',
            task: async () => {
                await fakeCities();
            },
        },
        {
            title: 'Drop districts table👌',
            task: async () => {
                await dropDistrictsTable();
            },
        },
        {
            title: 'Create simple data for District model👌',
            task: async () => {
                await fakeDistricts();
            },
        },
        {
            title: 'Drop property amenities table👌',
            task: async () => {
                await dropPropertyAmenitiesTable();
            },
        },
        {
            title: 'Create simple data for PropertyAmenity model👌',
            task: async () => {
                await fakePropertyAmenities();
            },
        },
        {
            title: 'Drop property conditions table👌',
            task: async () => {
                await dropPropertyConditionsTable();
            },
        },
        {
            title: 'Create simple data for PropertyCondition model👌',
            task: async () => {
                await fakePropertyConditions();
            },
        },
        {
            title: 'Drop property categories table👌',
            task: async () => {
                await dropPropertyCategoriesTable();
            },
        },
        {
            title: 'Create simple data for PropertyCategory model👌',
            task: async () => {
                await fakePropertyCategories();
            },
        },
        {
            title: 'Drop property types table👌',
            task: async () => {
                await dropPropertyTypesTable();
            },
        },
        {
            title: 'Create simple data for PropertyType model👌',
            task: async () => {
                await fakePropertyTypes();
            },
        },
        {
            title: 'Drop property statuses table👌',
            task: async () => {
                await dropPropertyStatusesTable();
            },
        },
        {
            title: 'Create simple data for PropertyStatus model👌',
            task: async () => {
                await fakePropertyStatuses();
            },
        },
        {
            title: 'Drop price types table👌',
            task: async () => {
                await dropPriceTypesTable();
            },
        },
        {
            title: 'Create simple data for PriceType model👌',
            task: async () => {
                await fakePriceTypes();
            },
        },
        {
            title: 'Drop property articles table👌',
            task: async () => {
                await dropPropertyArticlesTable();
            },
        },
        {
            title: 'Create simple data for PropertyArticle model👌',
            task: async () => {
                await fakePropertyArticles();
            },
        },
        {
            title: 'Drop blog categories table👌',
            task: async () => {
                await dropBlogCategoriesTable();
            },
        },
        {
            title: 'Create simple data for BlogCategory model👌',
            task: async () => {
                await fakeBlogCategories();
            },
        },
        {
            title: 'Drop blog tags table👌',
            task: async () => {
                await dropBlogTagsTable();
            },
        },
        {
            title: 'Create simple data for BlogTag model👌',
            task: async () => {
                await fakeBlogTags();
            },
        },
        {
            title: 'Drop blog articles table👌',
            task: async () => {
                await dropBlogArticlesTable();
            },
        },
        {
            title: 'Create simple data for BlogArticle model👌',
            task: async () => {
                await fakeBlogArticles();
            },
        },
    ],
];

async function kickoff(tasks) {
    await tasks.run();
    process.exit();
}

const pumpIt = pumpItUp();
kickoff(new Listr(pumpIt));
