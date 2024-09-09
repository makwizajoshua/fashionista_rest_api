import pool from "../coreUtil/dbConnect.mjs";
import BusinessesController from "./businessesController.mjs";
export default class ProductController {
    async createProduct(req, res) {
        try {
            const {
                business_id,
                name,
                description,
                price,
                colors,
                image_urls,
                category,
                tags,
            } = req.body;
            const product = await pool.query(
                "INSERT INTO products (business_id, name, description, price, colors, image_urls, category, tags, in_stock) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
                [
                    business_id,
                    name,
                    description,
                    price,
                    colors,
                    image_urls,
                    category,
                    tags,
                    true,
                ]
            );
            res.status(201).json(product.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getAllProducts(req, res) {
        try {
            const products = await pool.query("SELECT * FROM products");
            res.json(products.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await pool.query("SELECT * FROM products WHERE id = $1", [
                id,
            ]);
            if (!product.rows[0]) {
                return res.status(404).json({ error: "Product not found" });
            }
            res.json(product.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    async getProductByLocation(req, res) {
        try {
            const businessesController = new BusinessesController();
            const _res = res;
            const { id } = req.params;
            const businesses = await businessesController._getBusinessesByLocation(req, res);

            if (!Array.isArray(businesses)) {
                businesses = [businesses];
            }

            const products = await Promise.all(businesses.map((business) => {
                return pool.query("SELECT * FROM products WHERE business_id = $1", [
                    business.id,
                ]);
            }));

            const flattenedProducts = products.flat();

            res.json(flattenedProducts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    async _getProductByLocation(req, res) {
        try {
            const businessesController = new BusinessesController();
            const _res = res;
            const { id } = req.params;
            const businesses = await businessesController._getBusinessesByLocation(req, res);

            if (!Array.isArray(businesses)) {
                businesses = [businesses];
            }

            const products = await Promise.all(businesses.map((business) => {
                return pool.query("SELECT * FROM products WHERE business_id = $1", [
                    business.id,
                ]);
            }));

            const flattenedProducts = products.flat();

            return flattenedProducts;
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const {
                business_id,
                name,
                description,
                price,
                colors,
                image_urls,
                category,
                tags,
                in_stock,
            } = req.body;
            const product = await pool.query(
                "UPDATE products SET business_id = $1, name = $2, description = $3, price = $4, colors = $5, image_urls = $6, category = $7, tags = $8, in_stock = $9 WHERE id = $10 RETURNING *",
                [
                    business_id,
                    name,
                    description,
                    price,
                    colors,
                    image_urls,
                    category,
                    tags,
                    in_stock,
                    id,
                ]
            );
            if (!product.rows[0]) {
                return res.status(404).json({ error: "Product not found" });
            }
            res.json(product.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            await pool.query("DELETE FROM products WHERE id = $1", [id]);
            res.json({ message: "Product deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
