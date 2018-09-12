const Area = require('../models/Area');
const commonConstant = require('../../../constants/commonConstant');
const paginationHelper = require('../../../helpers/paginationHelper');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');

class AreaRepository extends BaseRepository {
    model() {
        return Area;
    }

    async listById(id, type, options) {
        if (type === 'articles') {
            const areas = await this.paginate({ propertyArticle: id }, options);
            paginationHelper.setUpUrl(areas, options);

            return areas;
        }
        // property projects
        return false;
    }

    store(data, id) {
        const areas = data.areas.map((area) => {
            const newArea = {
                propertyArticle: id,
                color: area.color || commonConstant.polygonColor,
                coordinates: {
                    shape: area.shape,
                },
            };
            if (area.shape === 1) {
                newArea.coordinates.polygon = area.coordinates;
            } else if (area.shape === 2) {
                newArea.coordinates.rectangle = area.coordinates;
            }
            return newArea;
        });

        return this.baseCreate(areas);
    }

    update(data) {
        const commands = [];
        for (let i = 0; i < data.areas.length; i += 1) {
            const area = data.areas[i];
            const editedArea = {
                coordinates: {
                    shape: area.shape,
                },
            };
            if (area.color) {
                editedArea.color = area.color;
            }
            if (area.shape === 1) {
                editedArea.coordinates.polygon = area.coordinates;
            } else if (area.shape === 2) {
                editedArea.coordinates.rectangle = area.coordinates;
            }
            commands.push(this.baseUpdate(editedArea, { _id: area._id }));
        }

        return Promise.all(commands);
    }

    delete(data) {
        return this.baseDelete({ _id: { $in: data.areas } });
    }
}

module.exports = AreaRepository;
