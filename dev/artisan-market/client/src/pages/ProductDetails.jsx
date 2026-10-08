import CraftStory from "../components/CraftStory";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../api";
import MeetTheMaker from "../components/MeetTheMaker";
import ProductImage from "../components/ProductImage";

export default function ProductDetails() {
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
      <Link to="/" className="back">← All crafts</Link>

      <div className="product-layout">
        <ProductImage product={product} />
        <div>
          <span className="badge">{product.artisan.craft}</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p className="price">₹{product.price}</p>
          <div className="actions">
            <Link className="btn btn-primary" to={`/product/${product.id}/buy`}>Buy Now</Link>
          </div>
        </div>
      </div>

      <CraftStory product={product} />

      <MeetTheMaker artisan={product.artisan} />
    </div>
  );
}