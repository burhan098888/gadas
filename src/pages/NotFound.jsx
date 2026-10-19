import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle.js';

export default function NotFound() {
  usePageTitle('Halaman tidak ditemukan');

  return (
    <div className="shell flex min-h-[60vh] items-center py-16">
      <div className="mx-auto max-w-md text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-primary-soft text-primary">
          <Compass className="h-8 w-8" aria-hidden="true" />
        </span>
        <p className="display mt-5 text-[3rem] leading-none text-ink">404</p>
        <h1 className="display-tight mt-2 text-2xl text-ink">Halaman ini tidak ada di peta</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Tautan mungkin sudah berubah. Kembali ke beranda atau pilih tes dari daftar.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          <Link to="/" className="btn btn-primary px-5">
            Ke beranda
          </Link>
          <Link to="/tes" className="btn btn-secondary px-5">
            Lihat daftar tes
          </Link>
        </div>
      </div>
    </div>
  );
}