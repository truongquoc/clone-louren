const Area = require('../models/Area');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');

class AreaRepository extends BaseRepository {
    model() {
        return Area;
    }

    store(data, id) {
        const areas = data.areas.map(area => ({
            propertyArticle: id,
            coordinates: area.coordinates,
            color: area.color,
        }));

        return this.baseCreate(areas);
    }

    update(data) {
        const commands = [];
        for (let i = 0; i < data.areas.length; i += 1) {
            commands.push(this.baseUpdate({
                coordinates: data.areas[i].coordinates,
                color: data.areas[i].color,
            }, { _id: data.areas[i].id }));
        }

        return Promise.all(commands);
    }

    delete(data) {
        return this.baseDelete({ _id: { $in: data.areas } });
    }
}

module.exports = AreaRepository;
