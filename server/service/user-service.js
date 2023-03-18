const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dto/user-dto');

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw new Error(`User with this e-mail address already exists.`);
    };
    const salt = await bcrypt.genSalt(7)
    const hashPassword = await bcrypt.hash(password, salt);

    const activationlink = uuid.v4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationlink
    });

    await mailService.sendActivationMail(email, activationlink);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto
    }
  }
}


module.exports = new UserService()