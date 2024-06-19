const idNotFound = (h, message) => {
    const response = h.response({
        status: 'fail',
        message
    })

    response.code(404);
    return response;
}

const wrongRequirements = (h, message) => {
    const response = h.response({
        status: 'fail',
        message
    })

    response.code(400);
    return response;
}

const success = (h, message, responseCode = 200, data = null) => {
    const responseData = {
        status: 'success',
    };

    if (message !== undefined) {
        responseData.message = message;
    }
    if (data !== null){
        responseData.data =data;
    }

    const response = h.response(responseData);
    response.code(responseCode);
    return response;
}
module.exports = { idNotFound, wrongRequirements, success };