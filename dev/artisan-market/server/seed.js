import db from "./db.js";

const { n } = db.prepare("SELECT COUNT(*) AS n FROM artisans").get();
if (n > 0) {
  console.log("Already seeded, skipping.");
  process.exit(0);
}

const addArtisan = db.prepare(
  "INSERT INTO artisans (name, craft, village, story) VALUES (?, ?, ?, ?)"
);
const addProduct = db.prepare(
  "INSERT INTO products (artisan_id, name, description, craft_story, price) VALUES (?, ?, ?, ?, ?)"
);

const a1 = addArtisan.run(
  "Lakshmi Hiremath", "Kasuti Embroidery", "Dharwad",
  "Lakshmi learned Kasuti from her grandmother at age 12. She counts every thread by hand, with no tracing or drawn pattern."
).lastInsertRowid;

const a2 = addArtisan.run(
  "Ramesh Naik", "Beedu Craft", "Udupi",
  "Ramesh is a third-generation Beedu craftsperson. He makes his pieces from locally sourced materials using techniques passed down in his family."
).lastInsertRowid;

addProduct.run(a1, "Kasuti Silk Saree Border", "Hand-embroidered border in traditional gopura motifs.",
  "Each border takes about 18 days. Kasuti stitches such as gavanti and murgi are counted thread by thread, so both sides look identical.", 3500);
addProduct.run(a1, "Kasuti Cushion Cover", "Cotton cushion cover with a peacock motif.",
  "Takes about 4 days of handwork. The peacock is a classic Kasuti motif that symbolises grace.", 850);
addProduct.run(a2, "Beedu Decorative Piece", "Handcrafted Beedu decorative item.",
  "Made entirely by hand in Ramesh's workshop. Fair pricing keeps this family craft alive.", 1200);

console.log("Seeded 2 artisans and 3 products.");