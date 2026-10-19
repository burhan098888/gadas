import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  CircleX,
  Lightbulb,
  Printer,
  RotateCcw,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { api } from '../services/api.js';
import { getParticipantId } from '../lib/participant.js';
import { formatDateTime } from '../lib/format.js';
import ScoreRing from '../components/ScoreRing.jsx';
import TopicBar from '../components/TopicBar.jsx';
import { ErrorPanel, LoadingPanel } from '../components/StatePanel.jsx';
import usePageTitle from '../hooks/usePageTitle.js';

export default function Result() {
  const { attemptId } = useParams();
  const participantId = useMemo(() => getParticipantId(), []);
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(0);

  usePageTitle(attempt ? `Hasil ${attempt.testTitle}` : 'Hasil tes');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getAttempt(attemptId, participantId);
      setAttempt(data.attempt);
      setStatus(200);
    } catch (requestError) {
      setError(requestError.message);
      setStatus(requestError.status);
    } finally {
      setLoading(false);
    }
  }, [attemptId, participantId]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="shell py-14">
        <LoadingPanel label="Menyiapkan hasil tes…" />
      </div>
    );
  }

  if (error || !attempt) {
    return (
      <div className="shell py-14">
        <ErrorPanel
          title={status === 404 ? 'Hasil tes tidak ditemukan' : 'Belum bisa memuat hasil'}
          message={
            status === 404
              ? 'Hasil ini tidak tersedia di perangkat ini. Coba buka riwayat dari dashboard.'
              : error
          }
          onRetry={status === 404 ? undefined : load}
        />
        <div className="mt-6 text-center">
          <Link to="/dashboard" className="text-link text-sm">
            Kembali ke dashboard
          </Link>
        </div>
      </div>
    );
  }

  const bandTone =
    attempt.score >= 70
      ? 'bg-mint-soft text-mint'
      : attempt.score >= 50
        ? 'bg-sun-soft text-[#8a5f00]'
        : 'bg-violet-soft text-violet';

  return (
    <div className="shell py-10 sm:py-14">
      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/dashboard"
          className="text-sm font-semibold text-ink-soft transition-colors hover:text-primary"
        >
          ← Dashboard
        </Link>
        <Link to="/tes" className="text-sm font-semibold text-ink-soft transition-colors hover:text-primary">
          Lihat tes lain
        </Link>
      </div>

      <header className="mt-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${bandTone}`}>
            {attempt.band.label}
          </span>
          <span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-ink-soft">
            {attempt.level}
          </span>
        </div>
        <h1 className="display mt-3 text-[2.1rem] text-ink sm:text-[2.8rem]">{attempt.testTitle}</h1>
        <p className="mt-1.5 text-sm text-ink-soft">Hasil pengerjaan · {formatDateTime(attempt.submittedAt)}</p>
      </header>

      <section className="card print-plain mt-6 overflow-hidden">
        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[auto_1fr] md:items-center md:gap-10">
          <div className="flex justify-center">
            <ScoreRing value={attempt.score} size={176} />
          </div>
          <div>
            <p className="display-tight text-2xl text-ink">
              {attempt.correctCount} dari {attempt.totalQuestions} soal benar
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
              {attempt.band.message}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded-lg bg-paper px-2.5 py-1 text-ink-soft">
                {attempt.answeredCount} soal dijawab
              </span>
              <span className="rounded-lg bg-paper px-2.5 py-1 text-ink-soft">
                {attempt.totalQuestions - attempt.answeredCount} soal kosong
              </span>
            </div>

            <div className="no-print mt-6 grid gap-2.5 sm:flex sm:flex-wrap">
              <Link to={`/tes/${attempt.testId}`} className="btn btn-primary px-5">
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Kerjakan ulang
              </Link>
              <button type="button" className="btn btn-secondary px-5" onClick={() => window.print()}>
                <Printer className="h-4 w-4" aria-hidden="true" />
                Cetak hasil
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="card print-plain p-6">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary">
              <TrendingUp className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="display-tight text-xl text-ink">Peta kompetensimu</h2>
          </div>
          <div className="mt-6 space-y-6">
            {attempt.topics.map((topic) => (
              <TopicBar key={topic.id} topic={topic} />
            ))}
          </div>
        </section>

        <div className="space-y-4">
          <section className="card print-plain p-6">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-mint-soft text-mint">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="display-tight text-xl text-ink">Yang sudah kuat</h2>
            </div>
            {attempt.strengths.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {attempt.strengths.map((topic) => (
                  <li
                    key={topic}
                    className="inline-flex items-center gap-1.5 rounded-full bg-mint-soft px-3 py-1.5 text-xs font-bold text-mint"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    {topic}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Belum ada topik yang mencapai 80%. Itu wajar untuk awal latihan — lihat fokus
                berikutnya di samping.
              </p>
            )}
          </section>

          <section className="card print-plain p-6">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-soft text-violet">
                <Lightbulb className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="display-tight text-xl text-ink">Fokus berikutnya</h2>
            </div>
            {attempt.recommendations.length > 0 ? (
              <ol className="mt-4 space-y-4">
                {attempt.recommendations.map((item, index) => (
                  <li key={item.topicId} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-violet-soft text-[0.7rem] font-bold text-violet">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-ink">{item.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">{item.action}</p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Semua topik sudah di atas 80%. Coba tes lain atau kerjakan ulang untuk menjaga
                konsistensi.
              </p>
            )}
          </section>
        </div>
      </div>

      <section className="mt-6">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="display-tight text-2xl text-ink">Pembahasan jawaban</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Buka tiap soal untuk membandingkan jawabanmu dengan kunci dan pembahasannya.
            </p>
          </div>
          <p className="text-xs font-semibold text-ink-soft">
            {attempt.correctCount} benar · {attempt.totalQuestions - attempt.correctCount} belum tepat
          </p>
        </div>

        <div className="mt-4 space-y-2.5">
          {attempt.review.map((item, index) => (
            <details key={item.questionId} className="group card print-plain overflow-hidden">
              <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-4 transition-colors hover:bg-paper/70 sm:px-5 [&::-webkit-details-marker]:hidden">
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                    item.isCorrect
                      ? 'bg-mint-soft text-mint'
                      : 'bg-coral-soft text-coral'
                  }`}
                  aria-hidden="true"
                >
                  {item.isCorrect ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <CircleX className="h-4 w-4" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-ink">
                    Soal {index + 1} · {item.topicName}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-ink-soft">
                    {item.isCorrect ? 'Jawaban benar' : 'Jawaban belum tepat'}
                  </span>
                </span>
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-ink-soft transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>

              <div className="border-t border-line px-4 pb-5 pt-4 sm:px-5">
                {item.passage && (
                  <blockquote className="rounded-xl border-l-4 border-primary/25 bg-paper px-4 py-3 text-sm leading-relaxed text-ink-soft">
                    {item.passage}
                  </blockquote>
                )}
                <p className={`whitespace-pre-line text-sm font-semibold leading-relaxed text-ink ${item.passage ? 'mt-3' : ''}`}>
                  {item.prompt}
                </p>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <div
                    className={`rounded-xl px-3.5 py-3 ${
                      item.isCorrect ? 'bg-mint-soft' : 'bg-coral-soft'
                    }`}
                  >
                    <p className="text-[0.68rem] font-bold text-ink-soft">Jawabanmu</p>
                    <p className="mt-1 text-sm font-semibold text-ink">
                      {item.selectedOptionText ?? 'Tidak dijawab'}
                    </p>
                  </div>
                  <div className="rounded-xl bg-mint-soft px-3.5 py-3">
                    <p className="text-[0.68rem] font-bold text-ink-soft">Jawaban benar</p>
                    <p className="mt-1 text-sm font-semibold text-ink">
                      {item.correctOptionText}
                    </p>
                  </div>
                </div>

                <p className="mt-4 rounded-xl bg-paper px-4 py-3 text-sm leading-relaxed text-ink-soft">
                  <span className="font-bold text-ink">Pembahasan: </span>
                  {item.explanation}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <div className="no-print mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl bg-primary-soft px-6 py-6 sm:flex-row">
        <p className="text-sm font-semibold text-ink">
          Mau memetakan mata pelajaran lain?
        </p>
        <Link to="/tes" className="btn btn-primary">
          Pilih tes berikutnya
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}