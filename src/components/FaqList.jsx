import { ChevronDown } from 'lucide-react';

export const faqs = [
  {
    question: 'Apakah saya perlu membuat akun?',
    answer:
      'Tidak. Kamu bisa langsung mengerjakan tes. Riwayat hasil disimpan di browser perangkat ini, jadi hasil tidak muncul di perangkat lain.',
  },
  {
    question: 'Berapa lama waktu mengerjakan tes?',
    answer:
      'Tidak ada batas waktu. Setiap tes berisi 8 soal dan kamu bisa mengubah jawaban sebelum menekan tombol selesai.',
  },
  {
    question: 'Bagaimana hasil tes dihitung?',
    answer:
      'Setiap jawaban benar menambah satu poin. Skor akhir adalah persentase jawaban benar, lalu dirangkum per topik agar kamu tahu bagian mana yang sudah kuat dan mana yang perlu latihan.',
  },
  {
    question: 'Apakah hasil ini masuk ke nilai sekolah?',
    answer:
      'Bukan. Diagnostik adalah alat bantu belajar mandiri, bukan penilaian resmi sekolah. Gunakan hasilnya untuk menentukan langkah belajar berikutnya.',
  },
  {
    question: 'Bisakah saya mengulang tes?',
    answer:
      'Bisa. Setiap pengerjaan disimpan sebagai catatan terpisah di dashboard, sehingga kamu dapat membandingkan hasil sebelum dan sesudah berlatih.',
  },
  {
    question: 'Apakah jawaban saya tersimpan saat menutup halaman?',
    answer:
      'Ya. Jawaban yang sudah dipilih disimpan sebagai draf di browser. Saat kembali ke tes yang sama, kamu bisa melanjutkan dari soal terakhir.',
  },
];

export default function FaqList({ items = faqs }) {
  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-white">
      {items.map((item, index) => (
        <details key={item.question} className="group" open={index === 0}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-2xl px-5 py-5 text-left transition-colors hover:bg-paper/70 sm:px-6 [&::-webkit-details-marker]:hidden">
            <span className="font-display text-[1.02rem] font-bold leading-snug text-ink">
              {item.question}
            </span>
            <ChevronDown
              className="mt-0.5 h-5 w-5 shrink-0 text-ink-soft transition-transform duration-200 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed text-ink-soft sm:px-6 sm:pr-12">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}