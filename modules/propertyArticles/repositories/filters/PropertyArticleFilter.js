const QueryFilter = require('../../../../infrastructure/repositories/filters/QueryFilter');

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

    filterByPrice(builder, value) {
        let range;
        switch (value) {
            case '1':
                range = [0, 500];
                break;
            case '2':
                range = [500, 1000];
                break;
            case '3':
                range = [1000, 3000];
                break;
            case '4':
                range = [3000, 7000];
                break;
            case '5':
                range = [7000, 10000];
                break;
            case '6':
                range = [10000, 100000000000];
                break;
            case '7':
                return builder.where('price.isAgreement').equals(true);
            default:
                range = [0, 100000000000];
                break;
        }

        return builder.where('price.value').gt(range[0]).lt(range[1]);
    }
}

module.exports = PropertyArticleFilter;
