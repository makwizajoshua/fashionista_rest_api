import pool from '../coreUtil/dbConnect.mjs';

export default class WishlistedProductsController {
    async getAllWishlistedProducts(req, res) {
        try {
            const wishlistedProducts = await pool.query('SELECT * FROM wishlisted_products');
            res.json(wishlistedProducts.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getWishlistedProductById(req, res) {
        try {
            const { id } = req.params;
            const wishlistedProduct = await pool.query('SELECT * FROM wishlisted_products WHERE id = $1', [id]);
            if (!wishlistedProduct.rows[0]) {
                return res.status(404).json({ error: 'Wishlisted product not found' });
            }
            res.json(wishlistedProduct.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async addProductToWishlist(req, res) {
        try {
            const { user_id, product_id, size, color } = req.body;
            const wishlistedProduct = await pool.query(
                'INSERT INTO wishlisted_products (user_id, product_id, size, color) VALUES ($1, $2, $3, $4) RETURNING *',
                [user_id, product_id, size, color]
            );
            res.status(201).json(wishlistedProduct.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async removeProductFromWishlist(req, res) {
        try {
            const { id } = req.params;
            await pool.query('DELETE FROM wishlisted_products WHERE id = $1', [id]);
            res.json({ message: 'Product removed from wishlist' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}