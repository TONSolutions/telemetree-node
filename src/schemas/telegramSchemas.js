class BaseUser {
  constructor({ id, firstName, lastName = null, username = null }) {
    if (!id || !firstName) {
      throw new Error("BaseUser requires 'id' and 'firstName'.");
    }
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
  }
}

class FromUser extends BaseUser {
  constructor({
    id,
    firstName,
    lastName,
    username,
    isBot = false,
    languageCode = null
  }) {
    super({ id, firstName, lastName, username });
    this.isBot = isBot;
    this.languageCode = languageCode;
  }
}

module.exports = { BaseUser, FromUser };
