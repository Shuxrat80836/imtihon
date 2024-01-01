import { ResData } from "../../library/ResData.js";
import {
  UserProductSchema,
  UserProductUpdateSchema,
} from "./Schema/userProductSchema.js";
import { UserProductValidatedError } from "./userProductException/userProductException.js";
export class UserProductController {
  #userProductService;
  constructor(userProductService) {
    this.#userProductService = userProductService;
  }

  async createUserProduct(req, res) {
    try {
      const body = req.body;
      const validated = UserProductSchema.validate(body);
      if (validated.error) {
        throw new UserProductValidatedError(validated.error.message);
      }
      const response = await this.#userProductService.create(body);
      res.status(response.statusCode).json(response);
    } catch (err) {
      const resData = new ResData(
        err.message,
        err.statusCode || 500,
        null,
        err
      );
      res.status(resData.statusCode).json(resData);
    }
  }

  async getByUserId(req, res) {
    try {
      const userId = req.params?.userId;
      const response = await this.#userProductService.getByuserId(userId);
      res.status(response.statusCode).json(response);
    } catch (err) {
      const resData = new ResData(
        err.message,
        err.statusCode || 500,
        null,
        err
      );
      res.status(resData.statusCode).json(resData);
    }
  }

  async getByProductId(req, res) {
    try {
      const productId = req.params?.productId;
      const response = await this.#userProductService.getByproductId(productId);
      res.status(response.statusCode).json(response);
    } catch (err) {
      const resData = new ResData(
        err.message,
        err.statusCode || 500,
        null,
        err
      );
      res.status(resData.statusCode).json(resData);
    }
  }

  async deleteUserProduct(req, res) {
    try {
      const ID = req.params?.id;
      const response = await this.#userProductService.delete(ID);
      res.status(response.statusCode).json(response);
    } catch (err) {
      const resData = new ResData(
        err.message,
        err.statusCode || 500,
        null,
        err
      );
      res.status(resData.statusCode).json(resData);
    }
  }

  async updateUserProduct(req, res) {
    try {
      const body = req.body;
      const Id = req.params?.id;
      const validated = UserProductUpdateSchema.validate(body);
      if (validated.error) {
        throw new UserProductValidatedError(validated.error.message);
      }
      const response = await this.#userProductService.userProductUpdate(
        body,
        Id
      );
      res.status(response.statusCode).json(response);
    } catch (err) {
      const resData = new ResData(
        err.message,
        err.statusCode || 500,
        null,
        err
      );
      res.status(resData.statusCode).json(resData);
    }
  }
}
