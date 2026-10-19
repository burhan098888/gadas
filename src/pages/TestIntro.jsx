import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Clock3,
  ListChecks,
  NotebookPen,
  RefreshCw,
} from 'lucide-react';
import { api } from '../services/api.js';
import { clearDraft, draftAnswerCount, readDraft } from '../lib/draft.js';
import { accentFor } from '../lib/accents.js';
import { LoadingPanel, ErrorPanel } from '../components/StatePanel.jsx';
import Modal from '../components/Modal.jsx';
import usePageTitle from '../hooks/usePageTitle.js';

export default function TestIntro() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(0);
  const [confirmRestart, setConfirmRestart] = useState(false);

  usePageTitle(test?.title ?? 'Detail tes');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getTest(testId);
      setTest(data.test);
      setStatus(200);
      setDraft(readDraft(testId));
    } catch (requestError) {
      setError(requestError.message);
      setStatus(requestError.status);
    } finally {
      setLoading(false);
    }
  }, [testId]);

  useEffect(() => {
    load();
  }, [load]);

  const savedAnswers = draftAnswerCount(draft);
  const accent = accentFor(test?.accent);

  function restart() {
    clearDraft(testId);
    setDraft(null);
    setConfirmRestart(false);
    navigate(`/tes/${testId}/kerjakan`);
  }

  if (loading) {
    return (
      <div className="shell py-14">
        <LoadingPanel label="Menyiapkan tes…" />
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="shell py-14">
        <ErrorPanel
          title={status === 404 ? 'Tes tidak ditemukan' : 'Belum bisa memuat tes'}
          message={
            status === 404
              ? 'Tes ini mungkin sudah tidak tersedia. Pilih tes lain dari daftar.'
              : error
          }
          onRetry={status === 404 ? undefined : load}
        />
        <div className="mt-6 text-center">
          <Link to="/tes" className="text-link text-sm">
            Kembali ke daftar tes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shell py-10 sm:py-14">
      <Link
        to="/tes"
        className="text-sm font-semibold text-ink-soft transition-colors hover:text-primary"
      >
        ← Daftar tes
      </Link>

      <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start lg:gap-10">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${accent.chip}`}>
              {test.level}
            </span>
            <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-ink-soft">
              {test.curriculum}
            </span>
          </div>

          <h1 className="display mt-4 text-[2.2rem] text-ink sm:text-[3rem]">{test.title}</h1>
          <p className="mt-3 max-w-2xl text-[0.98rem] leading-relaxed text-ink-soft">
            {test.summary}
          </p>

          <section className="mt-9">
            <h2 className="display-tight text-xl text-ink">Topik yang dipetakan</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {test.topics.map((topic, index) => (
                <article key={topic.id} className="card p-5 shadow-none">
                  <span
                    aria-hidden="true"
                    className={`block h-1.5 w-9 rounded-full ${
                      index === 0 ? 'bg-primary' : index === 1 ? 'bg-violet' : 'bg-mint'
                    }`}
                  />
                  <h3 className="mt-3 font-display text-base font-bold leading-snug text-ink">
                    {topic.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                    {topic.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-9">
            <h2 className="display-tight text-xl text-ink">Sebelum mulai</h2>
            <ul className="mt-4 space-y-3">
              {[
                {
                  icon: ListChecks,
                  text: `${test.questionCount} soal pilihan ganda, satu jawaban benar per soal.`,
                },
                {
                  icon: Clock3,
                  text: 'Tidak ada batas waktu. Kamu bisa kembali ke soal sebelumnya.',
                },
                {
                  icon: NotebookPen,
                  text: 'Jawaban tersimpan sebagai draf. Nilai baru dihitung setelah kamu menekan Selesai.',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.text} className="flex items-start gap-3 text-sm text-ink">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-paper text-primary">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="pt-1 leading-relaxed">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="card overflow-hidden">
            <div className="bg-ink px-6 py-5 text-white">
              <p className="text-xs font-semibold text-white/65">Siap dikerjakan</p>
              <p className="display-tight mt-1 text-xl">{test.subject}</p>
            </div>
            <div className="p-6">
              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-ink-soft">Jumlah soal</dt>
                  <dd className="font-bold text-ink">{test.questionCount} soal</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-ink-soft">Topik</dt>
                  <dd className="font-bold text-ink">{test.topics.length} topik</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-ink-soft">Waktu</dt>
                  <dd className="font-bold text-ink">Tanpa batas</dd>
                </div>
              </dl>

              {draft && savedAnswers > 0 ? (
                <div className="mt-6 rounded-2xl border border-sun/50 bg-sun-soft p-4">
                  <p className="flex items-center gap-2 text-sm font-bold text-ink">
                    <RefreshCw className="h-4 w-4 text-[#8a5f00]" aria-hidden="true" />
                    Draf tersimpan
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                    Kamu sudah menjawab {savedAnswers} dari {test.questionCount} soal.
                  </p>
                  <Link to={`/tes/${testId}/kerjakan`} className="btn btn-primary mt-4 w-full">
                    Lanjutkan tes
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setConfirmRestart(true)}
                    className="mt-2 w-full rounded-full py-2 text-xs font-semibold text-ink-soft transition-colors hover:text-coral"
                  >
                    Mulai dari awal
                  </button>
                </div>
              ) : (
                <Link to={`/tes/${testId}/kerjakan`} className="btn btn-primary mt-6 w-full">
                  Mulai tes
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}

              <p className="mt-4 flex items-start gap-2 text-[0.7rem] leading-relaxed text-ink-soft">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint" aria-hidden="true" />
                Hasil dan pembahasan langsung tersedia setelah tes selesai.
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-line bg-white p-4 text-xs leading-relaxed text-ink-soft">
            <BookOpenCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            Tes ini untuk latihan mandiri, bukan penilaian resmi sekolah.
          </div>
        </aside>
      </div>

      <Modal
        open={confirmRestart}
        onClose={() => setConfirmRestart(false)}
        title="Mulai dari awal?"
        description={`Jawaban draf sebanyak ${savedAnswers} soal akan dihapus. Tindakan ini hanya berlaku di perangkat ini.`}
        footer={
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setConfirmRestart(false)}
            >
              Batal
            </button>
            <button type="button" className="btn btn-primary" onClick={restart}>
              Hapus draf dan mulai
            </button>
          </>
        }
      />
    </div>
  );
}