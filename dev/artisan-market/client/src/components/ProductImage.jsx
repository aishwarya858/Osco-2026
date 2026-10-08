export default function ProductImage({ product }) {
  return (
    <div className="img-box">
      {product.image ? (
        <img src={product.image} alt={product.name} />
      ) : (
        <span>{product.name.charAt(0)}</span>
      )}
    </div>
  );
}