import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <ProductImage product={product} />
      <div className="product-card-body">
        <span className="badge">{product.artisan_craft}</span>
        <h3>{product.name}</h3>
        <p className="muted">by {product.artisan_name}</p>
        <p className="price">₹{product.price}</p>
      </div>
    </Link>
  );
}