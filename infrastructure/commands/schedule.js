const resetImageQuantity = require('../../modules/users/commands/resetImageQuantity');
const resetArticleQuantity = require('../../modules/users/commands/resetArticleQuantity');

const schedule = () => {
    resetImageQuantity();
    resetArticleQuantity();
};

module.exports = schedule;
