import express from "express";
import pool from "./PoolConnection.js";

const roleRouter = express.Router();

roleRouter.get("/allroles", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM roles");
    res.json({ rows: result.rows });
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

roleRouter.get("/retrieverecord:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM roles WHERE id = $1", [id]);
    res.json({ rows: result.rows });
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

roleRouter.delete("/deleterecord:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM roles WHERE id = $1", [id]);
    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

export default roleRouter;