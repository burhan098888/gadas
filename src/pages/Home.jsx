import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Compass,
  History,
  Lightbulb,
  Route,
  Sparkles,
  Waypoints,
} from 'lucide-react';
import CompetencyMap from '../components/CompetencyMap.jsx';
import TestCard from '../components/TestCard.jsx';
import ScoreRing from '../components/ScoreRing.jsx';
import TopicBar from '../components/TopicBar.jsx';
import { ErrorPanel, LoadingPanel } from '../components/StatePanel.jsx';
import FaqList from '../components/FaqList.jsx';
import useTest from '../hooks/useTest.js';
import usePageTitle from '../hooks/usePageTitle.js';

const features = [
  {
    icon: Waypoints,
    title: 'Peta per topik',
    description:
      'Bukan hanya satu angka. Lihat topik yang sudah kuat dan yang masih perlu dilatih dalam satu tampilan.',
    tile: 'bg-primary-soft text-primary',
  },
  {
    icon: Route,
    title: 'Langkah belajar jelas',
    description:
      'Setiap topik yang perlu latihan disertai saran langkah yang bisa langsung kamu kerjakan.',
    tile: 'bg-violet-soft text-violet',
  },
  {
    icon: History,
    title: 'Riwayat di perangkatmu',
    description:
      'Setiap pengerjaan tersimpan agar kamu bisa membandingkan kemajuan, tanpa perlu membuat akun.',
    tile: 'bg-sun-soft text-[#8a5f00]',
  },
];

const steps = [
  {
    number: '01',
    title: 'Pilih mata pelajaran',
    description: 'Mulai dari tes yang paling ingin kamu petakan. Setiap tes berisi 8 soal.',
  },
  {
    number: '02',
    title: 'Kerjakan tanpa tekanan',
    description:
      'Tidak ada timer. Kamu bisa melewati soal, kembali, dan mengubah jawaban sebelum selesai.',
  },
  {
    number: '03',
    title: 'Baca peta hasilmu',
    description:
      'Dapatkan skor, rincian per topik, pembahasan soal, dan saran langkah belajar berikutnya.',
  },
];

const sampleTopics = [
  {
    id: 'bilangan',
    name: 'Bilangan & Aljabar',
    correct: 3,
    total: 3,
    percent: 100,
    status: 'Sudah kuat',
    tone: 'success',
  },
  {
    id: 'geometri',
    name: 'Geometri & Pengukuran',
    correct: 2,
    total: 3,
    percent: 67,
    status: 'Sedang berkembang',
    tone: 'accent',
  },
  {
    id: 'data',
    name: 'Data & Peluang',
    correct: 1,
    total: 2,
    percent: 50,
    status: 'Perlu latihan',
    tone: 'violet',
  },
];

function SectionHeading({ children, description, action }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h2 className="display text-[2rem] text-ink sm:text-[2.6rem]">{children}</h2>
        {description && (
          <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-ink-soft">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export default function Home() {
  usePageTitle('Peta kemampuan belajar');
  const { tests, loading, error, reload } = useTest();

  return (
    <>
      <section className="relative overflow-hidden bg-[#edf1ff]">
        <div
          aria-hidden="true"
          className="dot-grid absolute -bottom-10 -left-10 h-64 w-64 opacity-50 [mask-image:linear-gradient(to_top_right,black,transparent)]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[32px] border-white/60"
        />

        <div className="shell relative grid gap-12 py-12 sm:py-16 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:gap-12 lg:py-20">
          <div className="animate-rise max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-3.5 py-1.5 text-xs font-bold text-primary shadow-sm">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Tes diagnostik · Kurikulum Merdeka
            </span>

            <h1 className="display mt-5 text-[2.45rem] text-ink sm:text-[3.3rem] lg:text-[3.9rem]">
              Setiap jawabanmu menggambar peta belajar.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
              Kerjakan tes diagnostik singkat untuk melihat topik yang sudah kamu kuasai dan
              yang perlu dilatih. Hasilnya langsung jadi gambaran langkah berikutnya.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/tes" className="btn btn-primary px-6">
                Mulai tes sekarang
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href="#cara-kerja" className="btn btn-secondary px-6">
                Lihat cara kerjanya
              </a>
            </div>

            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5 text-xs font-semibold text-ink-soft">
              {['8 soal per mapel', 'Tanpa batas waktu', 'Tanpa perlu akun'].map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-mint" aria-hidden="true" strokeWidth={3} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-pop delay-2 mx-auto w-full max-w-[430px] lg:max-w-none">
            <CompetencyMap />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="shell">
          <SectionHeading
            description="Tes diagnostik membantu kamu melihat pola kemampuan, bukan sekadar menilai benar atau salah."
          >
            Bukan sekadar skor akhir
          </SectionHeading>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="card p-6">
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl ${feature.tile}`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="display-tight mt-5 text-xl text-ink">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="cara-kerja"
        className="scroll-mt-24 border-y border-line bg-white py-16 sm:py-20"
      >
        <div className="shell">
          <SectionHeading
            description="Tiga langkah sederhana, dari soal pertama sampai rencana belajar."
            action={
              <Link to="/tes" className="text-link shrink-0 text-sm">
                Lihat daftar tes
              </Link>
            }
          >
            Cara kerjanya
          </SectionHeading>

          <div className="mt-10 grid gap-9 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.number}>
                <div className="flex items-center gap-3">
                  <span
                    className={`display grid h-12 w-12 shrink-0 place-items-center rounded-full text-lg ${
                      index === 0
                        ? 'bg-primary text-white'
                        : index === 1
                          ? 'bg-violet text-white'
                          : 'bg-sun text-ink'
                    }`}
                  >
                    {step.number}
                  </span>
                  {index < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="-mr-9 hidden h-0 flex-1 border-t-2 border-dashed border-line-strong md:block"
                    />
                  )}
                </div>
                <h3 className="display-tight mt-5 text-xl text-ink">{step.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="daftar-tes" className="scroll-mt-24 py-16 sm:py-20">
        <div className="shell">
          <SectionHeading
            description="Pilih satu mata pelajaran untuk memulai. Semua tes bisa dikerjakan tanpa batas waktu."
            action={
              <Link to="/tes" className="text-link shrink-0 text-sm">
                Semua tes
              </Link>
            }
          >
            Pilih titik awalmu
          </SectionHeading>

          <div className="mt-9">
            {loading && <LoadingPanel label="Memuat daftar tes…" />}
            {!loading && error && (
              <ErrorPanel message={error} onRetry={reload} />
            )}
            {!loading && !error && (
              <div className="grid gap-4 sm:grid-cols-2">
                {tests.map((test) => (
                  <TestCard key={test.id} test={test} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="border-y border-[#f2e4b8] bg-sun-soft/55 py-16 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-xs font-bold text-[#8a5f00]">
              <Compass className="h-3.5 w-3.5" aria-hidden="true" />
              Setelah tes selesai
            </span>
            <h2 className="display mt-4 text-[2rem] text-ink sm:text-[2.6rem]">
              Hasil yang menunjukkan arah, bukan sekadar angka.
            </h2>
            <p className="mt-4 max-w-lg text-[0.98rem] leading-relaxed text-ink-soft">
              Skor membantu melihat posisi secara keseluruhan. Rincian topik dan pembahasan
              membantu kamu tahu apa yang harus dilakukan selanjutnya.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                'Rincian benar per topik, bukan hanya skor total.',
                'Saran langkah untuk topik yang perlu dilatih.',
                'Pembahasan setiap soal untuk memeriksa cara berpikirmu.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm font-medium text-ink">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-mint"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <Link to="/tes" className="btn btn-primary mt-7 px-6">
              Coba satu tes
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="card relative p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.72rem] font-semibold text-ink-soft">Contoh lembar hasil</p>
                  <h3 className="display-tight mt-1 text-lg text-ink">
                    Matematika &amp; Penalaran Numerasi
                  </h3>
                </div>
                <span className="rounded-full bg-sun-soft px-2.5 py-1 text-[0.66rem] font-bold text-[#8a5f00]">
                  Ilustrasi
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-5 rounded-2xl bg-paper p-4">
                <ScoreRing value={75} size={112} />
                <div>
                  <p className="display-tight text-lg text-ink">Cukup kuat</p>
                  <p className="mt-1 text-sm text-ink-soft">6 dari 8 soal benar</p>
                  <p className="mt-2 max-w-[15rem] text-xs leading-relaxed text-ink-soft">
                    Sebagian besar konsep sudah dikuasai. Rapikan topik yang masih goyah.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {sampleTopics.map((topic) => (
                  <TopicBar key={topic.id} topic={topic} />
                ))}
              </div>

              <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-violet-soft p-3.5">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-violet" aria-hidden="true" />
                <p className="text-xs leading-relaxed text-ink">
                  <span className="font-bold">Fokus berikutnya: Data &amp; Peluang.</span>{' '}
                  Latih membaca tabel dan hitung rata-rata dari data sehari-hari.
                </p>
              </div>

              <p className="mt-4 border-t border-line pt-3 text-[0.7rem] text-ink-soft">
                Contoh tampilan. Hasil sebenarnya dihitung dari jawabanmu sendiri.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 py-16 sm:py-20">
        <div className="shell grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="display text-[2rem] text-ink sm:text-[2.6rem]">Pertanyaan umum</h2>
            <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-ink-soft">
              Hal yang sering ditanyakan sebelum mengerjakan tes diagnostik.
            </p>
            <Link to="/tes" className="text-link mt-5 inline-block text-sm">
              Mulai dari tes pertama
            </Link>
          </div>
          <FaqList />
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[28px] bg-ink px-6 py-10 text-white sm:px-10 sm:py-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.14]"
              style={{
                backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-16 -right-10 h-52 w-52 rounded-full border-[26px] border-white/5"
            />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-lg">
                <h2 className="display text-[2rem] text-white sm:text-[2.5rem]">
                  Siap melihat peta belajarmu?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/65 sm:text-base">
                  Mulai dari satu mata pelajaran. Delapan soal, satu gambaran yang lebih jelas.
                </p>
              </div>
              <Link
                to="/tes"
                className="btn shrink-0 bg-sun px-7 text-ink hover:bg-[#ffd35f]"
              >
                Mulai tes
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}