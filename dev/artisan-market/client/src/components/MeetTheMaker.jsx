export default function MeetTheMaker({ artisan }) {
  if (!artisan) return null;

  return (
    <section className="maker-card">
      <div className="maker-photo">
        {artisan.image ? (
          <img src={artisan.image} alt={artisan.name} />
        ) : (
          <span>{artisan.name.charAt(0)}</span>
        )}
      </div>

      <div className="maker-info">
        <h3 className="eyebrow">Meet the Maker</h3>
        <h2>{artisan.name}</h2>
        <p className="maker-meta">
          <span className="maker-craft">{artisan.craft}</span>
          {artisan.village && <span>From {artisan.village}</span>}
        </p>
        <p className="maker-story">{artisan.story}</p>
      </div>
    </section>
  );
}