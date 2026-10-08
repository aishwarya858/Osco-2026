export default function CraftStory({ product }) {
  const facts = [
    product.time_to_make && { label: "Time to make", value: product.time_to_make },
    product.technique && { label: "Technique", value: product.technique },
    product.materials && { label: "Materials", value: product.materials },
  ].filter(Boolean);

  return (
    <section className="story-card">
      <h3 className="eyebrow">The story behind this piece</h3>
      <blockquote>{product.craft_story}</blockquote>

      {facts.length > 0 && (
        <div className="facts">
          {facts.map((f) => (
            <div key={f.label}>
              <span className="fact-label">{f.label}</span>
              <span className="fact-value">{f.value}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}