import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../api";
import OrderForm from "../components/OrderForm";

export default function OrderPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getProduct(id).then(setProduct).catch((e) => setError(e.message));
  }, [id]);

  if (error) return <div className="page error">{error}</div>;
  if (!product) return <div className="page">Loading...</div>;

  return (
    <div className="page">
      <Link to={`/product/${product.id}`} className="back">← Back to {product.name}</Link>

      <ol className="steps">
        <li className="done">Choose piece</li>
        <li className="active">Your details</li>
        <li>Confirmation</li>
      </ol>

      <h1 className="checkout-title">Complete your order</h1>
      <OrderForm product={product} />
    </div>
  );
}