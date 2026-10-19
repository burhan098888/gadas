import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import Brand from './Brands.jsx';

const links = [
  { label: 'Beranda', to: '/' },
  { label: 'Daftar tes', to: '/tes' },
  { label: 'Cara kerja', to: '/#cara-kerja' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'Dashboard', to: '/dashboard' },
];

function isPlainRoute(path) {
  return path === '/' || path === '/tes' || path === '/dashboard';
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line/90 bg-white/92 backdrop-blur-md">
      <div className="shell flex h-[72px] items-center justify-between gap-4">
        <Brand />

        <nav aria-label="Navigasi utama" className="hidden items-center gap-7 lg:flex">
          {links.map((link) =>
            isPlainRoute(link.to) ? (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative py-2 text-[0.9rem] font-semibold transition-colors ${
                    isActive
                      ? 'text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:mx-auto after:h-[3px] after:w-4 after:rounded-full after:bg-primary'
                      : 'text-ink-soft hover:text-ink'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className="py-2 text-[0.9rem] font-semibold text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/tes"
            className="btn btn-primary hidden px-5 py-2.5 text-sm sm:inline-flex lg:min-h-[44px]"
          >
            Mulai tes
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <button
            type="button"
            className="btn btn-ghost grid h-11 w-11 place-items-center rounded-full p-0 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="menu-mobile"
          className="animate-fade max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-white lg:hidden"
        >
          <nav aria-label="Navigasi mobile" className="shell flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-xl px-3 py-3 text-[0.95rem] font-semibold text-ink-soft transition-colors hover:bg-primary-soft hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/tes" className="btn btn-primary mt-3 w-full">
              Mulai tes
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <p className="field-note px-3 pb-1 pt-3">
              Hasil tes tersimpan di perangkat ini, tanpa perlu membuat akun.
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}