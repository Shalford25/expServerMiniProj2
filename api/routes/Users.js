import express from "express";
import pool from "./PoolConnection.js";

const userRouter = express.Router();

// Retrieve all users
userRouter.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json({ rows: result.rows });
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

// Retrieve a specific user by ID
userRouter.get("/retrieverecord:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
    res.json({ rows: result.rows });
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

// Create a new user
userRouter.post("/create", async (req, res) => {
  console.log("Request Body:", req.body); // Log the request body for debugging
  const { fname, lname, user_id, email, city, zcode, uname, password_hash, role } = req.body;

  try {
    const query = `
      INSERT INTO users (first_name, last_name, user_id, email, city, zip_code, username, password_hash, role_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    await pool.query(query, [fname, lname, user_id, email, city, zcode, uname, password_hash, role]);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

userRouter.delete("/deleterecord:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE user_id = $1", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

userRouter.get("/isAdmin/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const result = await pool.query(
      "SELECT role_id FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length > 0 && result.rows[0].role_id === 1) {
      res.json({ isAdmin: true });
    } else {
      res.json({ isAdmin: false });
    }
  } catch (error) {
    console.error("Error checking admin status:", error);
    res.status(500).json({ error: "Failed to check admin status" });
  }
});

export default userRouter;