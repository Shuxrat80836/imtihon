import { response } from "express";
import { ResData } from "../../library/ResData.js";
import { UserLoginSchema, UserSchema } from "./schema/user.schema.js";
import { UserValidatedError } from "./userException/userException.js";
export class UserController {
  #userService;
  constructor(userService) {
    this.#userService = userService;
  }
  async registerAdmin(req, res) {
    try {
      const body = req.body;
      const validated = UserSchema.validate(body);
      if (validated.error) {
        throw new UserValidatedError(validated.error.message);
      }
      const response = await this.#userService.registerForAdmin(body);
      res.status(201).json(response);
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

  async registerUser(req, res) {
    try {
      const body = req.body;
      const validated = UserSchema.validate(body);
      if (validated.error) {
        throw new UserValidatedError(validated.error.message);
      }
      const response = await this.#userService.registerForUser(body);
      res.status(201).json(response);
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

  async login(req, res) {
    try {
      const body = req.body;
      const validated = UserLoginSchema.validate(body);
      if (validated.error) {
        const resData = new ResData(validated.error.message);
        return resData;
      }
      const response = await this.#userService.login(body);
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

  async getUserById(req, res) {
    try {
      const Id = req.params?.id;
      const response = await this.#userService.getOneUserByid(Id);
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

  async getAllUsersByAdmin(req, res) {
    try {
      const response = await this.#userService.getAll();
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

  async deleteUser(req, res) {
    try {
      const ID = req.params?.id;
      const response = await this.#userService.userDelete(ID);
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
