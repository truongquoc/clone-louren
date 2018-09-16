const Cart = require('../models/Cart');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');

class CartRepository extends BaseRepository {
    model() {
        return Cart;
    }
}

module.exports = CartRepository;
