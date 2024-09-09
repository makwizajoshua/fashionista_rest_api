import pool from "../coreUtil/dbConnect.mjs";

export default class SearchController {
    async generalSearch(req, res) {
        try {
            const { search_key } = req.body;
            const business = await pool.query(
                'SELECT b.id AS business_id, b.name AS business_name, b.description AS business_description, p.id AS product_id,p.name AS product_name, p.description AS product_description, p.price AS product_price, p.colors AS product_colors, p.image_urls AS product_image_urls, p.category AS product_category, p.tags AS product_tags, p.in_stock AS product_in_stock FROM businesses b LEFT JOIN products p ON b.id = p.business_id WHERE (b.name ILIKE $1 OR p.name ILIKE $1 OR p.description ILIKE $1 OR p.tags @> ARRAY[$1]) ORDER BY b.name, p.name;',
                [search_key]
            );
            res.status(201).json(business);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}