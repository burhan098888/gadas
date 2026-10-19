/**
 * Bank soal Diagnostic Test.
 *
 * Setiap soal menyimpan kunci jawaban dan pembahasan di server. Kunci ini
 * tidak pernah dikirim ke browser sebelum peserta menyelesaikan tes.
 */

export const tests = [
  {
    id: 'matematika-numerasi',
    title: 'Matematika & Penalaran Numerasi',
    subject: 'Matematika',
    level: 'SMP',
    curriculum: 'Kurikulum Merdeka · Fase D',
    accent: 'indigo',
    summary:
      'Petakan dasar bilangan, aljabar, geometri, dan cara kamu membaca data sebelum lanjut ke materi yang lebih jauh.',
    topics: [
      {
        id: 'bilangan-aljabar',
        name: 'Bilangan & Aljabar',
        description: 'Operasi pecahan, persamaan linear, dan pola bilangan.',
        practice:
          'Ulangi operasi pecahan dan langkah menyelesaikan persamaan linear, lalu kerjakan lima soal cerita.',
      },
      {
        id: 'geometri-pengukuran',
        name: 'Geometri & Pengukuran',
        description: 'Keliling, luas, dan hubungan sisi pada bangun datar.',
        practice:
          'Gambar ulang bangun datar yang kamu hitung dan tulis rumusnya sebelum memasukkan angka.',
      },
      {
        id: 'data-peluang',
        name: 'Data & Peluang',
        description: 'Rata-rata, median, dan peluang kejadian sederhana.',
        practice:
          'Latih membaca tabel dan hitung rata-rata dari data sehari-hari, lalu lanjut ke soal peluang dadu.',
      },
    ],
    questions: [
      {
        id: 'mat-01',
        topicId: 'bilangan-aljabar',
        prompt: 'Hasil dari 2/3 + 1/4 adalah ...',
        options: [
          { id: 'a', text: '3/7' },
          { id: 'b', text: '11/12' },
          { id: 'c', text: '3/12' },
          { id: 'd', text: '5/7' },
        ],
        answer: 'b',
        explanation:
          'Samakan penyebut menjadi 12: 2/3 = 8/12 dan 1/4 = 3/12. Jumlahnya 11/12.',
      },
      {
        id: 'mat-02',
        topicId: 'bilangan-aljabar',
        prompt: 'Jika 3x − 7 = 14, nilai x adalah ...',
        options: [
          { id: 'a', text: '5' },
          { id: 'b', text: '7' },
          { id: 'c', text: '14' },
          { id: 'd', text: '21' },
        ],
        answer: 'b',
        explanation:
          'Tambahkan 7 ke kedua ruas: 3x = 21. Bagi kedua ruas dengan 3 sehingga x = 7.',
      },
      {
        id: 'mat-03',
        topicId: 'bilangan-aljabar',
        prompt: 'Perhatikan pola bilangan 2, 5, 10, 17, 26, ... Bilangan berikutnya adalah ...',
        options: [
          { id: 'a', text: '33' },
          { id: 'b', text: '35' },
          { id: 'c', text: '37' },
          { id: 'd', text: '39' },
        ],
        answer: 'c',
        explanation:
          'Selisih antarsuku bertambah dua: +3, +5, +7, +9. Selisih berikutnya +11, sehingga 26 + 11 = 37.',
      },
      {
        id: 'mat-04',
        topicId: 'geometri-pengukuran',
        prompt: 'Sebuah persegi panjang memiliki panjang 12 cm dan lebar 8 cm. Kelilingnya adalah ...',
        options: [
          { id: 'a', text: '20 cm' },
          { id: 'b', text: '40 cm' },
          { id: 'c', text: '48 cm' },
          { id: 'd', text: '96 cm' },
        ],
        answer: 'b',
        explanation:
          'Keliling persegi panjang = 2 × (panjang + lebar) = 2 × (12 + 8) = 40 cm.',
      },
      {
        id: 'mat-05',
        topicId: 'geometri-pengukuran',
        prompt:
          'Sebuah segitiga siku-siku memiliki sisi tegak 6 cm dan 8 cm. Panjang sisi miringnya adalah ...',
        options: [
          { id: 'a', text: '9 cm' },
          { id: 'b', text: '10 cm' },
          { id: 'c', text: '12 cm' },
          { id: 'd', text: '14 cm' },
        ],
        answer: 'b',
        explanation:
          'Gunakan teorema Pythagoras: √(6² + 8²) = √(36 + 64) = √100 = 10 cm.',
      },
      {
        id: 'mat-06',
        topicId: 'geometri-pengukuran',
        prompt: 'Luas lingkaran dengan diameter 14 cm adalah ... (gunakan π = 22/7)',
        options: [
          { id: 'a', text: '44 cm²' },
          { id: 'b', text: '154 cm²' },
          { id: 'c', text: '308 cm²' },
          { id: 'd', text: '616 cm²' },
        ],
        answer: 'b',
        explanation:
          'Diameter 14 cm berarti jari-jari 7 cm. Luas = π × r² = 22/7 × 49 = 154 cm².',
      },
      {
        id: 'mat-07',
        topicId: 'data-peluang',
        prompt: 'Rata-rata dari data 6, 7, 8, 9, 10 adalah ...',
        options: [
          { id: 'a', text: '7' },
          { id: 'b', text: '7,5' },
          { id: 'c', text: '8' },
          { id: 'd', text: '8,5' },
        ],
        answer: 'c',
        explanation:
          'Jumlah data = 40 dan banyak data = 5. Rata-rata = 40 ÷ 5 = 8.',
      },
      {
        id: 'mat-08',
        topicId: 'data-peluang',
        prompt: 'Sebuah dadu dilempar satu kali. Peluang muncul mata dadu genap adalah ...',
        options: [
          { id: 'a', text: '1/6' },
          { id: 'b', text: '1/3' },
          { id: 'c', text: '1/2' },
          { id: 'd', text: '2/3' },
        ],
        answer: 'c',
        explanation:
          'Mata dadu genap ada tiga: 2, 4, dan 6. Peluangnya 3/6 = 1/2.',
      },
    ],
  },
  {
    id: 'bahasa-indonesia',
    title: 'Bahasa Indonesia & Literasi Membaca',
    subject: 'Bahasa Indonesia',
    level: 'SMP',
    curriculum: 'Kurikulum Merdeka · Fase D',
    accent: 'violet',
    summary:
      'Ukur kemampuan menemukan informasi, menafsirkan teks, dan menerapkan kaidah bahasa dalam tulisanmu.',
    topics: [
      {
        id: 'menemukan-informasi',
        name: 'Menemukan Informasi',
        description: 'Ide pokok, informasi rinci, dan makna kata dalam teks.',
        practice:
          'Biasakan menandai kalimat utama setiap paragraf sebelum menjawab pertanyaan isi teks.',
      },
      {
        id: 'interpretasi-teks',
        name: 'Interpretasi & Integrasi',
        description: 'Menyimpulkan dan menghubungkan informasi antarbagian teks.',
        practice:
          'Latih membuat simpulan satu kalimat dari teks pendek tanpa menambahkan informasi baru.',
      },
      {
        id: 'kaidah-bahasa',
        name: 'Kaidah Bahasa',
        description: 'Ejaan, kata baku, dan kalimat efektif.',
        practice:
          'Periksa ulang tulisanmu dengan daftar kata baku dan hilangkan kata yang berulang.',
      },
    ],
    questions: [
      {
        id: 'bin-01',
        topicId: 'menemukan-informasi',
        passage:
          'Sejak 2019, warga RW 07 mengelola bank sampah. Mereka memilah sampah rumah tangga, mengolah sampah organik menjadi kompos, dan menjual plastik daur ulang. Hasil penjualan dicatat sebagai tabungan warga.',
        prompt: 'Ide pokok kutipan tersebut adalah ...',
        options: [
          { id: 'a', text: 'Jenis sampah yang dihasilkan rumah tangga' },
          { id: 'b', text: 'Pengelolaan bank sampah yang memberi manfaat bagi warga' },
          { id: 'c', text: 'Cara membuat kompos dari sampah organik' },
          { id: 'd', text: 'Harga plastik daur ulang di pasaran' },
        ],
        answer: 'b',
        explanation:
          'Seluruh kalimat membahas kegiatan bank sampah yang dikelola warga, mulai dari memilah hingga manfaat tabungan. Pilihan lain hanya informasi rinci.',
      },
      {
        id: 'bin-02',
        topicId: 'menemukan-informasi',
        passage:
          'Sejak 2019, warga RW 07 mengelola bank sampah. Mereka memilah sampah rumah tangga, mengolah sampah organik menjadi kompos, dan menjual plastik daur ulang. Hasil penjualan dicatat sebagai tabungan warga.',
        prompt: 'Menurut kutipan, sampah plastik ...',
        options: [
          { id: 'a', text: 'diolah menjadi kompos' },
          { id: 'b', text: 'dibuang ke tempat pembuangan akhir' },
          { id: 'c', text: 'dijual untuk didaur ulang' },
          { id: 'd', text: 'disimpan sebagai tabungan warga' },
        ],
        answer: 'c',
        explanation:
          'Teks menyebut "menjual plastik daur ulang". Sampah organik yang diolah menjadi kompos, sedangkan yang ditabung adalah hasil penjualannya.',
      },
      {
        id: 'bin-03',
        topicId: 'interpretasi-teks',
        passage:
          'Sejak 2019, warga RW 07 mengelola bank sampah. Mereka memilah sampah rumah tangga, mengolah sampah organik menjadi kompos, dan menjual plastik daur ulang. Hasil penjualan dicatat sebagai tabungan warga.',
        prompt: 'Kalimat "Hasil penjualan dicatat sebagai tabungan warga" menunjukkan bahwa ...',
        options: [
          { id: 'a', text: 'bank sampah memberikan keuntungan ekonomi bagi warga' },
          { id: 'b', text: 'warga wajib menyetor uang setiap bulan' },
          { id: 'c', text: 'pemerintah membiayai seluruh kegiatan bank sampah' },
          { id: 'd', text: 'sampah organik lebih mahal daripada plastik' },
        ],
        answer: 'a',
        explanation:
          'Hasil penjualan yang menjadi tabungan menunjukkan manfaat ekonomi. Tidak ada informasi tentang kewajiban setor atau bantuan pemerintah.',
      },
      {
        id: 'bin-04',
        topicId: 'interpretasi-teks',
        passage:
          'Program pojok baca berhasil meningkatkan minat baca siswa. Namun, kunjungan menurun pada jam istirahat karena ruangannya berdekatan dengan kantin yang ramai.',
        prompt: 'Simpulan yang paling tepat adalah ...',
        options: [
          { id: 'a', text: 'Program pojok baca sebaiknya dihentikan' },
          { id: 'b', text: 'Siswa tidak menyukai kegiatan membaca' },
          { id: 'c', text: 'Kenyamanan tempat perlu diperhatikan agar program tetap berjalan' },
          { id: 'd', text: 'Kantin harus ditutup selama jam istirahat' },
        ],
        answer: 'c',
        explanation:
          'Masalahnya adalah suasana tempat, bukan minat baca. Simpulan yang wajar adalah memperbaiki kenyamanan tanpa menghentikan program.',
      },
      {
        id: 'bin-05',
        topicId: 'menemukan-informasi',
        passage:
          'Sejak 2019, warga RW 07 mengelola bank sampah. Mereka memilah sampah rumah tangga, mengolah sampah organik menjadi kompos, dan menjual plastik daur ulang.',
        prompt: 'Makna kata "memilah" pada kutipan di atas paling dekat dengan ...',
        options: [
          { id: 'a', text: 'membuang' },
          { id: 'b', text: 'memisahkan' },
          { id: 'c', text: 'mengumpulkan' },
          { id: 'd', text: 'membakar' },
        ],
        answer: 'b',
        explanation:
          'Memilah berarti memisahkan menurut jenisnya. Dalam kutipan, warga memisahkan sampah sesuai jenis sebelum diolah.',
      },
      {
        id: 'bin-06',
        topicId: 'kaidah-bahasa',
        prompt: 'Kalimat yang menggunakan ejaan dan tanda baca dengan tepat adalah ...',
        options: [
          { id: 'a', text: 'Siswa membawa buku, pensil dan penghapus.' },
          { id: 'b', text: 'Siswa membawa buku, pensil, dan penghapus.' },
          { id: 'c', text: 'Siswa membawa buku pensil, dan penghapus.' },
          { id: 'd', text: 'Siswa membawa buku; pensil; dan penghapus.' },
        ],
        answer: 'b',
        explanation:
          'Tanda koma dipakai di antara unsur pemerincian, termasuk sebelum kata "dan" pada perincian lebih dari dua unsur.',
      },
      {
        id: 'bin-07',
        topicId: 'kaidah-bahasa',
        prompt: 'Penulisan kata baku yang tepat terdapat pada ...',
        options: [
          { id: 'a', text: 'aktifitas' },
          { id: 'b', text: 'analisa' },
          { id: 'c', text: 'aktivitas' },
          { id: 'd', text: 'praktek' },
        ],
        answer: 'c',
        explanation:
          'Bentuk baku menurut KBBI adalah "aktivitas". Bentuk baku lainnya: analisis dan praktik.',
      },
      {
        id: 'bin-08',
        topicId: 'kaidah-bahasa',
        prompt: 'Kalimat efektif yang paling tepat adalah ...',
        options: [
          { id: 'a', text: 'Para siswa-siswa berkumpul di dalam aula sekolah.' },
          { id: 'b', text: 'Para siswa berkumpul di aula sekolah.' },
          { id: 'c', text: 'Semua para siswa berkumpul bersama-sama di aula.' },
          { id: 'd', text: 'Para siswa berkumpul di aula pada waktu pagi hari.' },
        ],
        answer: 'b',
        explanation:
          'Kalimat efektif menghindari kata mubazir. "Para" sudah bermakna jamak, sedangkan "di dalam aula" dan "pada waktu pagi hari" dapat dipadatkan.',
      },
    ],
  },
  {
    id: 'ipa-literasi-sains',
    title: 'IPA & Literasi Sains',
    subject: 'IPA',
    level: 'SMP',
    curriculum: 'Kurikulum Merdeka · Fase D',
    accent: 'teal',
    summary:
      'Cek pemahaman konsep kehidupan, zat, dan energi lewat soal yang dekat dengan pengalaman sehari-hari.',
    topics: [
      {
        id: 'makhluk-hidup',
        name: 'Makhluk Hidup & Lingkungan',
        description: 'Sel, fotosintesis, dan hubungan antarmakhluk hidup.',
        practice:
          'Buat peta konsep sederhana yang menghubungkan sel, fotosintesis, dan peran tumbuhan di ekosistem.',
      },
      {
        id: 'zat-perubahan',
        name: 'Zat & Perubahannya',
        description: 'Perubahan fisika, perubahan kimia, dan sifat larutan.',
        practice:
          'Kelompokkan lima perubahan yang kamu temui di dapur menjadi perubahan fisika atau kimia.',
      },
      {
        id: 'energi-gerak',
        name: 'Energi & Gerak',
        description: 'Bentuk energi, perubahannya, dan gerak benda.',
        practice:
          'Amati satu benda yang bergerak di sekitarmu dan tuliskan perubahan energinya dari awal hingga berhenti.',
      },
    ],
    questions: [
      {
        id: 'ipa-01',
        topicId: 'makhluk-hidup',
        prompt: 'Organel sel yang berperan sebagai tempat respirasi untuk menghasilkan energi adalah ...',
        options: [
          { id: 'a', text: 'ribosom' },
          { id: 'b', text: 'mitokondria' },
          { id: 'c', text: 'nukleus' },
          { id: 'd', text: 'vakuola' },
        ],
        answer: 'b',
        explanation:
          'Mitokondria adalah tempat berlangsungnya respirasi sel yang menghasilkan energi. Ribosom menyusun protein, nukleus mengatur sel, dan vakuola menyimpan cairan.',
      },
      {
        id: 'ipa-02',
        topicId: 'makhluk-hidup',
        prompt:
          'Kupu-kupu memperoleh nektar dari bunga, sementara bunga terbantu proses penyerbukannya. Hubungan ini termasuk simbiosis ...',
        options: [
          { id: 'a', text: 'parasitisme' },
          { id: 'b', text: 'komensalisme' },
          { id: 'c', text: 'mutualisme' },
          { id: 'd', text: 'amensalisme' },
        ],
        answer: 'c',
        explanation:
          'Kedua pihak memperoleh keuntungan: kupu-kupu mendapat makanan, bunga terbantu penyerbukan. Hubungan ini disebut mutualisme.',
      },
      {
        id: 'ipa-03',
        topicId: 'makhluk-hidup',
        prompt: 'Bahan yang diperlukan tumbuhan untuk fotosintesis adalah ...',
        options: [
          { id: 'a', text: 'oksigen dan glukosa' },
          { id: 'b', text: 'karbon dioksida dan air' },
          { id: 'c', text: 'nitrogen dan mineral' },
          { id: 'd', text: 'oksigen dan karbon dioksida' },
        ],
        answer: 'b',
        explanation:
          'Fotosintesis menggunakan karbon dioksida dan air dengan bantuan cahaya, lalu menghasilkan glukosa dan oksigen.',
      },
      {
        id: 'ipa-04',
        topicId: 'zat-perubahan',
        prompt: 'Peristiwa berikut yang merupakan perubahan kimia adalah ...',
        options: [
          { id: 'a', text: 'es mencair karena suhu ruang' },
          { id: 'b', text: 'gula larut dalam air' },
          { id: 'c', text: 'kertas terbakar' },
          { id: 'd', text: 'air menguap saat dipanaskan' },
        ],
        answer: 'c',
        explanation:
          'Pembakaran kertas menghasilkan zat baru (abu dan gas), sehingga termasuk perubahan kimia. Peristiwa lain hanya perubahan wujud atau pelarutan.',
      },
      {
        id: 'ipa-05',
        topicId: 'zat-perubahan',
        prompt: 'Contoh campuran homogen adalah ...',
        options: [
          { id: 'a', text: 'air dan pasir' },
          { id: 'b', text: 'air dan minyak' },
          { id: 'c', text: 'larutan gula' },
          { id: 'd', text: 'air dan tepung' },
        ],
        answer: 'c',
        explanation:
          'Larutan gula tercampur merata dan tidak dapat dibedakan lagi bagiannya, sehingga merupakan campuran homogen. Campuran lain masih menunjukkan bagian yang berbeda.',
      },
      {
        id: 'ipa-06',
        topicId: 'zat-perubahan',
        prompt: 'Sifat yang menunjukkan suatu larutan bersifat asam adalah ...',
        options: [
          { id: 'a', text: 'mengubah kertas lakmus biru menjadi merah' },
          { id: 'b', text: 'mengubah kertas lakmus merah menjadi biru' },
          { id: 'c', text: 'memiliki pH lebih dari 7' },
          { id: 'd', text: 'terasa licin di kulit' },
        ],
        answer: 'a',
        explanation:
          'Larutan asam memiliki pH kurang dari 7 dan mengubah lakmus biru menjadi merah. Lakmus merah menjadi biru adalah ciri basa.',
      },
      {
        id: 'ipa-07',
        topicId: 'energi-gerak',
        prompt: 'Satuan energi dalam Sistem Internasional (SI) adalah ...',
        options: [
          { id: 'a', text: 'newton' },
          { id: 'b', text: 'joule' },
          { id: 'c', text: 'watt' },
          { id: 'd', text: 'pascal' },
        ],
        answer: 'b',
        explanation:
          'Energi diukur dalam joule. Newton adalah satuan gaya, watt adalah satuan daya, dan pascal adalah satuan tekanan.',
      },
      {
        id: 'ipa-08',
        topicId: 'energi-gerak',
        prompt:
          'Sebuah kelapa jatuh dari pohon. Perubahan energi yang terjadi saat kelapa bergerak ke bawah adalah ...',
        options: [
          { id: 'a', text: 'energi kinetik menjadi energi potensial' },
          { id: 'b', text: 'energi potensial menjadi energi kinetik' },
          { id: 'c', text: 'energi kimia menjadi energi panas' },
          { id: 'd', text: 'energi listrik menjadi energi bunyi' },
        ],
        answer: 'b',
        explanation:
          'Saat posisi kelapa makin rendah, energi potensialnya berkurang dan berubah menjadi energi kinetik karena kecepatannya bertambah.',
      },
    ],
  },
  {
    id: 'tps-penalaran',
    title: 'TPS & Penalaran Umum',
    subject: 'TPS',
    level: 'SMA',
    curriculum: 'Persiapan SNBT',
    accent: 'amber',
    summary:
      'Latih cara menarik kesimpulan, membaca pola angka, dan menyelesaikan masalah dengan langkah yang runtut.',
    topics: [
      {
        id: 'penalaran-deduktif',
        name: 'Penalaran Deduktif',
        description: 'Menarik kesimpulan yang sah dari pernyataan yang diberikan.',
        practice:
          'Tulis premis dan kesimpulan dalam bentuk singkat sebelum memilih jawaban.',
      },
      {
        id: 'pola-kuantitatif',
        name: 'Pola & Kuantitatif',
        description: 'Pola bilangan, perbandingan, dan perhitungan persentase.',
        practice:
          'Cari selisih atau rasio antarsuku terlebih dahulu, lalu periksa apakah polanya konsisten.',
      },
      {
        id: 'pemecahan-masalah',
        name: 'Pemecahan Masalah',
        description: 'Soal cerita dengan beberapa langkah perhitungan.',
        practice:
          'Tuliskan apa yang diketahui dan ditanya, lalu selesaikan satu langkah dalam satu baris.',
      },
    ],
    questions: [
      {
        id: 'tps-01',
        topicId: 'penalaran-deduktif',
        passage: 'Semua siswa kelas X wajib mengikuti kegiatan pramuka. Andi adalah siswa kelas X.',
        prompt: 'Kesimpulan yang tepat adalah ...',
        options: [
          { id: 'a', text: 'Andi mungkin mengikuti pramuka' },
          { id: 'b', text: 'Andi wajib mengikuti kegiatan pramuka' },
          { id: 'c', text: 'Semua peserta pramuka adalah siswa kelas X' },
          { id: 'd', text: 'Andi tidak mengikuti kegiatan lain' },
        ],
        answer: 'b',
        explanation:
          'Karena semua siswa kelas X wajib pramuka dan Andi siswa kelas X, Andi pasti wajib mengikuti pramuka.',
      },
      {
        id: 'tps-02',
        topicId: 'penalaran-deduktif',
        passage: 'Jika hujan turun, jalan menjadi basah. Saat ini jalan tidak basah.',
        prompt: 'Kesimpulan yang sah adalah ...',
        options: [
          { id: 'a', text: 'Hujan tidak turun' },
          { id: 'b', text: 'Hujan baru saja turun' },
          { id: 'c', text: 'Jalan akan segera kering' },
          { id: 'd', text: 'Tidak dapat disimpulkan apa pun' },
        ],
        answer: 'a',
        explanation:
          'Ini adalah modus tollens. Jika hujan menyebabkan jalan basah, dan jalan tidak basah, maka hujan tidak turun.',
      },
      {
        id: 'tps-03',
        topicId: 'penalaran-deduktif',
        passage: 'Semua guru di sekolah itu berpendidikan sarjana. Bu Rina mengajar di sekolah itu.',
        prompt: 'Kesimpulan yang paling tepat adalah ...',
        options: [
          { id: 'a', text: 'Bu Rina berpendidikan sarjana' },
          { id: 'b', text: 'Bu Rina adalah guru terbaik' },
          { id: 'c', text: 'Semua sarjana mengajar di sekolah itu' },
          { id: 'd', text: 'Bu Rina akan menjadi kepala sekolah' },
        ],
        answer: 'a',
        explanation:
          'Bu Rina mengajar di sekolah itu, dan semua guru di sana sarjana, sehingga Bu Rina berpendidikan sarjana.',
      },
      {
        id: 'tps-04',
        topicId: 'pola-kuantitatif',
        prompt: 'Perhatikan pola 3, 6, 11, 18, 27, ... Bilangan berikutnya adalah ...',
        options: [
          { id: 'a', text: '36' },
          { id: 'b', text: '37' },
          { id: 'c', text: '38' },
          { id: 'd', text: '39' },
        ],
        answer: 'c',
        explanation:
          'Selisihnya +3, +5, +7, +9. Selisih berikutnya +11, sehingga 27 + 11 = 38.',
      },
      {
        id: 'tps-05',
        topicId: 'pola-kuantitatif',
        prompt:
          'Sebuah toko memberi diskon 20%. Harga yang harus dibayar setelah diskon adalah Rp240.000. Harga awal barang tersebut adalah ...',
        options: [
          { id: 'a', text: 'Rp260.000' },
          { id: 'b', text: 'Rp288.000' },
          { id: 'c', text: 'Rp300.000' },
          { id: 'd', text: 'Rp320.000' },
        ],
        answer: 'c',
        explanation:
          'Harga setelah diskon adalah 80% dari harga awal. Harga awal = 240.000 ÷ 0,8 = 300.000.',
      },
      {
        id: 'tps-06',
        topicId: 'pola-kuantitatif',
        prompt: 'Dua bilangan memiliki perbandingan 3 : 5. Jika jumlahnya 64, bilangan terkecil adalah ...',
        options: [
          { id: 'a', text: '16' },
          { id: 'b', text: '24' },
          { id: 'c', text: '32' },
          { id: 'd', text: '40' },
        ],
        answer: 'b',
        explanation:
          'Jumlah bagian = 3 + 5 = 8. Satu bagian bernilai 64 ÷ 8 = 8, sehingga bilangan terkecil = 3 × 8 = 24.',
      },
      {
        id: 'tps-07',
        topicId: 'pemecahan-masalah',
        prompt:
          'Rata-rata lima bilangan adalah 12. Setelah satu bilangan dibuang, rata-rata empat bilangan yang tersisa adalah 11. Bilangan yang dibuang adalah ...',
        options: [
          { id: 'a', text: '11' },
          { id: 'b', text: '14' },
          { id: 'c', text: '16' },
          { id: 'd', text: '18' },
        ],
        answer: 'c',
        explanation:
          'Jumlah lima bilangan = 5 × 12 = 60. Jumlah empat bilangan = 4 × 11 = 44. Bilangan yang dibuang = 60 − 44 = 16.',
      },
      {
        id: 'tps-08',
        topicId: 'pemecahan-masalah',
        prompt:
          'Sebuah pekerjaan selesai dalam 6 hari oleh 4 orang dengan kecepatan kerja sama. Jika dikerjakan 3 orang, pekerjaan itu akan selesai dalam ...',
        options: [
          { id: 'a', text: '4,5 hari' },
          { id: 'b', text: '7 hari' },
          { id: 'c', text: '8 hari' },
          { id: 'd', text: '9 hari' },
        ],
        answer: 'c',
        explanation:
          'Total pekerjaan = 4 × 6 = 24 orang-hari. Dengan 3 orang, waktu = 24 ÷ 3 = 8 hari.',
      },
    ],
  },
];

export function findTest(testId) {
  return tests.find((test) => test.id === testId);
}

export function getTestSummaries() {
  return tests.map((test) => ({
    id: test.id,
    title: test.title,
    subject: test.subject,
    level: test.level,
    curriculum: test.curriculum,
    accent: test.accent,
    summary: test.summary,
    questionCount: test.questions.length,
    topics: test.topics.map((topic) => topic.name),
  }));
}

export function getTestDetail(testId) {
  const test = findTest(testId);
  if (!test) return null;

  return {
    id: test.id,
    title: test.title,
    subject: test.subject,
    level: test.level,
    curriculum: test.curriculum,
    accent: test.accent,
    summary: test.summary,
    questionCount: test.questions.length,
    topics: test.topics.map((topic) => ({
      id: topic.id,
      name: topic.name,
      description: topic.description,
    })),
  };
}

export function getPublicQuestions(testId) {
  const test = findTest(testId);
  if (!test) return null;

  return {
    testId: test.id,
    title: test.title,
    questions: test.questions.map((question) => ({
      id: question.id,
      topicId: question.topicId,
      topicName: test.topics.find((topic) => topic.id === question.topicId)?.name ?? '',
      passage: question.passage ?? null,
      prompt: question.prompt,
      options: question.options.map((option) => ({ id: option.id, text: option.text })),
    })),
  };
}