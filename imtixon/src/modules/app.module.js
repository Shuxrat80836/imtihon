import { Router } from "express";
import user from "./user/user.module.js";
import files from "./file/file.module.js";
import products from "./product/product.module.js";
import userproducts from "./user_product/user-product.module.js";

const router = Router();

router.use("/user", user);
router.use("/file", files);
router.use("/product", products);
router.use("/user-product", userproducts);

export default router;
