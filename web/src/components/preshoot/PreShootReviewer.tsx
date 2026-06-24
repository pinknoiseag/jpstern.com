import { useCallback, useEffect, useState } from 'react';
import type { PreshootPhoto } from '../../data/preshoot-types';

type Bucket = 'fav' | 'alright' | 'reject';

const SESSION_NAME_KEY = 'preshoot-session-name';

interface Props {
  title: string;
  emailCategory: string;
  photos: PreshootPhoto[];
}

export default function PreShootReviewer({ title, emailCategory, photos }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewQueue, setReviewQueue] = useState<PreshootPhoto[]>([]);
  const [buckets, setBuckets] = useState<Record<Bucket, PreshootPhoto[]>>({
    fav: [],
    alright: [],
    reject: [],
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_NAME_KEY);
    if (saved) setName(saved);
  }, []);

  const handleNameChange = (value: string) => {
    setName(value);
    const trimmed = value.trim();
    if (trimmed) sessionStorage.setItem(SESSION_NAME_KEY, value);
    else sessionStorage.removeItem(SESSION_NAME_KEY);
  };

  const inReview = reviewQueue.length > 0;
  const currentPhoto = inReview
    ? reviewQueue[0]
    : currentIndex < photos.length
      ? photos[currentIndex]
      : null;
  const ratedCount = buckets.fav.length + buckets.alright.length + buckets.reject.length;
  const allRated = photos.length > 0 && ratedCount === photos.length && reviewQueue.length === 0;

  const selectPhoto = useCallback(
    (bucket: Bucket) => {
      if (!currentPhoto) return;
      const photo = inReview ? reviewQueue[0] : photos[currentIndex];

      setBuckets((prev) => {
        const next = { ...prev };
        (['fav', 'alright', 'reject'] as Bucket[]).forEach((b) => {
          next[b] = next[b].filter((p) => p.id !== photo.id);
        });
        next[bucket] = [...next[bucket], photo];
        return next;
      });

      if (inReview) {
        setReviewQueue((q) => q.slice(1));
      } else {
        setCurrentIndex((i) => i + 1);
      }
    },
    [currentPhoto, currentIndex, inReview, photos, reviewQueue],
  );

  const moveBackToMain = (id: string) => {
    const photo = photos.find((p) => p.id === id);
    if (!photo) return;
    setBuckets((prev) => ({
      fav: prev.fav.filter((p) => p.id !== id),
      alright: prev.alright.filter((p) => p.id !== id),
      reject: prev.reject.filter((p) => p.id !== id),
    }));
    setReviewQueue((q) => (q.some((p) => p.id === id) ? q : [photo, ...q]));
  };

  const sendEmail = async () => {
    if (!name.trim()) {
      setError('Bitte gib deinen Namen ein.');
      return;
    }
    setSending(true);
    setError('');
    try {
      const body = new FormData();
      body.append(
        'data',
        JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          category: emailCategory,
          fav: buckets.fav.map((p) => p.src),
          alright: buckets.alright.map((p) => p.src),
        }),
      );
      const res = await fetch('/send-selection.php', { method: 'POST', body });
      if (!res.ok) throw new Error('Versand fehlgeschlagen');
      setSent(true);
    } catch {
      setError('E-Mail konnte nicht gesendet werden. Bitte versuche es später oder schreib an info@jpstern.com.');
    } finally {
      setSending(false);
    }
  };

  if (photos.length === 0) {
    return (
      <p className="empty">
        In dieser Kategorie sind noch keine Beispielbilder hinterlegt.
        <a href="/pre-shoot-style-clarification/"> Abbrechen und zurück zur Stil-Übersicht</a>
      </p>
    );
  }

  if (sent) {
    return (
      <div className="sent-screen">
        <h2>✅ Gesendet!</h2>
        <p>Deine Auswahl wurde erfolgreich per E-Mail verschickt.</p>
        <a href="/pre-shoot-style-clarification/" className="btn">
          Weitere Kategorien
        </a>
        <style>{reviewerCss}</style>
      </div>
    );
  }

  return (
    <div className="reviewer">
      <header className="reviewer-header">
        <p className="eyebrow">Pre-Shoot Stilabklärung</p>
        <h1>{title}</h1>
        <p className="intro">
          Bitte schaue dir die Fotos eines nach dem anderen an und klicke auf den passenden Button.
        </p>
        <ul className="legend">
          <li>
            <strong>❤️ Favorit</strong> — Du würdest solche Bilder gerne selbst haben
          </li>
          <li>
            <strong>👍 Machbar</strong> — Du bist bereit, sowas in der Art zu shooten
          </li>
          <li>
            <strong>❌ Abgelehnt</strong> — Nicht dein Stil oder ausserhalb deiner Grenzen
          </li>
        </ul>
      </header>

      {!allRated && currentPhoto && (
        <section className="active" aria-live="polite">
          <div className="buttons">
            <button type="button" className="cat-btn fav" onClick={() => selectPhoto('fav')}>
              ❤️ Favorit
            </button>
            <button type="button" className="cat-btn alright" onClick={() => selectPhoto('alright')}>
              👍 Machbar
            </button>
            <button type="button" className="cat-btn reject" onClick={() => selectPhoto('reject')}>
              ❌ Abgelehnt
            </button>
          </div>
          <img src={currentPhoto.src} alt={currentPhoto.alt} className="main-photo" />
          <p className="progress">
            {inReview
              ? `Review (${reviewQueue.length} übrig)`
              : `${currentIndex + 1} von ${photos.length}`}
          </p>
        </section>
      )}

      {allRated && (
        <>
          <section className="complete">
            <h2>✅ Vielen Dank!</h2>
            <p className="disclaimer">
              Mit deiner Auswahl sagst du nichts zu und verpflichtest dich zu nichts — es geht nur darum, was dir
              grundsätzlich gefällt und was nicht.
            </p>
            <p>
              Schick mir nun deine Auswahl per E-Mail oder schau dir unten die Galerien noch einmal in Ruhe an und
              passe einzelne Fotos bei Bedarf an.
            </p>
            <div className="form-block">
              <input
                type="text"
                placeholder="Dein Name *"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
              />
              <label className="email-field">
                <input
                  type="email"
                  placeholder="Deine E-Mail (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="field-hint">Nur wenn du eine Kopie möchtest</span>
              </label>
              <button type="button" className="btn btn-primary send-btn" onClick={sendEmail} disabled={sending}>
                {sending ? 'Wird gesendet…' : 'Auswahl per E-Mail senden'}
              </button>
              {error && <p className="error">{error}</p>}
            </div>
          </section>
          <p className="gallery-hint">
            Hier sind deine drei Galerien mit deiner Auswahl.{' '}
            <strong>Klicke auf ein Bild, um es neu zu bewerten.</strong>
          </p>
        </>
      )}

      {(allRated || ratedCount > 0) && (
        <section className="galleries">
          <GalleryBlock title="❤️ Favorit" items={buckets.fav} onPick={moveBackToMain} />
          <GalleryBlock title="👍 Machbar" items={buckets.alright} onPick={moveBackToMain} />
          <GalleryBlock title="❌ Abgelehnt" items={buckets.reject} onPick={moveBackToMain} />
        </section>
      )}

      <p className="back">
        <a href="/pre-shoot-style-clarification/">← Abbrechen und zurück zur Stil-Übersicht</a>
      </p>
      <style>{reviewerCss}</style>
    </div>
  );
}

function GalleryBlock({
  title,
  items,
  onPick,
}: {
  title: string;
  items: PreshootPhoto[];
  onPick: (id: string) => void;
}) {
  if (items.length === 0) return null;
  return (
    <div className="gallery-block">
      <h3>{title}</h3>
      <div className="thumb-grid">
        {items.map((p) => (
          <button key={p.id} type="button" className="thumb" onClick={() => onPick(p.id)}>
            <img src={p.src} alt={p.alt} loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

const reviewerCss = `
  .reviewer {
    max-width: 820px;
    margin: 0 auto;
    padding: 2rem 0 4rem;
  }
  .reviewer-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 0.8rem;
    color: var(--text-muted);
    margin: 0 0 0.5rem;
  }
  .intro, .legend {
    color: var(--text-muted);
    line-height: 1.7;
  }
  .legend {
    list-style: none;
    padding: 0;
    margin: 1rem auto 0;
    max-width: 520px;
    text-align: left;
  }
  .buttons {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }
  .cat-btn {
    padding: 0.75rem 1.25rem;
    border-radius: 10px;
    border: 2px solid transparent;
    font-weight: 600;
    cursor: pointer;
    font-size: 0.95rem;
    background: var(--bg-elevated);
    color: var(--text);
  }
  .cat-btn.fav { border-color: #e57373; }
  .cat-btn.alright { border-color: #81c784; }
  .cat-btn.reject { border-color: #666; }
  .main-photo {
    width: 100%;
    border-radius: 16px;
    box-shadow: 0 15px 40px rgba(0,0,0,0.5);
  }
  .progress {
    text-align: center;
    font-size: 1.15rem;
    margin: 1.25rem 0 2rem;
  }
  .complete {
    text-align: center;
    background: var(--bg-elevated);
    border-radius: 16px;
    padding: 2rem 1.5rem;
    margin-bottom: 2rem;
  }
  .complete h2 { color: var(--accent); }
  .disclaimer {
    color: var(--silver);
    font-size: 0.98rem;
    line-height: 1.65;
    max-width: 540px;
    margin: 0 auto 1rem;
  }
  .form-block {
    max-width: 480px;
    margin: 1.5rem auto;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .form-block input {
    padding: 0.9rem 1rem;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--bg);
    color: var(--text);
    font: inherit;
  }
  .email-field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    text-align: left;
  }
  .field-hint {
    font-size: 0.82rem;
    color: var(--text-muted);
    padding-left: 0.15rem;
  }
  .send-btn { width: 100%; padding: 1rem; }
  .error { color: #e57373; margin: 0; }
  .gallery-hint {
    color: var(--text-muted);
    font-size: 0.95rem;
    text-align: center;
    margin: 0 0 1.5rem;
  }
  .galleries { margin-top: 0; }
  .gallery-block h3 { margin-bottom: 0.75rem; }
  .thumb-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 1.5rem;
  }
  .thumb {
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    width: 100px;
    height: 100px;
  }
  .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .back { text-align: center; margin-top: 2rem; }
  .sent-screen { text-align: center; padding: 4rem 1rem; }
  .sent-screen h2 { color: var(--accent); font-size: 2rem; }
  .empty { text-align: center; padding: 3rem 1rem; color: var(--text-muted); }
`;