import { Router } from "express";
import { UserProductService } from "./user-product.service.js";
import { UserProductController } from "./user-product.controller.js";
import { AuthorizationMiddleware } from "../../library/middleware.js";

const router = Router();

const authorization = new AuthorizationMiddleware();
const userProductService = new UserProductService();
const userProductController = new UserProductController(userProductService);

router.post(
  "/",
  authorization.checkUser,
  authorization.authorization,
  authorization.userRole,
  (req, res) => {
    userProductController.createUserProduct(req, res);
  }
);
router.get("/userId/:userId", (req, res) => {
  userProductController.getByUserId(req, res);
});
router.get("/productId/:productId", (req, res) => {
  userProductController.getByProductId(req, res);
});
router.delete(
  "/delete/:id",
  authorization.checkUser,
  authorization.authorization,
  authorization.adminRole,
  (req, res) => {
    userProductController.deleteUserProduct(req, res);
  }
);
router.put("/update/:id", (req, res) => {
  userProductController.updateUserProduct(req, res);
});

export default router;
