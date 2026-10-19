import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  ListChecks,
  Sparkles,
  TrendingUp,
  Trophy,
} from 'lucide-react';
import { api } from '../services/api.js';
import { getParticipantId } from '../lib/participant.js';
import { formatDate } from '../lib/format.js';
import { accentFor } from '../lib/accents.js';
import SubjectIcon from '../components/SubjectIcon.jsx';
import TestCard from '../components/TestCard.jsx';
import { EmptyPanel, ErrorPanel, LoadingPanel } from '../components/StatePanel.jsx';
import useTest from '../hooks/useTest.js';
import usePageTitle from '../hooks/usePageTitle.js';

export default function Dashboard() {
  usePageTitle('Dashboard');
  const participantId = useMemo(() => getParticipantId(), []);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { tests, loading: testsLoading, error: testsError, reload: reloadTests } = useTest();

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getAttempts(participantId);
      setAttempts(data.attempts ?? []);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, [participantId]);

  useEffect(() => {
    load();
  }, [load]);

  const summary = useMemo(() => {
    if (attempts.length === 0) return { total: 0, average: 0, best: 0 };
    const total = attempts.length;
    const sum = attempts.reduce((acc, item) => acc + item.score, 0);
    return {
      total,
      average: Math.round(sum / total),
      best: Math.max(...attempts.map((item) => item.score)),
    };
  }, [attempts]);

  return (
    <div className="shell py-10 sm:py-14">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />
            Tersimpan di perangkat ini
          </span>
          <h1 className="display mt-3 text-[2.2rem] text-ink sm:text-[3rem]">Ringkasan belajarmu</h1>
          <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-ink-soft">
            Lihat hasil tes terakhir, bandingkan pengerjaan, dan pilih langkah berikutnya.
          </p>
        </div>
        <Link to="/tes" className="btn btn-primary shrink-0 px-6">
          Mulai tes
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {loading && (
        <div className="mt-8">
          <LoadingPanel label="Memuat riwayat pengerjaan…" />
        </div>
      )}

      {!loading && error && (
        <div className="mt-8">
          <ErrorPanel message={error} onRetry={load} />
        </div>
      )}

      {!loading && !error && attempts.length === 0 && (
        <div className="mt-8">
          <EmptyPanel
            icon={Compass}
            title="Belum ada peta yang tergambar"
            description="Kerjakan satu tes diagnostik untuk melihat skor, rincian topik, dan saran langkah belajarmu. Hasilnya akan muncul di sini."
            action={
              <Link to="/tes" className="btn btn-primary px-6">
                Mulai tes pertamamu
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            }
          />
        </div>
      )}

      {!loading && !error && attempts.length > 0 && (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <article className="card p-5 shadow-none">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <ListChecks className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-4 text-xs font-semibold text-ink-soft">Tes selesai</p>
              <p className="display mt-1 text-3xl text-ink">{summary.total}</p>
            </article>
            <article className="card p-5 shadow-none">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-soft text-violet">
                <TrendingUp className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-4 text-xs font-semibold text-ink-soft">Rata-rata skor</p>
              <p className="display mt-1 text-3xl text-ink">
                {summary.average}
                <span className="text-lg text-ink-soft">/100</span>
              </p>
            </article>
            <article className="card p-5 shadow-none">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-sun-soft text-[#8a5f00]">
                <Trophy className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-4 text-xs font-semibold text-ink-soft">Skor terbaik</p>
              <p className="display mt-1 text-3xl text-ink">
                {summary.best}
                <span className="text-lg text-ink-soft">/100</span>
              </p>
            </article>
          </div>

          <section className="card mt-6 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-4 sm:px-6">
              <h2 className="display-tight text-xl text-ink">Riwayat pengerjaan</h2>
              <span className="text-xs font-semibold text-ink-soft">
                {attempts.length} pengerjaan
              </span>
            </div>
            <ul className="divide-y divide-line">
              {attempts.map((attempt) => {
                const accent = accentFor(attempt.accent);
                return (
                  <li key={attempt.id}>
                    <Link
                      to={`/hasil/${attempt.id}`}
                      className="flex items-center gap-3.5 px-5 py-4 transition-colors hover:bg-paper/80 sm:px-6"
                    >
                      <span
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${accent.tile}`}
                      >
                        <SubjectIcon subject={attempt.subject} className="h-5 w-5" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-ink">
                          {attempt.testTitle}
                        </span>
                        <span className="mt-0.5 block text-xs text-ink-soft">
                          {formatDate(attempt.submittedAt)} · {attempt.correctCount}/
                          {attempt.totalQuestions} benar · {attempt.level}
                        </span>
                      </span>

                      <span className="shrink-0 text-right">
                        <span className="display block text-xl leading-none text-ink">
                          {attempt.score}%
                        </span>
                        <span className="mt-1 block text-[0.66rem] font-semibold text-ink-soft">
                          {attempt.band.label}
                        </span>
                      </span>

                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-ink-soft"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </>
      )}

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="display-tight text-2xl text-ink">Tes yang bisa dikerjakan</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Setiap tes bisa diulang kapan saja untuk melihat perkembangan.
            </p>
          </div>
          <Link to="/tes" className="text-link hidden shrink-0 text-sm sm:inline-block">
            Semua tes
          </Link>
        </div>

        <div className="mt-5">
          {testsLoading && <LoadingPanel label="Memuat daftar tes…" />}
          {!testsLoading && testsError && (
            <ErrorPanel message={testsError} onRetry={reloadTests} />
          )}
          {!testsLoading && !testsError && (
            <div className="grid gap-4 sm:grid-cols-2">
              {tests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="mt-8 flex items-start gap-2.5 rounded-2xl border border-line bg-white p-4 text-xs leading-relaxed text-ink-soft">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <p>
          Riwayat disimpan di browser perangkat ini. Menghapus data situs di browser akan
          menghapus riwayat tersebut.
        </p>
      </div>
    </div>
  );
}