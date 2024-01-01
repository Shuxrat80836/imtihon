import { ResData } from "../../library/ResData.js";
import { ProductSchema } from "./Schema/productSchema.js";
import { ValidatedError } from "./productException/productException.js";
export class ProductController {
  #productService;
  constructor(productService) {
    this.#productService = productService;
  }

  async create(req, res) {
    try {
      const body = req.body;
      const validated = ProductSchema.validate(body);
      if (validated.error) {
        throw new ValidatedError(validated.error.message);
      }
      const response = await this.#productService.createProduct(body);
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

  async getOneProductById(req, res) {
    try {
      const Id = req.params?.id;
      const response = await this.#productService.getProductById(Id);
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

  async getAll(req, res) {
    try {
      const response = await this.#productService.getAllProducts();
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
  async productUpdate(req, res) {
    try {
      const body = req.body;
      const ID = req.params?.id;
      const validated = ProductSchema.validate(body);
      if (validated.error) {
        throw new ValidatedError(validated.error.message);
      }
      const response = await this.#productService.updateProduct(body, ID);
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

  async productDelete(req, res) {
    try {
      const id = req.params?.id;
      const response = await this.#productService.deleteProduct(id);
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
