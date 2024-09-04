import pool from "../coreUtil/dbConnect.mjs";
import argon2 from "argon2";

export default class AuthenticationController {

  async #query(query, values) {
    try {
      const result = await this.pool.query(query, values);
      return result.rows;
    } catch (error) {
      return { error: error.message };
    }
  }

  async register(req, res) {
    const { username, email, gender, password } = req.body;
    const hashedPassword = await argon2.hash(password);
    results = await this.#query(`INSERT INTO users (username, email, gender, password) VALUES ($1, $2, $3, $4) RETURNING *`, [username, email, gender, hashedPassword]);
    if (results.error) {
      res.status(500).json(results);
    } else {
      res.status(200).json(results);
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email],
    };
    try {
      const result = await pool.query(query);
      if (result.rows.length === 0) {
        res.status(404).json({ error: "Invalid email or password" });
      }
      const user = result.rows[0];
      const isValidPassword = await argon2.verify(user.password, password);
      if (!isValidPassword) {
        res.status(404).json({ error: "Invalid email or password" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async changePassword(req, res) {
    try {
      const { userId, currentPassword, newPassword } = req.body;
      // Verify the current password
      const user = await this.#query(`SELECT * FROM users WHERE id = $1`, [
        userId,
      ]);
      if (!user || !(await argon2.verify(user.password, currentPassword))) {
        res.status(500).json({ error: "Invalid current password" });
      }

      // Hash the new password
      const hashedNewPassword = await argon2.hash(newPassword);

      // Update the user's password
      await this.#query(`UPDATE users SET password = $1 WHERE id = $2`, [
        hashedNewPassword,
        userId,
      ]);

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
