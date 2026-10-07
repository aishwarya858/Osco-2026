import express from "express";
import cors from "cors";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.listen(5000, () => console.log("API on http://localhost:5000"));