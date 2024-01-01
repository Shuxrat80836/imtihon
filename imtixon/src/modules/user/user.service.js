import { DataSource } from "../../library/dataSource.js";
import { ResData } from "../../library/ResData.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { UserClass } from "./user.entity/userClass.js";
import { generateId } from "../../library/generationId.js";
import { jwtSign } from "../../library/jwt.js";
import { encrypt } from "../../library/bcrypt.js";
import { compare } from "../../library/bcrypt.js";
import {
  FoundUserByPhone,
  UserNotFoundException,
  UserPasswordIsInvalid,
} from "./userException/userException.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
export class UserService {
 
  registerForAdmin(body) {
    const userPath = path.join(__dirname, "../../../database/users.json");
    const userData = new DataSource(userPath);
    const users = userData.read();
    const foundUser = users.find((user) => user.phone === body.phone);
    if (foundUser) {
      throw new FoundUserByPhone();
    }
    const id = generateId();
    const token = jwtSign(id);
    const encryptPassword = encrypt(body.password);
    const newUser = new UserClass(
      id,
      body.phone,
      encryptPassword,
      body.fullName,
      "admin"
    );
    console.log(newUser);
    users.push(newUser);
    userData.write(users);
    const resData = new ResData("User created successfully", 201, {
      newUser,
      token,
    });
    return resData;
  }

  registerForUser(body) {
    const userPath = path.join(__dirname, "../../../database/users.json");
    const userData = new DataSource(userPath);
    const users = userData.read();
    const foundUser = users.find((user) => user.phone === body.phone);
    if (foundUser) {
      throw new FoundUserByPhone();
    }
    const id = generateId();
    const token = jwtSign(id);
    const encryptPassword = encrypt(body.password);
    const newUser = new UserClass(
      id,
      body.phone,
      encryptPassword,
      body.fullName,
      "user"
    );
    users.push(newUser);
    userData.write(users);
    const resData = new ResData("User created successfully", 201, {
      newUser,
      token,
    });
    return resData;
  }

  ////// login for all users   method : POST

  login(body) {
    const userPath = path.join(__dirname, "../../../database/users.json");
    const userData = new DataSource(userPath);
    const users = userData.read();
    const foundUser = users.find((user) => user.phone === body.phone);
    if (!foundUser) {
      throw new UserNotFoundException();
    }
    const compared = compare(body.password, foundUser.password);
    if (!compared) {
      throw new UserPasswordIsInvalid();
    }

    const newToken = jwtSign(foundUser.id);

    const resData = new ResData("login success", 200, {
      user: foundUser,
      token: newToken,
    });

    return resData;
  }

  static getOneUserByid(id) {
    const userPath = path.join(__dirname, "../../../database/users.json");
    const userData = new DataSource(userPath);
    const users = userData.read();

    const foundUser = users.find((user) => user.id === id);
    if (!foundUser) {
      throw new UserNotFoundException();
    }
    const resData = new ResData("Found user", 200, foundUser);
    return resData;
  }

  getAll() {
    const userPath = path.join(__dirname, "../../../database/users.json");
    const userData = new DataSource(userPath);
    const users = userData.read();

    const resData = new ResData("All users", 200, users);
    return resData;
  }
  userDelete(id) {
    const userPath = path.join(__dirname, "../../../database/users.json");
    const userData = new DataSource(userPath);
    const users = userData.read();
    const foundUser = users.findIndex((user) => user.id === id);
    if (foundUser === -1) {
      throw new UserNotFoundException();
    }
    const [foundedUser] = users.splice(foundUser, 1);
    userData.write(users);
    const resData = new ResData("User deleted successfully", 200, foundedUser);
    return resData;
  }
}
