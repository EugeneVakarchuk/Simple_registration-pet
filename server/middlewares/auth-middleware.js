const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token-service');


module.exports = function (req, res, next) {
  try {

    // Check if the request has an authorization header. If not, throw error. 
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.UnauthorizedError())
    }

    // Check if the header has a body. If not, throw error. 
    const accsessToken = authHeader.split(' ')[1];
    if (!accsessToken) {
      return next(ApiError.UnauthorizedError())
    }

    // Validate tokens. If false, throw error.
    const userData = tokenService.validateAccessToken(accsessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError())
    }

    // Write down token in request. And call next function.
    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError())
  }
}