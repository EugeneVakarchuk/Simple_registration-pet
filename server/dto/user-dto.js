// User Data Transfer Object.
module.exports = class UserDto {
  username;
  email;
  id;

  constructor(model) {
    this.username = model.username;
    this.email = model.email;
    this.id = model._id;
  }
}