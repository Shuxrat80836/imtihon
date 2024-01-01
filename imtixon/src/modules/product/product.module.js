import { Router } from "express";
import { ProductController } from "./product.controller.js";
import { ProductService } from "./product.servce.js";
import { AuthorizationMiddleware } from "../../library/middleware.js";

const router = Router();

const authorization = new AuthorizationMiddleware();
const productService = new ProductService();
const productController = new ProductController(productService);

router.post(
  "/",
  authorization.checkUser,
  authorization.authorization,
  authorization.adminRole,
  (req, res) => {
    productController.create(req, res);
  }
);
router.get("/", (req, res) => {
  productController.getAll(req, res);
});
router.get("/:id", (req, res) => {
  productController.getOneProductById(req, res);
});
router.put(
  "/update/:id",
  authorization.checkUser,
  authorization.authorization,
  authorization.adminRole,
  (req, res) => {
    productController.productUpdate(req, res);
  }
);
router.delete(
  "/delete/:id",
  authorization.checkUser,
  authorization.authorization,
  authorization.adminRole,
  (req, res) => {
    productController.productDelete(req, res);
  }
);
export default router;
