import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';
import TestCard from '../components/TestCard.jsx';
import { ErrorPanel, LoadingPanel } from '../components/StatePanel.jsx';
import useTest from '../hooks/useTest.js';
import usePageTitle from '../hooks/usePageTitle.js';

const filters = ['Semua', 'SMP', 'SMA'];

export default function Tests() {
  usePageTitle('Daftar tes');
  const { tests, loading, error, reload } = useTest();
  const [filter, setFilter] = useState('Semua');

  const visibleTests = useMemo(
    () => (filter === 'Semua' ? tests : tests.filter((test) => test.level === filter)),
    [tests, filter],
  );

  return (
    <div className="shell py-10 sm:py-14">
      <div className="max-w-2xl">
        <Link to="/" className="text-sm font-semibold text-ink-soft transition-colors hover:text-primary">
          ← Kembali ke beranda
        </Link>
        <h1 className="display mt-3 text-[2.3rem] text-ink sm:text-[3rem]">Daftar tes diagnostik</h1>
        <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">
          Pilih satu mata pelajaran. Setiap tes berisi 8 soal dan dapat dikerjakan tanpa batas
          waktu.
        </p>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-2" role="group" aria-label="Filter jenjang">
        {filters.map((item) => {
          const active = filter === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-xs font-bold transition-colors ${
                active
                  ? 'border-primary bg-primary text-white'
                  : 'border-line bg-white text-ink-soft hover:border-primary/40 hover:text-primary'
              }`}
            >
              {item === 'Semua' ? 'Semua jenjang' : item}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-primary/15 bg-primary-soft/60 p-4 text-sm leading-relaxed text-ink">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <p>
          Jawaban disimpan sebagai draf di perangkat ini. Kalau halaman tertutup, kamu bisa
          melanjutkan tes yang sama nanti.
        </p>
      </div>

      <div className="mt-8">
        {loading && <LoadingPanel label="Memuat daftar tes…" />}
        {!loading && error && <ErrorPanel message={error} onRetry={reload} />}
        {!loading && !error && visibleTests.length === 0 && (
          <p className="rounded-3xl border border-dashed border-line-strong bg-white px-6 py-12 text-center text-sm text-ink-soft">
            Belum ada tes untuk jenjang ini.
          </p>
        )}
        {!loading && !error && visibleTests.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {visibleTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}