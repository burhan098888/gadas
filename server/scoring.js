import { findTest } from './data/tests.js';

const STATUS = {
  strong: { label: 'Sudah kuat', tone: 'success' },
  growing: { label: 'Sedang berkembang', tone: 'accent' },
  focus: { label: 'Perlu latihan', tone: 'violet' },
};

const BANDS = [
  {
    min: 85,
    label: 'Sangat siap',
    message: 'Dasar kamu kuat. Tantang dirimu dengan soal tingkat lanjut dan jaga ritme latihan.',
  },
  {
    min: 70,
    label: 'Cukup kuat',
    message: 'Sebagian besar konsep sudah kamu kuasai. Rapi kan topik yang masih goyah, lalu coba lagi.',
  },
  {
    min: 50,
    label: 'Perlu penguatan',
    message: 'Kamu sudah punya bekal awal. Fokus pada topik yang paling lemah satu per satu, tanpa terburu-buru.',
  },
  {
    min: 0,
    label: 'Awal yang baik',
    message: 'Setiap peta dimulai dari satu titik. Mulai dari topik paling dasar, lalu ukur lagi kemajuanmu.',
  },
];

function statusFor(percent) {
  if (percent >= 80) return { key: 'strong', ...STATUS.strong };
  if (percent >= 60) return { key: 'growing', ...STATUS.growing };
  return { key: 'focus', ...STATUS.focus };
}

function bandFor(score) {
  return BANDS.find((band) => score >= band.min) ?? BANDS[BANDS.length - 1];
}

/**
 * Menghitung hasil dari jawaban peserta. Kunci jawaban tetap di server.
 *
 * @param {object} test
 * @param {Array<{questionId: string, optionId: string}>} answers
 * @returns {object} hasil lengkap siap disimpan dan dikirim ke klien
 */
export function scoreTest(test, answers) {
  if (!test) throw new Error('Tes tidak ditemukan');
  if (!Array.isArray(answers)) throw new Error('Format jawaban tidak valid');

  const answerMap = new Map();
  for (const answer of answers) {
    if (!answer || typeof answer.questionId !== 'string' || typeof answer.optionId !== 'string') {
      throw new Error('Format jawaban tidak valid');
    }
    const question = test.questions.find((item) => item.id === answer.questionId);
    if (!question) throw new Error(`Soal tidak dikenal: ${answer.questionId}`);
    if (!question.options.some((option) => option.id === answer.optionId)) {
      throw new Error(`Pilihan jawaban tidak valid untuk soal ${answer.questionId}`);
    }
    answerMap.set(answer.questionId, answer.optionId);
  }

  const topicTotals = new Map(
    test.topics.map((topic) => [topic.id, { ...topic, correct: 0, total: 0 }]),
  );

  let correctCount = 0;
  const review = [];

  for (const question of test.questions) {
    const topic = topicTotals.get(question.topicId);
    if (topic) topic.total += 1;

    const selectedOptionId = answerMap.get(question.id) ?? null;
    const isCorrect = selectedOptionId === question.answer;
    if (isCorrect) {
      correctCount += 1;
      if (topic) topic.correct += 1;
    }

    const selectedOption = question.options.find((option) => option.id === selectedOptionId);
    const correctOption = question.options.find((option) => option.id === question.answer);

    review.push({
      questionId: question.id,
      passage: question.passage ?? null,
      prompt: question.prompt,
      topicId: question.topicId,
      topicName: topic?.name ?? '',
      selectedOptionId,
      selectedOptionText: selectedOption?.text ?? null,
      correctOptionId: question.answer,
      correctOptionText: correctOption?.text ?? null,
      isCorrect,
      explanation: question.explanation,
    });
  }

  const topics = [...topicTotals.values()].map((topic) => {
    const percent = topic.total === 0 ? 0 : Math.round((topic.correct / topic.total) * 100);
    const status = statusFor(percent);
    return {
      id: topic.id,
      name: topic.name,
      correct: topic.correct,
      total: topic.total,
      percent,
      status: status.label,
      statusKey: status.key,
      tone: status.tone,
      practice: topic.practice,
    };
  });

  const score = Math.round((correctCount / test.questions.length) * 100);
  const band = bandFor(score);
  const sorted = [...topics].sort((a, b) => b.percent - a.percent);
  const strengths = sorted.filter((topic) => topic.percent >= 80);
  const focusAreas = sorted
    .filter((topic) => topic.percent < 80)
    .sort((a, b) => a.percent - b.percent);

  return {
    testId: test.id,
    testTitle: test.title,
    subject: test.subject,
    level: test.level,
    accent: test.accent,
    totalQuestions: test.questions.length,
    answeredCount: answerMap.size,
    correctCount,
    score,
    band: { label: band.label, message: band.message },
    topics,
    strengths: strengths.map((topic) => topic.name),
    focusAreas: focusAreas.map((topic) => topic.name),
    recommendations: focusAreas.map((topic) => ({
      topicId: topic.id,
      title: topic.name,
      action: topic.practice,
    })),
    review,
  };
}

export function summarizeAttempt(attempt) {
  return {
    id: attempt.id,
    testId: attempt.testId,
    testTitle: attempt.testTitle,
    subject: attempt.subject,
    level: attempt.level,
    accent: attempt.accent,
    score: attempt.score,
    correctCount: attempt.correctCount,
    totalQuestions: attempt.totalQuestions,
    band: attempt.band,
    submittedAt: attempt.submittedAt,
  };
}