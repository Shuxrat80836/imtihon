import { ResData } from "../library/ResData.js";
import { verify } from "../library/jwt.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
import { DataSource } from "../library/dataSource.js";

export class AuthorizationMiddleware {
  authorization(req, res, next) {
    const userId = req.userId;
    console.log(userId);
    const userPath = path.join(__dirname, "../../database/users.json");
    const userData = new DataSource(userPath);
    const users = userData.read();

    const foundUser = users.find((user) => user.id === userId);
    console.log(userId);
    console.log(foundUser);
    if (foundUser && foundUser.role) {
      req.user = foundUser;
      return next();
    } else {
      const resData = new ResData(
        `Bu ${userId} aydili user topilmadi.Iltimos userlar listini tekshiring`
      );
      return res.status(403).json(resData);
    }
  }

  adminRole(req, res, next) {
    if (req.user.role === "admin") {
      next();
    } else {
      const resData = new ResData(
        "Bu userning roli admin emas.Iltimos qayta tekshiring!!!"
      );
      return res.status(403).json(resData);
    }
  }

  userRole(req, res, next) {
    if (req.user.role === "user") {
      next();
    } else {
      const resData = new ResData("Not access");
      return res.status(403).json(resData);
    }
  }

  checkUser(req, res, next) {
    try {
      const token = req.headers.token;

      console.log(token);
      const userId = verify(token);

      req.userId = userId;
      next();
    } catch (error) {
      console.log("error :", error);
      const resData = new ResData("invalid token");
      res.status(401).json(resData);
    }
  }
}
