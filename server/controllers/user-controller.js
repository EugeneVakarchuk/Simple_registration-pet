const UserService = require('../service/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const userService = require('../service/user-service');

// Creating class with all the relevant methods.
// All methods are in the try-catch block.
// If exception code function is thrown, a request will be sent to errorMiddleware.
class UserController {


  // Firsty, the registration method firsty validates the request.
  async registration(req, res, next) {
    try {

      // If error array is not empty, the code returns 'Validation error' with errors array and the rest of the code will not be executed.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error'), errors.array())
      }

      // If else username, email and password is received from the request body.
      const { username, email, password } = req.body;

      // Call registration function from UserService with this data and create userData.
      const userData = await UserService.registration(username, email, password)

      // Add refreshToken with httpOnly parameter to response.
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true })

      // Add userData in JSON format to response and return response.
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }


  async login(req, res, next) {
    try {

      // Email and password are receives from the request.
      const { email, password } = req.body;

      // Create userData using login function from userService class with this data.
      const userData = await userService.login(email, password);

      // Add refreshToken with httpOnly parameter to response.
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true })

      // Add userData in JSON format to response and return response.
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }


  async logout(req, res, next) {
    try {

      // Receives refreshToken from request.
      const { refreshToken } = req.cookies;

      // Receive token using with logout funktion from UserService class with refreshToken parameter.
      const token = await UserService.logout(refreshToken);

      // Clear this token in cookie storage.
      res.clearCookie('refreshToken');

      // Return this token to JSON format.
      return res.json(token);
    } catch (e) {
      next(e)
    }
  }


  async refresh(req, res, next) {
    try {

      // Receive refreshToken from request.
      const { refreshToken } = req.cookies;

      // Call refresh function from UserService with actual token.
      // Create new userData with new token.
      const userData = await UserService.refresh(refreshToken)

      // Update token.
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true })

      // Return userData in JSON format.
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }


  async getUsers(req, res, next) {
    try {

      // Create users list with getAllUsers function.
      const users = await userService.getAllUsers();

      // Return users list in JSON format.
      res.json(users)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UserController();