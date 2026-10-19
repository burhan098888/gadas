const STORAGE_KEY = 'diagnostik.participantId';

function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

export function getParticipantId() {
  try {
    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (existing && /^[a-zA-Z0-9-]{8,64}$/.test(existing)) return existing;

    const id = createId();
    window.localStorage.setItem(STORAGE_KEY, id);
    return id;
  } catch {
    // Mode privat atau penyimpanan diblokir: tetap beri id sementara untuk sesi ini.
    return createId();
  }
}