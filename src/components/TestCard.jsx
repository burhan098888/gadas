import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { accentFor } from '../lib/accents.js';
import SubjectIcon from './SubjectIcon.jsx';

export default function TestCard({ test }) {
  const accent = accentFor(test.accent);

  return (
    <Link
      to={`/tes/${test.id}`}
      className="group card relative flex h-full flex-col p-6 transition duration-200 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[var(--shadow-lift)] focus-visible:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`grid h-12 w-12 place-items-center rounded-2xl ${accent.tile}`}>
          <SubjectIcon subject={test.subject} />
        </span>
        <span
          className={`rounded-full px-3 py-1 text-[0.72rem] font-bold tracking-wide ${accent.chip}`}
        >
          {test.level}
        </span>
      </div>

      <h3 className="display-tight mt-5 text-[1.35rem] text-ink">{test.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{test.summary}</p>

      <ul className="mb-6 mt-4 flex flex-wrap gap-1.5" aria-label="Topik yang diuji">
        {test.topics.map((topic) => (
          <li
            key={topic}
            className="rounded-lg bg-paper px-2.5 py-1 text-[0.7rem] font-semibold text-ink-soft"
          >
            {topic}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-5">
        <span className="text-xs font-semibold text-ink-soft">
          {test.questionCount} soal · tanpa batas waktu
        </span>
        <span
          className="grid h-9 w-9 place-items-center rounded-full bg-paper text-ink transition-colors group-hover:bg-primary group-hover:text-white"
          aria-hidden="true"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}