export class UserNotFoundException extends Error {
  constructor() {
    super("User not found by phone number");
    this.statusCode = 404;
  }
}
export class UserPasswordIsInvalid extends Error {
  constructor() {
    super("Wrong password");
    this.statusCode = 400;
  }
}
export class UserValidatedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
export class FoundUserByPhone extends Error {
  constructor() {
    super("This phone number is available");
    this.statusCode = 400;
  }
}
