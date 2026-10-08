import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrder, getProduct } from "../api";
import ProductImage from "../components/ProductImage";

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrder(id)
      .then((o) => {
        setOrder(o);
        return getProduct(o.product_id).then(setProduct).catch(() => {});
      })
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return <div className="page error">{error}</div>;
  if (!order) return <div className="page">Loading...</div>;

  const orderNo = `CC-${String(order.id).padStart(4, "0")}`;
  const date = new Date(order.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const unitPrice = Math.round(order.total / order.quantity);
  const makerFirstName = order.artisan_name.split(" ")[0];

  return (
    <div className="page">
      <ol className="steps no-print">
        <li className="done">Choose piece</li>
        <li className="done">Your details</li>
        <li className="active">Confirmation</li>
      </ol>

      <div className="confirm-wrap">
        {/* Success header */}
        <div className="success-head">
          <div className="success-badge" aria-hidden="true">✓</div>
          <h1>Thank you, {order.buyer_name}!</h1>
          <p className="muted">
            Your order has been placed. {order.artisan_name} will be notified and will contact you on{" "}
            <b>{order.phone}</b>.
          </p>
        </div>

        {/* Receipt */}
        <section className="receipt">
          <div className="receipt-top">
            <div>
              <span className="receipt-label">Order number</span>
              <span className="receipt-value">{orderNo}</span>
            </div>
            <div>
              <span className="receipt-label">Date</span>
              <span className="receipt-value">{date}</span>
            </div>
            <div>
              <span className="receipt-label">Status</span>
              <span className="status-pill">Order placed</span>
            </div>
          </div>

          <div className="receipt-item">
            {product && <ProductImage product={product} />}
            <div>
              <h3>{order.product_name}</h3>
              <p className="muted">Handmade by {order.artisan_name}</p>
              <p className="muted">₹{unitPrice} × {order.quantity}</p>
            </div>
            <div className="receipt-item-total">₹{order.total}</div>
          </div>

          <dl className="summary-lines">
            <div><dt>Subtotal</dt><dd>₹{order.total}</dd></div>
            <div><dt>Delivery</dt><dd>Arranged with the maker</dd></div>
            <div className="total"><dt>Total (payment simulated)</dt><dd>₹{order.total}</dd></div>
          </dl>

          <div className="receipt-deliver">
            <span className="receipt-label">Delivering to</span>
            <p>{order.buyer_name}</p>
            <p className="muted">{order.address}</p>
          </div>
        </section>

        {/* What happens next */}
        <section className="next-card">
          <h3 className="eyebrow">What happens next</h3>
          <ol className="next-steps">
            <li>
              <strong>{makerFirstName} confirms your order</strong>
              <span>You'll get a call or message on {order.phone}.</span>
            </li>
            <li>
              <strong>Your piece is made or prepared by hand</strong>
              <span>Handmade work takes time, so the maker will share a delivery date.</span>
            </li>
            <li>
              <strong>It's on its way to you</strong>
              <span>Delivery is arranged directly with the maker.</span>
            </li>
          </ol>
        </section>

        {/* Maker note + support */}
        {product && (
          <section className="thanks-maker no-print">
            <div className="maker-mini-photo">
              {product.artisan.image ? (
                <img src={product.artisan.image} alt={product.artisan.name} />
              ) : (
                <span>{product.artisan.name.charAt(0)}</span>
              )}
            </div>
            <div>
              <h3>Your order supports {product.artisan.name}</h3>
              <p>
                Want to do a little more? You can send {makerFirstName} a small contribution to help
                keep the {product.artisan.craft} tradition alive.
              </p>
              <Link to={`/artisan/${product.artisan.id}/support`} className="btn btn-light">
                Support {makerFirstName}
              </Link>
            </div>
          </section>
        )}

        <div className="actions confirm-actions no-print">
          <Link className="btn btn-primary" to="/">Continue browsing</Link>
          <button type="button" className="btn btn-outline" onClick={() => window.print()}>
            Print receipt
          </button>
        </div>
      </div>
    </div>
  );
}