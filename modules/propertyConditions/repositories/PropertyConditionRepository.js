const AssetRepository = require('../../../infrastructure/repositories/AssetRepository');
const PropertyCondition = require('../models/PropertyCondition');

class PropertyConditionRepository extends AssetRepository {
    model() {
        return PropertyCondition;
    }

    async create(data) {
        let condition = await this.getDetailOnlyTrashed({
            $or: [{ name: data.name }],
        });
        if (condition) {
            condition.name = data.name;
            condition.icon = data.icon;
            condition.createdAt = new Date();
            condition.deletedAt = null;

            return condition.save();
        }
        condition = {
            name: data.name,
            icon: data.icon,
        };

        return this.baseCreate(condition);
    }

    async update(data, id) {
        const condition = {
            name: data.name,
            icon: data.icon,
        };

        return this.model.findOneAndUpdate(
            { _id: id, deletedAt: null },
            condition,
            { new: true },
        );
    }
}

module.exports = PropertyConditionRepository;
