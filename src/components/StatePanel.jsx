import { Loader2, RefreshCw, Compass } from 'lucide-react';

export function LoadingPanel({ label = 'Memuat…' }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center shadow-sm">
      <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
      <p className="text-sm font-semibold text-ink">{label}</p>
    </div>
  );
}

export function ErrorPanel({ title = 'Terjadi kesalahan', message, onRetry }) {
  return (
    <div className="rounded-3xl border border-coral/30 bg-coral-soft p-6 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-coral/10">
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-coral" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h2 className="mt-4 display-tight text-lg text-coral">{title}</h2>
      {message && <p className="mt-2 text-sm leading-relaxed text-ink">{message}</p>}
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn btn-primary mt-4">
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Coba lagi
        </button>
      )}
    </div>
  );
}

export function EmptyPanel({ icon: Icon = Compass, title, description, action }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-line-strong bg-white p-8 text-center">
      <Icon className="h-12 w-12 text-ink-soft" aria-hidden="true" />
      <div>
        <h2 className="display-tight text-xl text-ink">{title}</h2>
        {description && <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">{description}</p>}
      </div>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}