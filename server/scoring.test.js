import test from 'node:test';
import assert from 'node:assert/strict';
import { findTest } from './data/tests.js';
import { scoreTest } from './scoring.js';

const matematika = findTest('matematika-numerasi');

function answersFor(testItem, correctIds) {
  return testItem.questions
    .filter((question) => correctIds.includes(question.id))
    .map((question) => ({ questionId: question.id, optionId: question.answer }));
}

test('semua jawaban benar menghasilkan skor 100 dan semua topik kuat', () => {
  const answers = matematika.questions.map((question) => ({
    questionId: question.id,
    optionId: question.answer,
  }));
  const result = scoreTest(matematika, answers);

  assert.equal(result.score, 100);
  assert.equal(result.correctCount, 8);
  assert.equal(result.band.label, 'Sangat siap');
  assert.equal(result.focusAreas.length, 0);
  assert.equal(result.topics.every((topic) => topic.statusKey === 'strong'), true);
});

test('jawaban kosong dihitung salah dan tetap menghasilkan rekomendasi', () => {
  const result = scoreTest(matematika, []);

  assert.equal(result.score, 0);
  assert.equal(result.answeredCount, 0);
  assert.equal(result.correctCount, 0);
  assert.equal(result.review.every((item) => item.selectedOptionId === null), true);
  assert.equal(result.recommendations.length, matematika.topics.length);
});

test('pemetaan topik mengikuti jawaban yang benar', () => {
  const answers = answersFor(matematika, ['mat-01', 'mat-02', 'mat-03']);
  const result = scoreTest(matematika, answers);
  const aljabar = result.topics.find((topic) => topic.id === 'bilangan-aljabar');
  const geometri = result.topics.find((topic) => topic.id === 'geometri-pengukuran');

  assert.equal(result.score, 38);
  assert.equal(aljabar.percent, 100);
  assert.equal(aljabar.statusKey, 'strong');
  assert.equal(geometri.percent, 0);
  assert.deepEqual(result.strengths, ['Bilangan & Aljabar']);
  assert.equal(result.recommendations[0].topicId, 'geometri-pengukuran');
});

test('menolak pilihan jawaban yang tidak ada di soal', () => {
  assert.throws(
    () => scoreTest(matematika, [{ questionId: 'mat-01', optionId: 'z' }]),
    /Pilihan jawaban tidak valid/,
  );
});

test('menolak soal yang bukan bagian dari tes', () => {
  assert.throws(
    () => scoreTest(matematika, [{ questionId: 'bin-01', optionId: 'a' }]),
    /Soal tidak dikenal/,
  );
});