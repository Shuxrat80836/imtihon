export class ResData {
    constructor(message, statusCode = null, data = null, error = null) {
      this.message = message;
      this.statusCode = statusCode;
      this.data = data;
      this.error = error;
    }
  }
  