const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');


// TokenService class has methods for work with tokens.
class TokenService {


  // Generate tokens using jwt sign method. Secret keys and lifetime come from env file.
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_LIFETIME })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_LIFETIME })

    // Return tokens.
    return {
      accessToken,
      refreshToken
    }
  }


  // Validate token using jwt verify method and return payload data.
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData
    } catch (e) {
      return null;
    }
  }


  // Validate token using jwt verify method and return payload data.
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData
    } catch (e) {
      return null;
    }
  }


  // This function creates new refreshToken or updates it.
  async saveToken(userId, refreshToken) {

    // Check if token using user id in database.
    const tokenData = await tokenModel.findOne({ user: userId })

    // If token was found in database update it and return with save method.
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save()
    }

    // If not create new refresh token and return it.
    const token = await tokenModel.create({ user: userId, refreshToken })
    return token
  }

  // Delete token in database.
  async removeToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  // Find token function using token.
  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ refreshToken });
    return tokenData;
  }
}

module.exports = new TokenService()