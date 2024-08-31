import Product from "../models/product.mjs";

export default class ProductController {
    // POST methods below
    async createProduct(req, res, next) {
        Product.create(req.body).then(function(newProduct) {
            res.status(201).send(newProduct);
        }).catch(next);
    }

    // GET methods below
    async getAllProducts(req, res, next) {
        await Product.find().then(function(products) {
            res.status(200).send(products);
        }).catch(next);
    }
    async getProductFromBusiness (req, res ,next) {
        try {
            await Product.find({"businessId" : req.params.id}).then(function(products) {
                res.status(200).send(products);
            }).catch(next);
        } catch (e) {
            next(e);
        }
    }

    async getProduct(req, res, next) {
        await Product.findOne({"_id": req.params.id}).then(function(product) {
            if (product) {
                res.status(200).send(product);
            } else {
                res.status(404).send({ "error": "Product not found" });
            }
        }).catch(next);
    }

    // PUT methods below
    async updateProduct(req, res, next) {
        const productId = req.params.id;
        await Product.findById(productId).then(async function(product) {
            if (product) {
                await Product.findByIdAndUpdate(productId, req.body, { new: true }).then(function(updatedProduct) {
                    res.status(200).send(updatedProduct);
                }).catch(next);
            } else {
                res.status(404).send({ "error": "Product not found" });
            }
        }).catch(next);
    }

    // DELETE methods below
    async deleteProduct(req, res, next) {
        const productId = req.params.id;
        await Product.findById(productId).then(async function(product) {
            if (product) {
                await Product.findByIdAndDelete(productId).then(function(result) {
                    res.status(200).send({ "message": "Product deleted successfully" });
                }).catch(next);
            } else {
                res.status(404).send({ "error": "Product not found" });
            }
        }).catch(next);
    }
}