const QueryFilter = require('../../../../infrastructure/repositories/filters/QueryFilter');
const commonConstant = require('../../../../constants/commonConstant');

class PropertyArticleFilter extends QueryFilter {
    filterByTitle(builder, value) {
        value = new RegExp(value, 'i');
        return builder.where('title').equals(value);
    }

    filterByCategory(builder, value) {
        return builder.where('category').equals(value);
    }

    filterByType(builder, value) {
        return builder.where('type').equals(value);
    }

    filterByStatus(builder, value) {
        return builder.where('status').equals(value);
    }

    filterByCity(builder, value) {
        return builder.where('city').equals(value);
    }

    filterByDistrict(builder, value) {
        return builder.where('district').equals(value);
    }

    filterByPriceType(builder, value) {
        return builder.where('price.type').equals(value);
    }

    filterByMinArea(builder, value) {
        return builder.where('area').gte(value);
    }

    filterByMaxArea(builder, value) {
        if (parseInt(value, 10) === commonConstant.maxArea) {
            return builder;
        }
        return builder.where('area').lte(value);
    }

    filterByMinPrice(builder, value) {
        return builder.where('price.value').gte(value);
    }

    filterByMaxPrice(builder, value) {
        if (parseInt(value, 10) === commonConstant.maxPrice) {
            return builder;
        }
        return builder.where('price.value').lte(value);
    }

    filterByAmenities(builder, value) {
        return builder.where('amenities').in(value);
    }

    filterByConditions(builder, value) {
        const conditions = [];
        Object.keys(value).forEach((condition) => {
            if (!parseInt(value[condition], 10)) {
                return;
            }
            conditions.push({
                condition,
                quantity: value[condition],
            });
        });
        builder = builder.where('conditions').equals({ $in: conditions });

        return builder;
    }
}

module.exports = PropertyArticleFilter;
