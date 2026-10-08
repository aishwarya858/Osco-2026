import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../api";
import ProductImage from "./ProductImage";

export default function OrderForm({ product }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ buyer_name: "", phone: "", address: "", quantity: 1 });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const qty = Math.min(20, Math.max(1, Number(form.quantity) || 1));
  const total = product.price * qty;

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });
  const setQty = (n) => setForm({ ...form, quantity: Math.min(20, Math.max(1, n)) });

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const { id } = await placeOrder({ ...form, quantity: qty, product_id: product.id });
      navigate(`/order/${id}/confirmation`);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div className="checkout-grid">
      {/* Left: form */}
      <form className="order-form" onSubmit={handleSubmit}>
        <h3 className="eyebrow">Delivery details</h3>

        <div className="field-row">
          <div>
            <label>Your name</label>
            <input
              value={form.buyer_name}
              onChange={update("buyer_name")}
              placeholder="e.g. Asha Rao"
              required
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={update("phone")}
              placeholder="10-digit mobile number"
              required
            />
          </div>
        </div>

        <label>Delivery address</label>
        <textarea
          rows="3"
          value={form.address}
          onChange={update("address")}
          placeholder="House no., street, city, PIN code"
          required
        />

        <label>Quantity</label>
        <div className="qty">
          <button type="button" onClick={() => setQty(qty - 1)} disabled={qty <= 1} aria-label="Decrease quantity">−</button>
          <span>{qty}</span>
          <button type="button" onClick={() => setQty(qty + 1)} disabled={qty >= 20} aria-label="Increase quantity">+</button>
        </div>

        <div className="pay-note">
          <strong>Payment is simulated</strong>
          <span>No money is charged in this demo.</span>
        </div>

        <button className="btn btn-primary btn-block" disabled={busy}>
          {busy ? "Placing order..." : `Place order · ₹${total}`}
        </button>
        {error && <p className="error">{error}</p>}
      </form>

      {/* Right: summary */}
      <aside className="order-summary">
        <ProductImage product={product} />
        <div className="summary-body">
          <span className="badge">{product.artisan.craft}</span>
          <h3>{product.name}</h3>
          <p className="muted summary-maker">
            Handmade by {product.artisan.name}
            {product.artisan.village ? `, ${product.artisan.village}` : ""}
          </p>

          <dl className="summary-lines">
            <div><dt>Price</dt><dd>₹{product.price}</dd></div>
            <div><dt>Quantity</dt><dd>× {qty}</dd></div>
            <div><dt>Delivery</dt><dd>Arranged with the maker</dd></div>
            <div className="total"><dt>Total</dt><dd>₹{total}</dd></div>
          </dl>

          <ul className="assurances">
            <li>Made by hand, one piece at a time</li>
            <li>Most of the price goes straight to the artisan</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}