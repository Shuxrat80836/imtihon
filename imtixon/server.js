import express from "express";
import { config } from "dotenv";
import multer from "multer";
import router from "./src/modules/app.module.js";
const app = express();
app.use(express.json());
app.use(express.static("uploads"));

config();

app.use("/", router);

const port = process.env.PORT || 7777;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
