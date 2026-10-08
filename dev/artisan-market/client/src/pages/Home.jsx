import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, getArtisans } from "../api";
import ProductCard from "../components/ProductCard";
const HERO_IMAGES = [
  { src: "/images/kasuti_border.jpg", alt: "Kasuti saree border" },
  { src: "/images/beedu.jpg", alt: "Beedu craft" },
  { src: "/images/wooded_craft.jpg", alt: "Traditional wooden craft" },
  { src: "/images/traditional_textiles.jpg", alt: "Traditional textiles" },
];
export default function Home() {
  const [products, setProducts] = useState([]);
  const [artisans, setArtisans] = useState([]);
  const [craft, setCraft] = useState("All");

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
    getArtisans().then(setArtisans).catch(console.error);
  }, []);

  const crafts = ["All", ...new Set(products.map((p) => p.artisan_craft).filter(Boolean))];
  const visible = craft === "All" ? products : products.filter((p) => p.artisan_craft === craft);

  return (
    <>
      {/* Hero */}
<section className="hero-banner">
  <div className="container hero-grid">
    <div className="hero-text">
      <span className="eyebrow">Coastal Karnataka · Handmade</span>
      <h1>Crafts with a story, straight from the maker</h1>
      <p>
        Kasuti embroidery, Beedu craft and more. Buy directly from the artisan, ask for a custom
        piece, or support their work.
      </p>
      <div className="actions">
        <a href="#crafts" className="btn btn-light">Browse crafts</a>
        <a href="#makers" className="btn btn-ghost">Meet the makers</a>
      </div>
    </div>

    <div className="hero-collage">
      {HERO_IMAGES.map((img) => (
        <figure className="collage-item" key={img.src}>
          <img src={img.src} alt={img.alt} />
        </figure>
      ))}
    </div>
  </div>
</section>

      {/* Trust strip */}
      <section className="trust">
        <div className="container trust-grid">
          <div>
            <strong>Direct from the maker</strong>
            <span>Artisans set their own prices</span>
          </div>
          <div>
            <strong>A story with every piece</strong>
            <span>Know who made it and how</span>
          </div>
          <div>
            <strong>Custom orders welcome</strong>
            <span>Ask for something made for you</span>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="container section" id="crafts">
        <h2 className="section-title">Featured crafts</h2>
        <p className="muted section-sub">Each piece is made by hand, one at a time.</p>

        <div className="chips filter-row">
          {crafts.map((c) => (
            <button
              type="button"
              key={c}
              className={`chip ${craft === c ? "active" : ""}`}
              onClick={() => setCraft(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid">
          {visible.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Makers */}
      <section className="makers-band" id="makers">
        <div className="container section">
          <h2 className="section-title">Meet our makers</h2>
          <p className="muted section-sub">The people and villages behind every piece.</p>
          <div className="makers-row">
            {artisans.map((a) => (
              <div className="maker-mini" key={a.id}>
                <div className="maker-mini-photo">
                  {a.image ? <img src={a.image} alt={a.name} /> : <span>{a.name.charAt(0)}</span>}
                </div>
                <h3>{a.name}</h3>
                <span className="badge">{a.craft}</span>
                <p className="muted">{a.village}</p>
                <Link to={`/artisan/${a.id}/support`} className="mini-link">Support {a.name.split(" ")[0]} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support banner */}
      {artisans.length > 0 && (
        <section className="support-banner">
          <div className="container support-inner">
            <div>
              <h2>Keep a craft alive</h2>
              <p>
                Not ready to buy? Send a small contribution straight to an artisan. It helps them
                buy materials and keep an old skill going.
              </p>
            </div>
            <Link to={`/artisan/${artisans[0].id}/support`} className="btn btn-light">Support an artisan</Link>
          </div>
        </section>
      )}
    </>
  );
}