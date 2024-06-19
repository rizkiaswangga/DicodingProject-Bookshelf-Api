/* Fungsi  ini akan dipanggil setiap kali server ingin membrikan response,
parameter berbeda tergantung jenis response : */

// Fungsi ini bertugas memngirimkan response berdasarkan parameter yang diinginkan :
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

// export setiap object property yang akan digunakan untuk membuat response :
module.exports = {
  failAddBook: (h, message) => createResponse(h, 'fail', message),
  idNotFound: (h, message) => createResponse(h, 'fail', message, 404),
  wrongRequirements: (h, message) => createResponse(h, 'fail', message, 400),
  success: (h, message, responseCode = 200, data = null) => createResponse(h, 'success', message, responseCode, data),
};
