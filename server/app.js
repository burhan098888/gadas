import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import {
  findTest,
  getPublicQuestions,
  getTestDetail,
  getTestSummaries,
} from './data/tests.js';
import { scoreTest, summarizeAttempt } from './scoring.js';
import { getAttempt, listAttempts, saveAttempt } from './store/attempts.js';

const PARTICIPANT_PATTERN = /^[a-zA-Z0-9-]{8,64}$/;

function readParticipant(value) {
  if (typeof value !== 'string' || !PARTICIPANT_PATTERN.test(value)) return null;
  return value;
}

export function createApp() {
  const app = express();

  const allowedOrigins = (process.env.CLIENT_ORIGIN ?? 'http://localhost:5173,http://127.0.0.1:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.disable('x-powered-by');
  app.use(cors({ origin: allowedOrigins }));
  app.use(express.json({ limit: '100kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'diagnostik-api' });
  });

  app.get('/api/tests', (_req, res) => {
    res.json({ tests: getTestSummaries() });
  });

  app.get('/api/tests/:testId', (req, res) => {
    const test = getTestDetail(req.params.testId);
    if (!test) {
      return res.status(404).json({ error: 'Tes tidak ditemukan.' });
    }
    return res.json({ test });
  });

  app.get('/api/tests/:testId/questions', (req, res) => {
    const questions = getPublicQuestions(req.params.testId);
    if (!questions) {
      return res.status(404).json({ error: 'Tes tidak ditemukan.' });
    }
    return res.json(questions);
  });

  app.post('/api/attempts', async (req, res, next) => {
    try {
      const participantId = readParticipant(req.body?.participantId);
      if (!participantId) {
        return res.status(400).json({ error: 'Identitas peserta tidak valid.' });
      }

      const test = findTest(req.body?.testId);
      if (!test) {
        return res.status(404).json({ error: 'Tes tidak ditemukan.' });
      }

      if (!Array.isArray(req.body?.answers)) {
        return res.status(400).json({ error: 'Daftar jawaban wajib dikirim.' });
      }

      const result = scoreTest(test, req.body.answers);
      const attempt = await saveAttempt(result, participantId);
      return res.status(201).json({ attempt });
    } catch (error) {
      if (error.message?.startsWith('Format jawaban') || error.message?.startsWith('Pilihan jawaban') || error.message?.startsWith('Soal tidak dikenal')) {
        return res.status(400).json({ error: error.message });
      }
      return next(error);
    }
  });

  app.get('/api/attempts', async (req, res, next) => {
    try {
      const participantId = readParticipant(req.query.participantId);
      if (!participantId) {
        return res.status(400).json({ error: 'Identitas peserta tidak valid.' });
      }
      const attempts = await listAttempts(participantId);
      return res.json({ attempts: attempts.map(summarizeAttempt) });
    } catch (error) {
      return next(error);
    }
  });

  app.get('/api/attempts/:attemptId', async (req, res, next) => {
    try {
      const participantId = readParticipant(req.query.participantId);
      if (!participantId) {
        return res.status(400).json({ error: 'Identitas peserta tidak valid.' });
      }
      const attempt = await getAttempt(req.params.attemptId, participantId);
      if (!attempt) {
        return res.status(404).json({ error: 'Hasil tes tidak ditemukan.' });
      }
      return res.set('Cache-Control', 'no-store').json({ attempt });
    } catch (error) {
      return next(error);
    }
  });

  app.use('/api', (_req, res) => {
    res.status(404).json({ error: 'Endpoint tidak ditemukan.' });
  });

  // Sajikan hasil build Vite ketika aplikasi dijalankan lewat `npm start`.
  const distDir = path.resolve('dist');
  const indexPath = path.join(distDir, 'index.html');
  if (existsSync(indexPath)) {
    const indexHtml = readFileSync(indexPath);
    app.use(express.static(distDir));
    app.use((req, res, next) => {
      if (req.method === 'GET' && !req.path.startsWith('/api')) {
        return res.type('html').send(indexHtml);
      }
      return next();
    });
  }

  app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan di server. Coba lagi sebentar.' });
  });

  return app;
}