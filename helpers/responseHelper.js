const success = (data, useHashids = false) => {
    data = (typeof data !== 'object') ? [data] : data;

    return {
        status: true,
        data,
        error: {
            code: 0,
            message: [],
        },
    };
};

const error = (message, code = 500) => {
    message = (typeof message !== 'object') ? [message] : message;

    return {
        status: false,
        data: [],
        error: { code, message },
    };
};

const notFound = () => (
    error('RESOURCE_NOT_FOUND', 404)
);

const notAuthorized = () => (
    error('NOT_AUTHORIZED_FOR_THIS_URI', 403)
);

module.exports = {
    success, error, notFound, notAuthorized,
};
