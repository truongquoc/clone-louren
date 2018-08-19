const BaseRepository = require('./BaseRepository');

class AssetRepository extends BaseRepository {
    constructor() {
        super();
        if (new.target === BaseRepository) {
            throw new TypeError('Cannot construct Abstract instances directly');
        }
    }

    async create(data) {
        let asset = await this.getDetailOnlyTrashed({
            $or: [{ name: data.name }],
        });
        if (asset) {
            asset.name = data.name;
            asset.createdAt = new Date();
            asset.deletedAt = null;

            return asset.save();
        }
        asset = {
            name: data.name,
        };

        return this.baseCreate(asset);
    }

    async update(data, id) {
        const asset = {
            name: data.name,
        };

        return this.model.findOneAndUpdate(
            { _id: id, deletedAt: null },
            asset,
            { new: true },
        );
    }
}

module.exports = AssetRepository;
