import Product from "../models/product.js"; 
import { isAdmin } from "./userController.js";

export async function getProducts(req, res) {
    try {
        const user = req.user; 
        let products;

        if (user && isAdmin(req)) {
            // Admin: View all products
            products = await Product.find();
        } else {
            // Guests and regular users: View only available products
            products = await Product.find({ isAvailable: true });
        }

        res.json(products);
    } catch (err) {
        res.status(500).json({
            message: "Failed to get products",
            error: err.message, // Error message to debug
        });
    }
}



// Save a new product
export function saveProducts(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            success: false,
            message: "Unauthorized",
        });
        return;
    }

    const newProduct = new Product(req.body);

    newProduct
        .save()
        .then(() => {
            res.status(201).json({
                success: true,
                message: "Product added successfully",
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: "Error saving product",
                error: error.message,
            });
        });
}

// Delete a product
export async function deleteProduct(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            success: false,
            message: "Unauthorized",
        });
        return;
    }

    try {
        await Product.deleteOne({ product_id: req.params.product_id });
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting product",
            error: error.message,
        });
    }
}

// Update a product
export async function updateProduct(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            success: false,
            message: "Unauthorized",
        });
        return;
    }

    try {
        await Product.updateOne({ product_id: req.params.product_id }, req.body);
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating product",
            error: error.message,
        });
    }
}

// Get product by ID
export async function getProductById(req, res) {
    const product_id = req.params.product_id;

    try {
        const product = await Product.findOne({ product_id: product_id });

        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found",
            });
            return;
        }

        if (product.isAvailable || isAdmin(req)) {
            res.status(200).json({
                success: true,
                data: product,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Product not available",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching product",
            error: error.message,
        });
    }
}
