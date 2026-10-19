import { Link } from 'react-router-dom';
import Brand from './Brands.jsx';

const learnLinks = [
  { label: 'Daftar tes', to: '/tes' },
  { label: 'Cara kerja', to: '/#cara-kerja' },
  { label: 'Pertanyaan umum', to: '/#faq' },
  { label: 'Dashboard', to: '/dashboard' },
];

export default function Footer() {
  return (
    <footer className="no-print relative mt-auto overflow-hidden bg-ink text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border-[28px] border-white/5"
      />

      <div className="shell relative py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
          <div>
            <Brand inverse />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              Tes diagnostik singkat untuk memetakan kemampuan, memahami topik yang perlu
              dilatih, dan memilih langkah belajar berikutnya.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-sun" aria-hidden="true" />
              Tanpa akun · tanpa batas waktu
            </p>
          </div>

          <nav aria-label="Navigasi footer" className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <h2 className="font-display text-base font-bold text-white">Belajar</h2>
              <ul className="mt-3 space-y-2.5">
                {learnLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-white">Mulai dari sini</h2>
              <ul className="mt-3 space-y-2.5 text-white/60">
                <li>Pilih mata pelajaran</li>
                <li>Kerjakan 8 soal</li>
                <li>Baca peta hasil</li>
              </ul>
              <Link
                to="/tes"
                className="mt-4 inline-flex rounded-full bg-sun px-4 py-2 text-xs font-bold text-ink transition-transform hover:-translate-y-0.5"
              >
                Mulai tes
              </Link>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Diagnostik. Dibuat untuk latihan belajar.</p>
          <p>Riwayat hasil disimpan di browser perangkat ini.</p>
        </div>
      </div>
    </footer>
  );
}