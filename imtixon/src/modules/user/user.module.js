import { Router } from "express";
import { UserService } from "./user.service.js";
import { UserController } from "./user.controller.js";
import { AuthorizationMiddleware } from "../../library/middleware.js";

const authorization = new AuthorizationMiddleware();

const userService = new UserService();
const userController = new UserController(userService);

const router = Router();

router.post("/registeradmin", (req, res) => {
  userController.registerAdmin(req, res);
});
router.post("/registeruser", (req, res) => {
  userController.registerUser(req, res);
});
router.post("/login", (req, res) => {
  userController.login(req, res);
});
router.get(
  "/",
  authorization.checkUser,
  authorization.authorization,
  authorization.adminRole,
  (req, res) => {
    userController.getAllUsersByAdmin(req, res);
  }
);
router.get("/:id", (req, res) => {
  userController.getUserById(req, res);
});
router.delete(
  "/delete/:id",
  authorization.checkUser,
  authorization.authorization,
  authorization.adminRole,
  (req, res) => {
    userController.deleteUser(req, res);
  }
);
export default router;
