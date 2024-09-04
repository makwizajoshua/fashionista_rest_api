import pool from "../coreUtil/dbConnect.mjs";

class OrderController {
  async createOrder(req, res) {
    try {
      const { userId, productId, productColor, completionCode } = req.body;
      const query = {
        text: `INSERT INTO orders (user_id, product_id, product_color, completion_code) VALUES ($1, $2, $3, $4) RETURNING *`,
        values: [userId, productId, productColor, completionCode],
      };
      const result = await pool.query(query);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getOrders(req, res) {
    try {
      const query = {
        text: `SELECT * FROM orders`,
      };
      const result = await pool.query(query);
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getOrder(req, res) {
    try {
      const { id } = req.params;
      const query = {
        text: `SELECT * FROM orders WHERE id = $1`,
        values: [id],
      };
      const result = await pool.query(query);
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateOrder(req, res) {
    try {
      const { id } = req.params;
      const { userId, productId, productColor, completionCode } = req.body;
      const query = {
        text: `UPDATE orders SET user_id = $1, product_id = $2, product_color = $3, completion_code = $4 WHERE id = $5 RETURNING *`,
        values: [userId, productId, productColor, completionCode, id],
      };
      const result = await pool.query(query);
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      const query = {
        text: `DELETE FROM orders WHERE id = $1 RETURNING *`,
        values: [id],
      };
      const result = await pool.query(query);
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async completeOrder(req, res) {
    try {
      const { id, completionCode } = req.body;
      const query = {
        text: `SELECT completion_code FROM orders WHERE id = $1`,
        values: [id],
      };
      const result = await pool.query(query);
      if (!result.rows[0]) {
        throw new Error('Order not found');
      }
      const storedCompletionCode = result.rows[0].completion_code;
      if (storedCompletionCode !== completionCode) {
        throw new Error('Invalid completion code');
      }
      const deleteQuery = {
        text: `DELETE FROM orders WHERE id = $1 RETURNING *`,
        values: [id],
      };
      const deletedOrder = await pool.query(deleteQuery);
      res.status(200).json(deletedOrder.rows[0]);
    } catch (error) {
      if (error.message === 'Order not found') {
        res.status(404).json({ message: error.message });
      } else if (error.message === 'Invalid completion code') {
        res.status(401).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  }
}

export default OrderController;