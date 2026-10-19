import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.resolve('server/.data');
const DATA_FILE = path.join(DATA_DIR, 'attempts.json');
const MAX_ATTEMPTS = 500;

let attempts = null;
let writeQueue = Promise.resolve();

async function loadAttempts() {
  if (attempts) return attempts;
  try {
    const raw = await readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    attempts = Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Gagal membaca riwayat pengerjaan, memulai dari kosong:', error.message);
    }
    attempts = [];
  }
  return attempts;
}

async function persist() {
  const snapshot = [...attempts];
  writeQueue = writeQueue.then(async () => {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(DATA_FILE, JSON.stringify(snapshot, null, 2), 'utf8');
  });
  return writeQueue;
}

export async function saveAttempt(result, participantId) {
  await loadAttempts();
  const attempt = {
    ...result,
    id: randomUUID(),
    participantId,
    submittedAt: new Date().toISOString(),
  };
  attempts.push(attempt);
  if (attempts.length > MAX_ATTEMPTS) {
    attempts = attempts.slice(-MAX_ATTEMPTS);
  }
  await persist();
  return attempt;
}

export async function getAttempt(attemptId, participantId) {
  await loadAttempts();
  const attempt = attempts.find((item) => item.id === attemptId);
  if (!attempt || attempt.participantId !== participantId) return null;
  return attempt;
}

export async function listAttempts(participantId) {
  await loadAttempts();
  return attempts
    .filter((item) => item.participantId === participantId)
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
}