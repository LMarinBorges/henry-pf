import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  paginateProducts,
  restoreProduct,
  updateProduct,
} from "./products.controller";

const productsRouter = Router();

productsRouter
  .get("/products", getAllProducts)
  .post("/products", createProduct)
  .get("/products/paginate/", paginateProducts)
  .get("/products/:productId", getProduct)
  .put("/products/:productId", updateProduct)
  .delete("/products/:productId", deleteProduct)
  .put("/products/restore/:productId", restoreProduct)


export default productsRouter;
