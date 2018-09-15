const Bill = require('../models/Bill');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');

class BillRepository extends BaseRepository {
    model() {
        return Bill;
    }
}

module.exports = BillRepository;
