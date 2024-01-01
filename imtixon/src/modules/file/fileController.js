import { ResData } from "../../library/ResData.js";
export class FileController {
  #fileService;
  constructor(fileService) {
    this.#fileService = fileService;
  }

  async createFile(req, res) {
    try {
      const file = req.file;
      const body = req.body.originalName;
      const response = await this.#fileService.fileCreate(file, body);
      res.status(response.statusCode).json(response);
      console.log(req.file);
      console.log("body :", req.body.originalName);
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

  async getOneFileById(req, res) {
    try {
      const Id = req.params?.id;
      const response = await this.#fileService.getFileById(Id);
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
      const response = this.#fileService.getAllFiles();
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

  async fileDelete(req, res) {
    try {
      const ID = req.params?.id;
      const response = await this.#fileService.deleteFile(ID);
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
