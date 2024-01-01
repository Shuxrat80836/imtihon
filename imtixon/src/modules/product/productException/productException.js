export class ValidatedError extends Error {
  constructor(message) {
    super(message);
  }
}
export class FileIdNotFoundException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
export class ProductNotFoundException extends Error {
  constructor() {
    super("Product not found");
    this.statusCode = 404;
  }
}
