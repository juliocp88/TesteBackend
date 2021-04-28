const returnError = function (event, error) {
    const code = error.httpStatusCode || 500;
    const body = {
        error: {
            code,
            message: error.message
        }
    };
    console.log('error');
    console.log(JSON.stringify(error));
    return event.status(code).json(body);
};

const returnSucess = function (event, body, statusCode = 200) {
    return event.status(statusCode).json(body);
};

module.exports = {
    returnError,
    returnSucess
};