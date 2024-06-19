const createResponse = (h, status, message, responseCode = 500, data = null) => {
  const responseData = {
    status,
  };

  if (message !== undefined) {
    responseData.message = message;
  }
  if (data !== null) {
    responseData.data = data;
  }

  const response = h.response(responseData);
  response.code(responseCode);
  return response;
};
module.exports = {
  failAddBook: (h, message) => createResponse(h, 'fail', message),
  idNotFound: (h, message) => createResponse(h, 'fail', message, 404),
  wrongRequirements: (h, message) => createResponse(h, 'fail', message, 400),
  success: (h, message, responseCode = 200, data = null) => createResponse(h, 'success', message, responseCode, data),
};
