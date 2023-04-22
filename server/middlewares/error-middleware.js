const ApiError = require('../exceptions/api-error');

// Error middleware checks if error instance is ApiError class and returns status code and data in JSON format.
module.exports = function (err, req, res, next) {
  console.log(err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, field: err.field, errors: err.errors })
  }
  // If error isn't instance of ApiError, status-code 500, and 'Unexpected error' message are returned.
  return res.status(500).json({ message: 'Unexpected error' })
};