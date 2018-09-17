const Cart = require('../../carts/models/Cart');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');

class CartRepository extends BaseRepository {
    model() {
        return Cart;
    }

    create(user) {
        return this.model.create({ user });
    }
}

module.exports = CartRepository;
