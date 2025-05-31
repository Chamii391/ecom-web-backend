import express from "express";
import { deleteProduct, getProducts, saveProducts } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/pro",getProducts);
productRouter.post("/",saveProducts);
productRouter.delete("/:product_id",deleteProduct);


export default productRouter; 