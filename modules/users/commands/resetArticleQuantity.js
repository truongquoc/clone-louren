const cron = require('node-cron');
const UserRepositoryClass = require('../repositories/UserRepository');

const UserRepository = new UserRepositoryClass();

function resetImageQuantity() {
    cron.schedule('0 0 * * *', async () => {
        try {
            await UserRepository.resetPublishedArticles();
        } catch (e) {
            throw e;
        }
    });
}

module.exports = resetImageQuantity;
