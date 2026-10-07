import { Router } from "express";
import db from "../db.js";

const router = Router();

// Place an order (payment is mocked, so the order is simply saved)
router.post("/", (req, res) => {
  const { product_id, buyer_name, phone, address, quantity = 1 } = req.body;

  if (!product_id || !buyer_name?.trim() || !phone?.trim() || !address?.trim()) {
    return res.status(400).json({ error: "Name, phone and address are required" });
  }
  const qty = Number(quantity);
  if (!Number.isInteger(qty) || qty < 1 || qty > 20) {
    return res.status(400).json({ error: "Quantity must be between 1 and 20" });
  }

  const product = db.prepare("SELECT id, price FROM products WHERE id = ?").get(product_id);
  if (!product) return res.status(404).json({ error: "Product not found" });

  // The server calculates the total, never trust a price sent by the browser
  const total = product.price * qty;

  const result = db.prepare(`
    INSERT INTO orders (product_id, buyer_name, phone, address, quantity, total)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(product.id, buyer_name.trim(), phone.trim(), address.trim(), qty, total);

  res.status(201).json({ id: Number(result.lastInsertRowid) });
});

// Order details for the confirmation page
router.get("/:id", (req, res) => {
  const order = db.prepare(`
    SELECT o.*, p.name AS product_name, a.name AS artisan_name
    FROM orders o
    JOIN products p ON p.id = o.product_id
    JOIN artisans a ON a.id = p.artisan_id
    WHERE o.id = ?
  `).get(req.params.id);

  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

export default router;