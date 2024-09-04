import pool from "../coreUtil/dbConnect.mjs";

class RatingsAndCommentsController {
    async #query(query, values) {
        try {
            const result = await pool.query(query, values);
            if (!result.rows) {
                return { error: "No rows returned" };
            }
            return result.rows;
        } catch (error) {
            return { error: error.message };
        }
    }

    async createRatingAndComment(req, res) {
        try {
            const { business_id, product_id, user_id, rating, comment } = req.body;
            const results = await this.#query('INSERT INTO ratings_and_comments(business_id , product_id, user_id, rating, comment) VALUES ($1, $2, $3, $4, $5)', [business_id, product_id, user_id, rating, comment]);
            if (results.error) {
                res.status(500).json(results);
            } else {
                res.status(200).json({ message: "Rating and comment created successfully" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getRatingsAndComments(req, res) {
        try {
            const results = await this.#query('SELECT * FROM ratings_and_comments');
            if (results.error) {
                res.status(500).json(results);
            } else {
                res.json(results);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getRatingAndCommentById(req, res) {
        try {
            const { id } = req.params;
            const results = await this.#query('SELECT * FROM ratings_and_comments WHERE businesss_id = $1', [id]);
            if (results.error) {
                res.status(500).json(results);
            } else {
                res.json(results);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async updateRatingAndComment(req, res) {
        try {
            const { id } = req.params;
            const { rating, comment } = req.body;
            const results = await this.#query('UPDATE ratings_and_comments SET rating = $1 , comment = $2 WHERE id = $3', [rating, comment, id]);
            if (results.error) {
                res.status(500).json(results);
            } else {
                res.json({ message: "Rating and comment updated successfully" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async deleteRatingAndComment(req, res) {
        try {
            const { id } = req.params;
            const { user_id } = req.body;
            const results = await this.#query('DELETE FROM ratings_and_comments WHERE id = $1 AND user_id = $2', [id, user_id]);
            if (results.error) {
                res.status(500).json(results);
            } else {
                res.json({ message: "Rating and comment deleted successfully" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default RatingsAndCommentsController;
