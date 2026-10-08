import { artisans, products } from "./data/mockData";

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function add(key, record) {
  const list = load(key);
  const id = list.length ? Math.max(...list.map((r) => r.id)) + 1 : 1;
  const row = { id, ...record, created_at: new Date().toISOString() };
  localStorage.setItem(key, JSON.stringify([...list, row]));
  return row;
}

const findProduct = (id) => products.find((p) => p.id === Number(id));
const findArtisan = (id) => artisans.find((a) => a.id === Number(id));

export async function getProducts() {
  await delay();
  return products.map((p) => {
    const a = findArtisan(p.artisan_id);
    return {
      ...p,
      artisan_name: a ? a.name : "Unknown artisan",
      artisan_craft: a ? a.craft : "",
    };
  });
}
export async function getProduct(id) {
  await delay();
  const product = findProduct(id);
  if (!product) throw new Error("Product not found");
  return { ...product, artisan: findArtisan(product.artisan_id) };
}

export async function getArtisan(id) {
  await delay();
  const artisan = findArtisan(id);
  if (!artisan) throw new Error("Artisan not found");
  return artisan;
}

export async function placeOrder(order) {
  await delay();
  const { product_id, buyer_name, phone, address, quantity = 1 } = order;
  if (!buyer_name?.trim() || !phone?.trim() || !address?.trim())
    throw new Error("Name, phone and address are required");
  const qty = Number(quantity);
  if (!Number.isInteger(qty) || qty < 1 || qty > 20)
    throw new Error("Quantity must be between 1 and 20");
  const product = findProduct(product_id);
  if (!product) throw new Error("Product not found");

  const row = add("orders", {
    product_id: product.id,
    product_name: product.name,
    artisan_name: findArtisan(product.artisan_id).name,
    buyer_name: buyer_name.trim(),
    phone: phone.trim(),
    address: address.trim(),
    quantity: qty,
    total: product.price * qty,
    status: "placed",
  });
  return { id: row.id };
}

export async function getOrder(id) {
  await delay();
  const order = load("orders").find((o) => o.id === Number(id));
  if (!order) throw new Error("Order not found");
  return order;
}

// Ready for the next features (Custom Request and Support an Artisan)
export async function placeCustomRequest(req) {
  await delay();
  if (!req.buyer_name?.trim() || !req.contact?.trim() || !req.description?.trim())
    throw new Error("Name, contact and description are required");
  const artisan = findArtisan(req.artisan_id);
  if (!artisan) throw new Error("Artisan not found");
  const row = add("custom_requests", {
    ...req,
    artisan_name: artisan.name,
    status: "new",
  });
  return { id: row.id };
}

export async function makeContribution(c) {
  await delay();
  const amount = Number(c.amount);
  if (!c.supporter_name?.trim() || !Number.isInteger(amount) || amount < 1)
    throw new Error("Name and a valid amount are required");
  const artisan = findArtisan(c.artisan_id);
  if (!artisan) throw new Error("Artisan not found");
  const row = add("contributions", {
    artisan_id: artisan.id,
    artisan_name: artisan.name,
    supporter_name: c.supporter_name.trim(),
    amount,
    message: c.message || "",
  });
  return { id: row.id };
}

export async function getContribution(id) {
  await delay();
  const row = load("contributions").find((c) => c.id === Number(id));
  if (!row) throw new Error("Contribution not found");
  return row;
}
export async function getArtisans() {
  await delay();
  return artisans;
}