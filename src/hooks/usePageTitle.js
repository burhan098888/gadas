import { useEffect } from 'react';

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Diagnostik` : 'Diagnostik — Peta kemampuan belajar';
  }, [title]);
}