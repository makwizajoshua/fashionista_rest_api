import express from "express";
import ProductController from "../controllers/productController.mjs";

const productRouter = express.Router();

// Create a new product in the db
productRouter.post("/products", async (req, res, next) => await new ProductController().createProduct(req, res, next));

// Get all products from db
productRouter.get("/products", async (req, res, next) => await new ProductController().getAllProducts(req, res, next));

// Get a particular product from db
productRouter.get("/product/:id", async (req, res, next) => {
    if (!req.params.id) {
        res.status(400).send({ "error": "Product ID is required" });
    } else {
        await new ProductController().getProduct(req, res, next);
    }
});
// Get a particular product from db
productRouter.get("/products/:id", async (req, res, next) => {
    if (!req.params.id) {
        res.status(400).send({ "error": "Business ID is required" });
    } else {
        await new ProductController().getProductFromBusiness(req, res, next);
    }
});
// Update a product in the db
productRouter.put("/products/:id", async (req, res, next) => {
    if (!req.params.id) {
        res.status(400).send({ "error": "Product ID is required" });
    } else {
        await new ProductController().updateProduct(req, res, next);
    }
});

// Delete a product from the db
productRouter.delete("/products/:id", async (req, res, next) => {
    if (!req.params.id) {
        res.status(400).send({ "error": "Product ID is required" });
    } else {
        await new ProductController().deleteProduct(req, res, next);
    }
});

export default productRouter;