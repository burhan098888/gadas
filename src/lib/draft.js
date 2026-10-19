const KEY_PREFIX = 'diagnostik.draft.';

function keyFor(testId) {
  return `${KEY_PREFIX}${testId}`;
}

export function readDraft(testId) {
  try {
    const raw = window.localStorage.getItem(keyFor(testId));
    if (!raw) return null;
    const draft = JSON.parse(raw);
    if (!draft || typeof draft !== 'object' || !draft.answers) return null;
    return draft;
  } catch {
    return null;
  }
}

export function writeDraft(testId, draft) {
  try {
    window.localStorage.setItem(keyFor(testId), JSON.stringify(draft));
  } catch {
    // Penyimpanan penuh atau diblokir: pengerjaan tetap berjalan di memori.
  }
}

export function clearDraft(testId) {
  try {
    window.localStorage.removeItem(keyFor(testId));
  } catch {
    // Tidak ada yang perlu ditangani bila penyimpanan tidak tersedia.
  }
}

export function draftAnswerCount(draft) {
  return draft?.answers ? Object.keys(draft.answers).length : 0;
}