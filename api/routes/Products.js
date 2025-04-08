import express from "express";
import pool from "./PoolConnection.js";

const productRouter = express.Router();

// Retrieve all products
productRouter.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json({ rows: result.rows });
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

// Retrieve a specific product by ID
productRouter.get("/retrieverecord:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    res.json({ rows: result.rows });
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

// Add a new product
productRouter.post("/", async (req, res) => {
  const { product_name, price, stock_quality } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO products (product_name, price, stock_quality) VALUES ($1, $2, $3) RETURNING *",
      [product_name, price, stock_quality]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// Update a specific product by ID
productRouter.put("/updaterecord:id", async (req, res) => {
  const { id } = req.params;
  const { product_name, price, stock_quality } = req.body;

  try {
    const result = await pool.query(
      "UPDATE products SET product_name = $1, price = $2, stock_quality = $3 WHERE product_id = $4 RETURNING *",
      [product_name, price, stock_quality, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Delete a specific product by ID
productRouter.delete("/deleterecord:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM products WHERE product_id = $1", [id]);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default productRouter;