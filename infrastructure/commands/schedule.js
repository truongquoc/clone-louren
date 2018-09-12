const resetImageQuantity = require('../../modules/users/commands/resetImageQuantity');
const resetArticleQuantity = require('../../modules/users/commands/resetArticleQuantity');
const emptyImagesFolder = require('../../modules/users/commands/emptyImagesFolder');

const schedule = () => {
    resetImageQuantity();
    resetArticleQuantity();
    emptyImagesFolder();
};

module.exports = schedule;
