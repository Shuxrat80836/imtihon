import { DataSource } from "../../library/dataSource.js";
import { ResData } from "../../library/ResData.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { ProductClass } from "./product.entity/productClass.js";
import {
  FileIdNotFoundException,
  ProductNotFoundException,
} from "./productException/productException.js";
import { generateId } from "../../library/generationId.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

export class ProductService {
  createProduct(body) {
    const productPath = path.join(__dirname, "../../../database/products.json");
    const productData = new DataSource(productPath);
    const products = productData.read();
    const filePath = path.join(__dirname, "../../../database/files.json");
    const fileData = new DataSource(filePath);
    const files = fileData.read();
    const foundFile = files.find((file) => file.id === body.fileId);
    if (!foundFile) {
      throw new FileIdNotFoundException(
        `This ${body.fileId} not found.Please check it`
      );
    }
    const id = generateId();
    const newProduct = new ProductClass(
      id,
      foundFile.id,
      body.title,
      body.description,
      body.price
    );
    products.push(newProduct);
    productData.write(products);
    const resData = new ResData(
      "Product created successfully",
      201,
      newProduct
    );
    return resData;
  }
  static getProductById(id) {
    const productPath = path.join(__dirname, "../../../database/products.json");
    const productData = new DataSource(productPath);
    const products = productData.read();
    const foundProduct = products.find((product) => product.id === id);
    if (!foundProduct) {
      throw new ProductNotFoundException();
    }
    const resData = new ResData("Product found", 200, foundProduct);
    return resData;
  }
  getAllProducts() {
    const productPath = path.join(__dirname, "../../../database/products.json");
    const productData = new DataSource(productPath);
    const products = productData.read();
    const resData = new ResData("All products", 200, products);
    return resData;
  }

  updateProduct(body, id) {
    const productPath = path.join(__dirname, "../../../database/products.json");
    const productData = new DataSource(productPath);
    const products = productData.read();
    const filePath = path.join(__dirname, "../../../database/files.json");
    const fileData = new DataSource(filePath);
    const files = fileData.read();
    const foundFile = files.find((file) => file.id === body.fileId);
    if (!foundFile) {
      throw new FileIdNotFoundException(
        `This ${body.fileId} not found.Please check it`
      );
    }
    const foundProduct = this.getProductById(id);
    const foundedProduct = foundProduct.data;
    const [product] = products.splice(foundedProduct, 1);
    product.file_id = foundFile.id;
    product.title = body.titl;
    product.description = body.description;
    product.price = body.price;
    products.push(product);
    productData.write(products);
    const resData = new ResData("Product updated successfully", 200, product);
    return resData;
  }
  deleteProduct(id) {
    const productPath = path.join(__dirname, "../../../database/products.json");
    const productData = new DataSource(productPath);
    const products = productData.read();
    const foundProduct = products.findIndex((product) => product.id === id);
    const [deleteProduct] = products.splice(foundProduct, 1);
    productData.write(products);
    const resData = new ResData(
      "Product deleted successfully",
      200,
      deleteProduct
    );
    return resData;
  }
}
