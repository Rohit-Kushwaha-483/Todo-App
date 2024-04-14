// Utility function to send API responses and errors
const sendApiResponse = (res, status, success, message) => {
  return res.status(status).json({
    success: success,
    message: message,
  });
};

export const sendApiError = (res, status, message) => {
  return sendApiResponse(res, status, false, message);
};

export const sendSuccessResponse = (res, status, message) => {
  return sendApiResponse(res, status, true, message);
};
