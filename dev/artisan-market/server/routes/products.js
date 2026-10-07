import { Router } from "express";
import db from "../db.js";

const router = Router();

// List all products
router.get("/", (req, res) => {
  const rows = db.prepare(`
    SELECT p.*, a.name AS artisan_name, a.craft AS artisan_craft
    FROM products p
    JOIN artisans a ON a.id = p.artisan_id
    ORDER BY p.id
  `).all();
  res.json(rows);
});

// One product with its artisan (powers "Meet the Maker")
router.get("/:id", (req, res) => {
  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });

  const artisan = db.prepare("SELECT * FROM artisans WHERE id = ?").get(product.artisan_id);
  res.json({ ...product, artisan });
});

export default router;