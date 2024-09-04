import pool from '../coreUtil/dbConnect.mjs';

// productController.mjs

export default class ProductController {
    async getAllProducts(req, res) {
        try {
            const products = await pool.query('SELECT * FROM products');
            res.json(products.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
            if (!product.rows[0]) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async createProduct(req, res) {
        try {
            const { business_id, name, description, price, colors, image_urls } = req.body;
            const product = await pool.query(
                'INSERT INTO products (business_id, name, description, price, colors, image_urls) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [business_id, name, description, price, colors, image_urls]
            );
            res.status(201).json(product.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const { business_id, name, description, price, colors, image_urls } = req.body;
            const product = await pool.query(
                'UPDATE products SET business_id = $1, name = $2, description = $3, price = $4, colors = $5, image_urls = $6 WHERE id = $7 RETURNING *',
                [business_id, name, description, price, colors, image_urls, id]
            );
            if (!product.rows[0]) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            await pool.query('DELETE FROM products WHERE id = $1', [id]);
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}