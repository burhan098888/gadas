const BASE_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
  } catch {
    throw new ApiError(
      'Tidak dapat terhubung ke server. Periksa koneksimu, lalu coba lagi.',
      0,
    );
  }

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    throw new ApiError(
      payload?.error ?? 'Permintaan tidak berhasil. Coba lagi sebentar.',
      response.status,
    );
  }

  return payload;
}

export const api = {
  getTests: () => request('/api/tests'),

  getTest: (testId) => request(`/api/tests/${encodeURIComponent(testId)}`),

  getQuestions: (testId) => request(`/api/tests/${encodeURIComponent(testId)}/questions`),

  submitAttempt: ({ testId, participantId, answers }) =>
    request('/api/attempts', {
      method: 'POST',
      body: JSON.stringify({ testId, participantId, answers }),
    }),

  getAttempts: (participantId) =>
    request(`/api/attempts?participantId=${encodeURIComponent(participantId)}`),

  getAttempt: (attemptId, participantId) =>
    request(
      `/api/attempts/${encodeURIComponent(attemptId)}?participantId=${encodeURIComponent(participantId)}`,
    ),
};