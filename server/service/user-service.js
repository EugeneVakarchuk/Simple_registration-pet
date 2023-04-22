const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const UserDto = require('../dto/user-dto');
const ApiError = require('../exceptions/api-error');


// This class has static method which is called in user contoller.
// All methods are async because we are working with database.
class UserService {


  // Registration method recieves username, email and password.
  async registration(username, email, password) {

    // First, check if the database includes this email.
    const emailCanditate = await UserModel.findOne({ email });
    if (emailCanditate) {
      throw ApiError.BadRequest("User with this e-mail address already exists.", "email");
    };

    // Next, if the username included in database using the same method.
    const usernameCanditate = await UserModel.findOne({ username });
    if (usernameCanditate) {
      throw ApiError.BadRequest("User with this username already exists.", "username");
    };
    // Here, the exception code is thrown with message and field parameter. 
    // This parameter allows to understand which data have error on client side.

    // If this exceptions isn't thrown generate the salt and salting password.
    // Salting difficulty is stored in the env file.
    const salt = await bcrypt.genSalt(parseInt(process.env.JWT_SALT_DIFFICULTY))
    const hashPassword = await bcrypt.hash(password, salt);

    // Create user using schema from userSchema.
    const user = await UserModel.create({
      username,
      email,
      password: hashPassword,
    });

    // Create userDto (Data Transfer Object), without password data.
    const userDto = new UserDto(user);

    // Create tokens with generateTokens function with argument of object into spread userDto.
    const tokens = tokenService.generateTokens({ ...userDto });

    // Save or owerwrite refteshToken using saveToken function
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    // Return tokens and userDto in user variables, without password data.
    return {
      ...tokens,
      user: userDto
    }
  }


  // Login method receives email and password.
  async login(email, password) {

    // If user with this email not found in the databes, expeption will be thrown.
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw ApiError.BadRequest("User with this email not found", "email")
    };

    // If the user with this email is found in database, the next step is comparing password in request and in the database using the compare function in bcrypt library.
    // If passwords don't match, exception is thrown.  
    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest("Invalid password", "password")
    };

    // If exception isn't thrown create userDTO.
    const userDto = new UserDto(user);

    // Generate tokens.
    const tokens = tokenService.generateTokens({ ...userDto });

    // Save tokens.
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    // Return tokens and userDTO (without password).
    return {
      ...tokens,
      user: userDto
    }
  }


  // Logout function deletes refresh token.
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }


  // Refresh function is needed for updating refresh token. It receives old refresh token.
  async refresh(refreshToken) {

    // Check if the token is in arguments. If it's not, exception is thrown.
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    // Validate token.
    const userData = tokenService.validateRefreshToken(refreshToken);

    // Take token from db.
    const tokenFromDb = await tokenService.findToken(refreshToken);

    // Check that the validated token and the token from db are both there. If not, throw exception.
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    // Find user in database by id.
    const user = await UserModel.findById(userData.id);

    // Create user DTO. 
    const userDto = new UserDto(user);

    // Generate tokens.
    const tokens = tokenService.generateTokens({ ...userDto });

    // Save tokens.
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    // Return tokens and user data without password data.
    return {
      ...tokens,
      user: userDto
    }
  }


  // The 'getAllUsers' function doesn't have arguments. This function returns users array.
  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}


module.exports = new UserService()