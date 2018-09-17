/* eslint-disable no-await-in-loop */
const ProductBillRepositoryClass = require('../../../modules/bills/repositories/ProductBillRepository');
const Bill = require('../../../modules/bills/models/Bill');
const UserRepositoryClass = require('../../../modules/users/repositories/UserRepository');

const ProductBillRepository = new ProductBillRepositoryClass();
const UserRepository = new UserRepositoryClass();

async function dropBillsTable() {
    await Bill.remove({}, (err) => {});
}
async function fakeBills() {
    try {
        const [
            users,
            productBill,
        ] = await Promise.all([
            UserRepository.baseGet(),
            ProductBillRepository.baseGet(),
        ]);
        for (let i = 0; i < 40; i += 1) {
            const randomProductBill = [];
            for (let j = 0; j < Math.floor(Math.random() * productBill.length); j += 1) {
                randomProductBill.push(productBill[j]._id);
            }
            await Bill.create({
                code: i,
                productBill: randomProductBill,
                user: users[Math.floor(Math.random() * users.length)]._id,
                price: Math.floor(Math.random() * 1000000),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { dropBillsTable, fakeBills };
