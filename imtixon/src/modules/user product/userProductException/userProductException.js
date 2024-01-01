export class UserNotFoundException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
export class ProductNotFoundException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
export class UserProductValidatedError extends Error {
  constructor(message) {
    super(message);
  }
}
export class UserProductNotFoundByUserId extends Error {
  constructor(message) {
    super(message);
  }
}
export class UserProductNotFoundByProductId extends Error {
  constructor(message) {
    super(message);
  }
}
export class UserProductNotFound extends Error {
  constructor(message) {
    super(message);
  }
}
