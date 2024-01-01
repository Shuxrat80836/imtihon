import { Router } from "express";
import { FileService } from "./fileService.js";
import { AuthorizationMiddleware } from "../../library/middleware.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import { FileController } from "./fileController.js";
import multer from "multer";

const authorization = new AuthorizationMiddleware();

const fileService = new FileService();
const fileController = new FileController(fileService);

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

router.post("/single", upload.single("media"), (req, res) => {
  fileController.createFile(req, res);
});
router.get(
  "/",
  authorization.checkUser,
  authorization.authorization,
  authorization.adminRole,
  (req, res) => {
    fileController.getAll(req, res);
  }
);
router.get("/:id", (req, res) => {
  fileController.getOneFileById(req, res);
});

router.delete(
  "/delete/:id",
  authorization.checkUser,
  authorization.authorization,
  authorization.adminRole,
  (req, res) => {
    fileController.fileDelete(req, res);
  }
);

export default router;
