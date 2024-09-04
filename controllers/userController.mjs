import pool from '../coreUtil/dbConnect.mjs';
import argon2 from 'argon2';

export default class UserController {
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

  async createUser(req, res) {
    const { username, email, gender, password } = req.body;
    const existingUser = await this.readUserByEMail(username);
    if (existingUser) {
      res.send(400).json({ error: "Email has already been taken" });
    }
    const hashedPassword = await argon2.hash(password);
    const query = {
      text: `INSERT INTO users (username, email , gender, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [username, email, gender, hashedPassword],
    };
    results = await this.#query(query);
    if (results.error) {
      res.status(500).json(results);
    } else {
      res.status(200).json(results);
    }
  }

  async readUser(req, res) {
    const query = {
      text: `SELECT * FROM users WHERE id = $1`,
      values: [req.body.id],
    };
    results = await this.#query(query);
    if (results.error) {
      res.status(500).json(results);
    } else {
      res.status(200).json(results);
    }
  }

  async readUsers() {
    const query = {
      text: `SELECT * FROM users`,
    };
    results = await this.#query(query);
    if (results.error) {
      res.status(500).json(results);
    } else {
      res.status(200).json(results);
    }
  }

  async updateUser(req, res) {
    const { id, username, email, gender } = req.body;
    if (!Number.isInteger(id)) {
      throw new Error('Invalid ID');
    }
    const query = {
      text: `UPDATE users SET username = $1, email = $2, gender = $3, WHERE id = $4 RETURNING *`,
      values: [username, email, gender, id],
    };
    results = await this.#query(query);
    if (results.error) {
      res.status(500).json(results);
    } else {
      res.status(200).json(results);
    }
  }

  async deleteUser(req, res) {
    const { id } = req.body;
    if (!Number.isInteger(id)) {
      throw new Error('Invalid ID');
    }
    const query = {
      text: `DELETE FROM users WHERE id = $1 RETURNING *`,
      values: [id],
    };
    results = await this.#query(query);
    if (results.error) {
      res.status(500).json(results);
    } else {
      res.status(200).json(results);
    }
  }

  async readUserByUsername(req, res) {
    const { username } = req.body;
    const query = {
      text: `SELECT * FROM users WHERE username = $1`,
      values: [username],
    };
    results = await this.#query(query);
    if (results.error) {
      res.status(500).json(results);
    } else {
      res.status(200).json(results);
    }
  }

  async readUserByEMail(req, res) {
    const { email } = req.body;
    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email],
    };
    results = await this.#query(query);
    if (results.error) {
      res.status(500).json(results);
    } else {
      res.status(200).json(results);
    }
  }
  async readUserByGender(req, res) {
    const { gender } = req.body;
    const query = {
      text: `SELECT * FROM users WHERE gender = $1`,
      values: [gender],
    };
    results = await this.#query(query);
    if (results.error) {
      res.status(500).json(results);
    } else {
      res.status(200).json(results);
    }
  }
}