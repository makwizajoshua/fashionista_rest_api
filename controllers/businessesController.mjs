import pool from "../coreUtil/dbConnect.mjs";

class BusinessesController {
  // Create a new business
  async createBusiness(req, res) {
    try {
      const { name, description, logo_url, user_id, locations } = req.body;
      const newBusiness = await pool.query(
        'INSERT INTO businesses (name, description, logo_url, user_id, locations) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, description, logo_url, user_id, locations]
      );
      res.status(201).json(newBusiness.rows[0]);
    } catch (error) {
      res.status(500).json({ message: 'Error creating business' });
    }
  }
  async getBusinessesByLocation() {
    try {
      const { location } = req.body;
      const business = await pool.query(
        'SELECT * FROM businesses WHERE $1 LIKE ANY(locations)',
        [location]
      );
      res.status(201).json(business);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async _getBusinessesByLocation() {
    try {
      const { location } = req.body;
      const businesses = await pool.query(
        'SELECT * FROM businesses WHERE $1 LIKE ANY(locations)',
        [location]
      );
      return businesses;
    } catch (error) {
      res.status(500).json(error);
    }
  }
  // Get all businesses
  async getBusinesses(req, res) {
    try {
      const businesses = await pool.query('SELECT * FROM businesses');
      res.status(200).json(businesses.rows);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching businesses' });
    }
  }

  // Get a single business by ID
  async getBusiness(req, res) {
    try {
      const id = req.params.id;
      const business = await pool.query('SELECT * FROM businesses WHERE id = $1', [id]);
      if (business.rows.length === 0) {
        res.status(404).json({ message: 'Business not found' });
      } else {
        res.status(200).json(business.rows[0]);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching business' });
    }
  }
  async checkBusinessExist(req, res) {
    try {
      const userId = req.params.id;
      const business = await pool.query('SELECT COUNT(id) as NoOfRows FROM businesses WHERE id = $1', [userId]);
      if (business.rows.length === 0) {
        res.status(404).json({ message: 'Business not found' });
      } else {
        res.status(200).json({ message: 'Business ' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching business' });
    }
  }
  // Update a business
  async updateBusiness(req, res) {
    try {
      const id = req.params.id;
      const { name, description, logo_url, locations } = req.body;
      const updatepoolusiness = await pool.query(
        'UPDATE businesses SET name = $1, description = $2, logo_url = $3, locations = $4 WHERE id = $5 RETURNING *',
        [name, description, logo_url, locations, id]
      );
      if (updatepoolusiness.rows.length === 0) {
        res.status(404).json({ message: "Business not found" });
      } else {
        res.status(200).json(updatepoolusiness.rows[0]);
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating business" });
    }
  }

  // Delete a business
  async deleteBusiness(req, res) {
    try {
      const id = req.params.id;
      await pool.query('DELETE FROM businesses WHERE id = $1', [id]);
      res.status(204).json({ message: "Business deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting business" });
    }
  }
};

export default BusinessesController;