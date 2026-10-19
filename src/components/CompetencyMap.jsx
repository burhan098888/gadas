import { Check, Compass, Flag } from 'lucide-react';

const nodes = [
  {
    id: 'bilangan',
    label: 'Bilangan',
    left: '14%',
    top: '70%',
    status: 'done',
  },
  {
    id: 'aljabar',
    label: 'Aljabar',
    left: '40%',
    top: '48%',
    status: 'done',
  },
  {
    id: 'geometri',
    label: 'Geometri',
    left: '66%',
    top: '64%',
    status: 'focus',
  },
  {
    id: 'data',
    label: 'Data',
    left: '84%',
    top: '20%',
    status: 'target',
  },
];

const nodeStyles = {
  done: 'bg-mint text-white ring-4 ring-mint/15',
  focus: 'bg-violet text-white ring-4 ring-violet/15',
  target: 'bg-sun text-ink ring-4 ring-sun/30',
};

const nodeIcons = {
  done: Check,
  focus: Compass,
  target: Flag,
};

export default function CompetencyMap() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -right-5 -top-5 h-20 w-20 rotate-12 rounded-3xl bg-sun/70"
      />
      <div className="card relative overflow-hidden rounded-[26px] p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.72rem] font-semibold text-ink-soft">Contoh peta hasil</p>
            <h2 className="display-tight mt-1 text-lg text-ink">Matematika · 8 soal</h2>
          </div>
          <span className="rounded-full bg-sun-soft px-3 py-1 text-[0.68rem] font-bold text-[#8a5f00]">
            Ilustrasi
          </span>
        </div>

        <div className="relative mt-3 h-[250px] w-full sm:h-[280px]" aria-hidden="true">
          <div className="absolute inset-0 rounded-2xl bg-[#f4f7ff]" />
          <div className="dot-grid absolute inset-0 rounded-2xl opacity-60" />

          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <path
              d="M14 70 C 24 62, 30 49, 40 48 C 50 47, 56 69, 66 64 C 76 59, 73 30, 84 20"
              fill="none"
              stroke="#aab8e4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1 7"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <span className="absolute left-[27%] top-[52%] h-1.5 w-1.5 rounded-full bg-line-strong" />
          <span className="absolute left-[53%] top-[62%] h-1.5 w-1.5 rounded-full bg-line-strong" />
          <span className="absolute left-[74%] top-[45%] h-1.5 w-1.5 rounded-full bg-line-strong" />

          {nodes.map((node) => {
            const Icon = nodeIcons[node.status];
            return (
              <div
                key={node.id}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                style={{ left: node.left, top: node.top }}
              >
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full sm:h-11 sm:w-11 ${nodeStyles[node.status]}`}
                >
                  <Icon className="h-[1.1rem] w-[1.1rem]" />
                </span>
                <span className="mt-1.5 rounded-md border border-line bg-white px-2 py-0.5 text-[0.66rem] font-bold text-ink shadow-sm sm:text-[0.7rem]">
                  {node.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[0.68rem] font-semibold text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-mint" aria-hidden="true" />
            Sudah kuat
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-violet" aria-hidden="true" />
            Perlu latihan
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-sun" aria-hidden="true" />
            Target berikutnya
          </span>
        </div>

        <p className="mt-3 border-t border-line pt-3 text-[0.72rem] leading-relaxed text-ink-soft">
          Peta ini dibuat dari jawabanmu setelah tes selesai. Contoh di atas bukan hasil
          pengerjaanmu.
        </p>
      </div>
    </div>
  );
}