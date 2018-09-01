class QueryFilter {
    apply(builder, params) {
        for (const param in params) {
            if (!Object.prototype.hasOwnProperty.call(params, param) || (typeof params[param] === 'string' && params[param] === '0')) {
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
