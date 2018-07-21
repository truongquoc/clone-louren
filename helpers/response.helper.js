const success = (data) => {
    data = (typeof data !== 'object') ? [data] : data;

    return {
        status: true,
        data: data,
        error: {
            code: 0,
            message: []
        }
    };
};

const error = (message, code = 500) => {
    message = (typeof data !== 'object') ? [message] : message;

    return {
        status: false,
        data: [],
        error: {
            code: code,
            message: message
        }
    };
};

const notFound = () => {
    return error('RESOURCE_NOT_FOUND');
};

const notAuthorized = () => {
    return error('NOT_AUTHORIZED_FOR_THIS_URI', 401);
};

module.exports = { success, error, notFound, notAuthorized };