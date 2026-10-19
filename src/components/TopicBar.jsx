import { topicToneStyles } from '../lib/accents.js';

export default function TopicBar({ topic }) {
  const tone = topicToneStyles[topic.tone] ?? topicToneStyles.violet;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-ink">{topic.name}</span>
          <span className={`rounded-full px-2.5 py-0.5 text-[0.66rem] font-bold ${tone.chip}`}>
            {topic.status}
          </span>
        </span>
        <span className="text-xs font-semibold text-ink-soft">
          {topic.correct}/{topic.total} benar · {topic.percent}%
        </span>
      </div>
      <div
        className="mt-2 h-2.5 overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-label={`${topic.name}: ${topic.percent} persen`}
        aria-valuenow={topic.percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full ${tone.bar}`}
          style={{ width: `${topic.percent}%`, transition: 'width 700ms ease' }}
        />
      </div>
    </div>
  );
}