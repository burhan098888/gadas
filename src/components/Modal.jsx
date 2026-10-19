import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function Modal({ open, title, description, onClose, children, footer }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const previousFocus = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;

    previousFocus.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => closeRef.current?.focus(), 30);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current?.();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const items = [...panelRef.current.querySelectorAll(FOCUSABLE)].filter(
        (item) => item.offsetParent !== null,
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previousFocus.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]"
        aria-hidden="true"
        onClick={() => onCloseRef.current?.()}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? 'modal-description' : undefined}
        className="animate-pop relative m-0 w-full max-w-lg rounded-t-3xl bg-white p-6 shadow-2xl sm:m-4 sm:rounded-3xl sm:p-7"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-paper hover:text-ink"
          aria-label="Tutup dialog"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <h2 id="modal-title" className="display-tight pr-10 text-2xl text-ink">
          {title}
        </h2>
        {description && (
          <p id="modal-description" className="mt-2 text-sm leading-relaxed text-ink-soft">
            {description}
          </p>
        )}

        {children && <div className="mt-5">{children}</div>}
        {footer && <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}