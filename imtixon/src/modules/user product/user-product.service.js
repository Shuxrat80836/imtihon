import { DataSource } from "../../library/dataSource.js";
import { ResData } from "../../library/ResData.js";
import { UserService } from "../user/user.service.js";
import { ProductService } from "../product/product.servce.js";
import { generateDate } from "../../library/date.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {
  ProductNotFoundException,
  UserNotFoundException,
  UserProductNotFound,
  UserProductNotFoundByProductId,
  UserProductNotFoundByUserId,
} from "./userProductException/userProductException.js";
import { UserProductClass } from "./userProductEntity/user-productClass.js";
import { generateId } from "../../library/generationId.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

export class UserProductService {
  create(body) {
    const userProductPath = path.join(
      __dirname,
      "../../../database/user_products.json"
    );
    const userProductData = new DataSource(userProductPath);
    const userProducts = userProductData.read();
    const foundUser = UserService.getOneUserByid(body.userId);
    if (!foundUser.data) {
      throw new UserNotFoundException(`This ${body.userId} not found`);
    }
    const foundProduct = ProductService.getProductById(body.productId);
    if (!foundProduct.data) {
      throw new ProductNotFoundException(`This ${body.productId} not found`);
    }
    const id = generateId();
    const newUserProduct = new UserProductClass(
      id,
      foundUser.data.id,
      foundProduct.data.id,
      body.count,
      generateDate(),
      foundProduct.data.price * body.count,
      "pending"
    );
    userProducts.push(newUserProduct);
    userProductData.write(userProducts);
    const resData = new ResData(
      "UserProduct created successfully",
      201,
      newUserProduct
    );
    return resData;
  }

  getByuserId(userId) {
    const userProductPath = path.join(
      __dirname,
      "../../../database/user_products.json"
    );
    const userProductData = new DataSource(userProductPath);
    const userProducts = userProductData.read();
    const filteredUsers = userProducts.filter(
      (userproduct) => userproduct.user_id === userId
    );
    if (filteredUsers.length === 0) {
      throw new UserProductNotFoundByUserId(
        `This userId not found from user-product's list`
      );
    }
    console.log(1);
    const resData = new ResData(`All of them`, 200, filteredUsers);
    return resData;
  }

  getByproductId(productId) {
    const userProductPath = path.join(
      __dirname,
      "../../../database/user_products.json"
    );
    const userProductData = new DataSource(userProductPath);
    const userProducts = userProductData.read();
    const filteredProducts = userProducts.filter(
      (userproduct) => userproduct.product_id === productId
    );
    if (filteredProducts.length === 0) {
      throw new UserProductNotFoundByProductId(
        `This productId not found from user-product's list`
      );
    }
    const resData = new ResData(`All of themm`, 200, filteredProducts);
    return resData;
  }

  delete(id) {
    const userProductPath = path.join(
      __dirname,
      "../../../database/user_products.json"
    );
    const userProductData = new DataSource(userProductPath);
    const userProducts = userProductData.read();
    const foundUserProduct = userProducts.findIndex(
      (userproduct) => userproduct.id === id
    );
    if (foundUserProduct === -1) {
      throw new UserProductNotFound(`This ${id} user-product not found`);
    }
    const [deleteFoundUserProduct] = userProducts.splice(foundUserProduct, 1);
    userProductData.write(userProducts);
    const resData = new ResData(
      "user-product deleted successfully",
      200,
      deleteFoundUserProduct
    );
    return resData;
  }

  userProductUpdate(body, id) {
    const userProductPath = path.join(
      __dirname,
      "../../../database/user_products.json"
    );
    const userProductData = new DataSource(userProductPath);
    const userProducts = userProductData.read();
    const foundUserProduct = userProducts.find(
      (userproduct) => userproduct.id === id
    );
    const [foundedUserProduct] = userProducts.splice(foundUserProduct, 1);
    const foundProduct = ProductService.getProductById(
      foundedUserProduct.product_id
    );
    if (!foundProduct) {
      throw new ProductNotFoundException(
        "Bu userProductning product_id topilmadi"
      );
    }
    foundedUserProduct.count = body.count;
    foundedUserProduct.status = body.status;
    foundedUserProduct.total_price =
      foundProduct.data.price * foundedUserProduct.count;

    userProducts.push(foundedUserProduct);
    userProductData.write(userProducts);

    const resData = new ResData(
      "user-product updated successfully",
      200,
      foundedUserProduct
    );
    return resData;
  }
}
