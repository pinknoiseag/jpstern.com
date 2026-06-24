import type { PreshootCategoryManifest, PreshootPhoto } from '../../data/preshoot-types';

interface Props {
  categories: PreshootCategoryManifest[];
}

function previewPhotos(photos: PreshootPhoto[]): PreshootPhoto[] {
  if (photos.length === 1) return photos;
  if (photos.length === 2) return photos;
  const last = photos.length - 1;
  const mid = Math.floor(last / 2);
  return [photos[0], photos[mid]];
}

export default function PreShootHub({ categories }: Props) {
  const visible = categories.filter((c) => c.photos.length > 0);

  return (
    <div className="hub">
      <header className="hub-header">
        <h1>Pre-Shoot Stilabklärung</h1>
        <p>Schau die verschiedenen Stile durch und wähle, was Dir gefällt.</p>
        <p className="hint">Du musst nicht alle Bereiche durchgehen — öffne nur die Stile, die dich interessieren.</p>
      </header>
      <div className="hub-grid">
        {visible.map((cat) => {
          const previews = previewPhotos(cat.photos);
          return (
            <a key={cat.slug} href={`/${cat.slug}/`} className="hub-card">
              <div className="hub-preview" aria-hidden="true">
                {previews.map((photo) => (
                  <img key={photo.id} src={photo.src} alt="" loading="lazy" decoding="async" />
                ))}
              </div>
              <div className="hub-meta">
                <span className="hub-label">{cat.hubLabel}</span>
                <span className="hub-count">{cat.photos.length} Beispielbilder</span>
              </div>
            </a>
          );
        })}
      </div>
      <style>{hubCss}</style>
    </div>
  );
}

const hubCss = `
  .hub {
    padding: 2.5rem 0 4rem;
    max-width: 1060px;
    margin: 0 auto;
  }
  .hub-header {
    text-align: center;
    margin-bottom: 2.5rem;
  }
  .hub-header h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  .hub-header p {
    color: var(--text-muted);
    font-size: 1.1rem;
    margin: 0.25rem 0;
  }
  .hub-header .hint {
    font-size: 0.95rem;
    margin-top: 1rem;
    color: var(--silver);
  }
  .hub-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.25rem;
  }
  .hub-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 14px;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .hub-card:hover {
    border-color: rgba(201, 168, 106, 0.45);
    transform: translateY(-3px);
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.35);
    color: #fff;
  }
  .hub-preview {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2px;
    background: #000;
  }
  .hub-preview img {
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    object-position: center 20%;
    transition: transform 0.45s ease, opacity 0.3s;
  }
  .hub-card:hover .hub-preview img {
    opacity: 0.92;
  }
  .hub-card:hover .hub-preview img {
    transform: scale(1.03);
  }
  .hub-meta {
    padding: 1rem 1.1rem 1.15rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .hub-label {
    font-size: 0.82rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 600;
    color: #d4bc8a;
  }
  .hub-count {
    font-size: 0.8rem;
    color: var(--text-muted);
  }
  @media (max-width: 640px) {
    .hub-grid {
      grid-template-columns: 1fr;
    }
  }
`;