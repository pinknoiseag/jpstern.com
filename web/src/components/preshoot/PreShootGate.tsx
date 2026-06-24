import { useEffect, useState } from 'react';

const STORAGE_KEY = 'jp-preshoot-auth';
export const PRESHOOT_PASSWORD = 'Pre-Shoot';

export function isPreShootAuthed(): boolean {
  if (typeof sessionStorage === 'undefined') return false;
  return sessionStorage.getItem(STORAGE_KEY) === '1';
}

export function setPreShootAuthed(): void {
  sessionStorage.setItem(STORAGE_KEY, '1');
}

interface Props {
  children: React.ReactNode;
}

export default function PreShootGate({ children }: Props) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAuthed(isPreShootAuthed());
    setReady(true);
  }, []);

  if (!ready) return null;

  if (!authed) {
    return (
      <div className="gate">
        <div className="gate-card">
          <h1>Pre-Shoot — Style Clarification</h1>
          <p>Dieser Bereich ist passwortgeschützt. Bitte gib das Passwort ein, das du von JP erhalten hast.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (password === PRESHOOT_PASSWORD) {
                setPreShootAuthed();
                setAuthed(true);
                setError('');
              } else {
                setError('Falsches Passwort.');
              }
            }}
          >
            <label>
              Passwort
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </label>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="btn btn-primary">
              Weiter
            </button>
          </form>
        </div>
        <style>{gateCss}</style>
      </div>
    );
  }

  return <>{children}</>;
}

const gateCss = `
  .gate {
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
  }
  .gate-card {
    max-width: 440px;
    width: 100%;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 2.5rem 2rem;
    text-align: center;
  }
  .gate-card h1 {
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
  }
  .gate-card p {
    color: var(--text-muted);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
  .gate-card form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: left;
  }
  .gate-card label {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-size: 0.9rem;
    color: var(--text-muted);
  }
  .gate-card input {
    padding: 0.85rem 1rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--bg);
    color: var(--text);
    font: inherit;
  }
  .gate-card .error {
    color: #e57373;
    margin: 0;
    font-size: 0.9rem;
  }
`;