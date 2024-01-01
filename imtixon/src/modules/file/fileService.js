import { DataSource } from "../../library/dataSource.js";
import { ResData } from "../../library/ResData.js";
import { FileNotFoundException } from "./File.Exception/file.exception.js";
import path from "path";
import { dirname } from "path";
import { generateId } from "../../library/generationId.js";
import { fileURLToPath } from "url";
import { MulterClass } from "./file.entity/fileClass.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

export class FileService {
  fileCreate(file, body) {
    const filePath = path.join(__dirname, "../../../database/files.json");
    const fileData = new DataSource(filePath);
    const files = fileData.read();
    const id = generateId();
    const newFile = new MulterClass(
      id,
      file.path,
      file.mimetype,
      body,
      file.size
    );
    files.push(newFile);
    fileData.write(files);
    const resData = new ResData("File created successfully", 201, newFile);
    return resData;
  }
  getFileById(id) {
    const filePath = path.join(__dirname, "../../../database/files.json");
    const fileData = new DataSource(filePath);
    const files = fileData.read();
    const foundFile = files.find((file) => file.id === id);
    if (!foundFile) {
      throw new FileNotFoundException();
    }
    const resData = new ResData("File found", 200, foundFile);
    return resData;
  }

  getAllFiles() {
    const filePath = path.join(__dirname, "../../../database/files.json");
    const fileData = new DataSource(filePath);
    const files = fileData.read();

    const resData = new ResData("All files", 200, files);
    return resData;
  }

  deleteFile(id) {
    const filePath = path.join(__dirname, "../../../database/files.json");
    const fileData = new DataSource(filePath);
    const files = fileData.read();
    const foundFile = files.findIndex((file) => file.id === id);
    if (foundFile === -1) {
      throw new FileNotFoundException();
    }
    const [foundedFile] = files.splice(foundFile, 1);
    fileData.write(files);
    const resData = new ResData("File deleted successfully", 200, foundedFile);
    return resData;
  }
}
