import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  X,
} from 'lucide-react';
import Brand from '../components/Brands.jsx';
import Modal from '../components/Modal.jsx';
import { ErrorPanel, LoadingPanel } from '../components/StatePanel.jsx';
import { api } from '../services/api.js';
import { getParticipantId } from '../lib/participant.js';
import { clearDraft, readDraft, writeDraft } from '../lib/draft.js';
import usePageTitle from '../hooks/usePageTitle.js';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

function headerExitButton(onClick) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-ghost gap-1.5 px-3 py-2 text-sm"
    >
      <X className="h-4 w-4" aria-hidden="true" />
      Keluar
    </button>
  );
}

export default function TestRunner() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(0);
  const [answers, setAnswers] = useState({});
  const [index, setIndex] = useState(0);
  const [dialog, setDialog] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  usePageTitle(data?.title ?? 'Mengerjakan tes');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const payload = await api.getQuestions(testId);
      setData(payload);
      const draft = readDraft(testId);
      setAnswers(draft?.answers ?? {});
      const savedIndex = Number(draft?.index ?? 0);
      const safeIndex = Number.isFinite(savedIndex)
        ? Math.min(Math.max(savedIndex, 0), payload.questions.length - 1)
        : 0;
      setIndex(safeIndex);
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

  useEffect(() => {
    if (!data) return;
    writeDraft(testId, { answers, index, updatedAt: new Date().toISOString() });
  }, [answers, index, data, testId]);

  const questions = data?.questions ?? [];
  const total = questions.length;
  const question = questions[index];
  const answeredCount = useMemo(
    () => questions.filter((item) => answers[item.id]).length,
    [questions, answers],
  );
  const unansweredCount = total - answeredCount;
  const selected = question ? answers[question.id] : undefined;
  const isLast = index === total - 1;

  function chooseOption(optionId) {
    if (!question) return;
    setAnswers((previous) => ({ ...previous, [question.id]: optionId }));
  }

  function goTo(nextIndex) {
    setIndex(Math.min(Math.max(nextIndex, 0), total - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function submitAttempt() {
    setSubmitting(true);
    setSubmitError('');
    try {
      const payload = Object.entries(answers).map(([questionId, optionId]) => ({
        questionId,
        optionId,
      }));
      const response = await api.submitAttempt({
        testId,
        participantId: getParticipantId(),
        answers: payload,
      });
      clearDraft(testId);
      navigate(`/hasil/${response.attempt.id}`, { replace: true });
    } catch (requestError) {
      setSubmitError(requestError.message);
      setSubmitting(false);
    }
  }

  function handleExit() {
    setDialog('exit');
  }

  if (loading) {
    return (
      <RunnerShell>
        <LoadingPanel label="Menyiapkan soal…" />
      </RunnerShell>
    );
  }

  if (error || !data) {
    return (
      <RunnerShell>
        <ErrorPanel
          title={status === 404 ? 'Tes tidak ditemukan' : 'Belum bisa memuat soal'}
          message={
            status === 404
              ? 'Tes ini mungkin sudah tidak tersedia. Kembali ke daftar untuk memilih tes lain.'
              : error
          }
          onRetry={status === 404 ? undefined : load}
        />
        <div className="mt-6 text-center">
          <Link to="/tes" className="text-link text-sm">
            Kembali ke daftar tes
          </Link>
        </div>
      </RunnerShell>
    );
  }

  const progress = total === 0 ? 0 : Math.round(((index + 1) / total) * 100);

  return (
    <RunnerShell onExit={handleExit} testTitle={data.title}>
      <div className="shell max-w-3xl py-6 sm:py-10">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="font-display text-lg font-bold text-ink">
              Soal {index + 1} <span className="text-ink-soft">dari {total}</span>
            </p>
            <p className="mt-0.5 text-xs font-semibold text-ink-soft">
              {answeredCount} terjawab · {unansweredCount} belum dijawab
            </p>
          </div>
          <p className="text-xs font-semibold text-ink-soft">Tanpa batas waktu</p>
        </div>

        <div
          className="mt-3 h-2.5 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-label="Kemajuan pengerjaan"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <nav aria-label="Pindah soal" className="mt-4 flex flex-wrap gap-1.5">
          {questions.map((item, itemIndex) => {
            const isAnswered = Boolean(answers[item.id]);
            const isCurrent = itemIndex === index;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(itemIndex)}
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={`Soal ${itemIndex + 1}${isAnswered ? ', sudah dijawab' : ', belum dijawab'}${
                  isCurrent ? ', sedang dibuka' : ''
                }`}
                className={`grid h-9 w-9 place-items-center rounded-lg border text-xs font-bold transition-colors ${
                  isCurrent
                    ? 'border-primary bg-primary text-white'
                    : isAnswered
                      ? 'border-mint/30 bg-mint-soft text-mint'
                      : 'border-line bg-white text-ink-soft hover:border-primary/40 hover:text-primary'
                }`}
              >
                {itemIndex + 1}
              </button>
            );
          })}
        </nav>

        <article className="card mt-5 p-5 sm:p-8">
          <p className="inline-flex rounded-full bg-primary-soft px-3 py-1 text-[0.7rem] font-bold text-primary">
            {question?.topicName || 'Soal'}
          </p>
          {question?.passage && (
            <blockquote className="mt-4 rounded-2xl border-l-4 border-primary/30 bg-paper px-4 py-3.5 text-[0.94rem] leading-relaxed text-ink-soft sm:px-5">
              {question.passage}
            </blockquote>
          )}

          <h1
            id="question-prompt"
            className="display-tight mt-4 whitespace-pre-line text-[1.25rem] text-ink sm:text-[1.5rem]"
          >
            {question?.prompt}
          </h1>

          <div
            role="radiogroup"
            aria-labelledby="question-prompt"
            className="mt-6 space-y-2.5"
          >
            {question?.options.map((option, optionIndex) => {
              const isSelected = selected === option.id;
              return (
                <label
                  key={option.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/40 sm:p-4.5 ${
                    isSelected
                      ? 'border-primary bg-primary-soft'
                      : 'border-line bg-white hover:border-primary/35 hover:bg-primary-soft/30'
                  }`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.id}
                    checked={isSelected}
                    onChange={() => chooseOption(option.id)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border text-xs font-bold ${
                      isSelected
                        ? 'border-primary bg-primary text-white'
                        : 'border-line-strong bg-paper text-ink-soft'
                    }`}
                  >
                    {isSelected ? <Check className="h-4 w-4" /> : LETTERS[optionIndex]}
                  </span>
                  <span className="pt-1 text-[0.94rem] leading-relaxed text-ink">
                    {option.text}
                  </span>
                </label>
              );
            })}
          </div>

          <p className="mt-5 flex items-center gap-1.5 text-[0.7rem] text-ink-soft">
            <CheckCircle2 className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
            Jawaban tersimpan otomatis di perangkat ini.
          </p>
        </article>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            className="btn btn-secondary whitespace-nowrap px-4 sm:px-5"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span className="sm:hidden">Kembali</span>
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>

          {isLast ? (
            <button
              type="button"
              className="btn btn-primary whitespace-nowrap px-5 sm:px-6"
              onClick={() => setDialog('finish')}
            >
              <span className="sm:hidden">Selesai</span>
              <span className="hidden sm:inline">Selesai dan lihat hasil</span>
              <Check className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary whitespace-nowrap px-5 sm:px-6"
              onClick={() => goTo(index + 1)}
            >
              <span className="sm:hidden">Lanjut</span>
              <span className="hidden sm:inline">Soal berikutnya</span>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <Modal
        open={dialog === 'finish'}
        onClose={() => (submitting ? null : setDialog(null))}
        title="Selesaikan tes?"
        description="Setelah selesai, kamu akan melihat skor, peta topik, dan pembahasan."
        footer={
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setDialog(null)}
              disabled={submitting}
            >
              Periksa lagi
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={submitAttempt}
              disabled={submitting}
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {submitting ? 'Menghitung hasil…' : 'Ya, selesaikan'}
            </button>
          </>
        }
      >
        <div className="rounded-2xl bg-paper p-4">
          <p className="text-sm font-semibold text-ink">
            {unansweredCount === 0
              ? 'Semua soal sudah dijawab.'
              : `${unansweredCount} soal belum dijawab.`}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-ink-soft">
            {unansweredCount === 0
              ? 'Kamu masih bisa kembali untuk memeriksa jawaban sebelum menyelesaikan tes.'
              : 'Soal yang kosong akan dihitung sebagai jawaban salah. Kamu bisa kembali untuk mengisinya.'}
          </p>
        </div>
        {submitError && (
          <p className="mt-3 rounded-xl bg-coral-soft px-4 py-3 text-xs font-semibold text-coral" role="alert">
            {submitError}
          </p>
        )}
      </Modal>

      <Modal
        open={dialog === 'exit'}
        onClose={() => setDialog(null)}
        title="Keluar dari tes?"
        description={`Jawabanmu (${answeredCount} soal) tersimpan sebagai draf. Kamu bisa melanjutkan nanti dari daftar tes.`}
        footer={
          <>
            <button type="button" className="btn btn-secondary" onClick={() => setDialog(null)}>
              Tetap di sini
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate(`/tes/${testId}`)}
            >
              Keluar ke detail tes
            </button>
          </>
        }
      />
    </RunnerShell>
  );
}

function RunnerShell({ children, onExit, testTitle }) {
  return (
    <div className="min-h-screen bg-paper">
      <a
        href="#konten-tes"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Lewati ke soal
      </a>
      <header className="no-print sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
        <div className="shell flex h-16 items-center justify-between gap-3">
          <Brand />
          {testTitle && (
            <p className="hidden truncate text-sm font-semibold text-ink-soft md:block">
              {testTitle}
            </p>
          )}
          {onExit ? (
            headerExitButton(onExit)
          ) : (
            <Link to="/tes" className="btn btn-ghost gap-1.5 px-3 py-2 text-sm">
              <X className="h-4 w-4" aria-hidden="true" />
              Keluar
            </Link>
          )}
        </div>
      </header>
      <main id="konten-tes">{children}</main>
    </div>
  );
}