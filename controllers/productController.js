import Product from "../models/product.js"; 
import { isAdmin } from "./userController.js";

export async function getProducts(req, res) {
   /* Product.find()
        .then((data) => {
            res.json(data); 
        })
        .catch(() => {
            res.json({
                message: "Error fetching products",
            });
        });*/

        try{


            if(isAdmin(req)){
              const products = await Product.find()
              res.json(products)
            }
            else{
                const products = await Product.find({isAvailable: true})
                res.json(products)
            }

            
        }catch{
            res.json({
                message: "Error fetching products",
                error:err
            });
        
}
}




export function saveProducts(req, res) {

    if(!isAdmin(req)){
        res.status(403).json({
            message : "Unauthorized"
        })
        return
    }
    
   

    const newProduct = new Product(
        req.body
    );

    newProduct
        .save() 
        .then(() => {
            res.json({
                message: "Product Added Successfully",
            });
        })
        .catch(() => {
            res.json({
                message: "Error saving product",
                error: error.message,
                
            });
        });
}

export async function deleteProduct(req, res) {
    if(!isAdmin(req)){
        res.status(403).json({
            message : "Unauthorized"
        })
        return
    }

        try{

        await Product.deleteOne({product_id : req.params.product_id})
        res.status(403).json({
            message : "Product Deleted Successfully"
        })

    }catch(error){
        res.status(500).json({
            message : "Error deleting product",
            error : error.message
        })
    }
    
}




