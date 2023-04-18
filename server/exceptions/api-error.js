module.exports = class ApiError extends Error {
  status;
  field;
  errors;

  constructor(status, message, field, errors = []) {
    super(message);
    this.status = status;
    this.field = field;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'The user has not been authorized')
  }

  static BadRequest(message, field, errors = []) {
    return new ApiError(400, message, field, errors);
  }
}