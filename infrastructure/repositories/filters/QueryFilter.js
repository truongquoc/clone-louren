class QueryFilter {
    apply(builder, params) {
        for (let param in params) {
            if (!Object.prototype.hasOwnProperty.call(params, param)) {
                continue;
            }
            const type = param.charAt(0).toUpperCase() + param.slice(1);
            if (this[`filterBy${type}`]) {
                builder = this[`filterBy${type}`](builder, params[param]);
            }
        }
        return builder;
    }
}

module.exports = QueryFilter;
