const Slide = require('../models/Slide');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');

class SlideRepository extends BaseRepository {
    model() {
        return Slide;
    }

    async homeGetSlides() {
        return this.model
            .find({
                deletedAt: null,
            })
            .sort({ order: 1 })
            .limit(5)
            .select('-deletedAt -createdAt -updatedAt -__v');
    }

    async list(query = {}) {
        const conditions = {
            deletedAt: null,
            title: new RegExp(query.search, 'i'),
        };
        return this.model
            .find(conditions)
            .sort({ order: 1 })
            .select('-deletedAt -__v');
    }

    create(data, user) {
        const slide = {
            user: user._id,
            title: data.title,
            image: data.image,
            url: data.url,
        };

        return this.baseCreate(slide);
    }

    update(data, id) {
        const slide = {
            title: data.title,
            url: data.url,
        };
        if (data.image) {
            slide.image = data.image;
        }

        return this.baseUpdate(slide, { _id: id });
    }

    changeOrder(ids) {
        const commands = ids.map((id, index) => this.baseUpdate({ order: index + 1 }, { _id: id }));

        return Promise.all(commands);
    }
}

module.exports = SlideRepository;
