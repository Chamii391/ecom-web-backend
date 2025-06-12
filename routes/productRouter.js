import express from "express";
import { deleteProduct, getProductById, getProducts, saveProducts, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/pro",getProducts);
productRouter.post("/",saveProducts);
productRouter.delete("/:product_id",deleteProduct);
productRouter.put("/:product_id",updateProduct);
productRouter.get("/:product_id",getProductById);


export default productRouter; 