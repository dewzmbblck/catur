export interface StrategyGroup {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  items: StrategyItem[];
}

export interface StrategyItem {
  title: string;
  content: string;
  example?: string;
}

export const STRATEGY_GROUPS: StrategyGroup[] = [
  {
    id: 'opening',
    title: 'Strategi Pembukaan (Opening)',
    icon: 'Flag',
    color: 'emerald',
    description:
      '20-an langkah pertama menentukan struktur permainan Anda. Ikuti prinsip-prinsip pembukaan berikut untuk mendapatkan posisi yang baik sejak awal.',
    items: [
      {
        title: 'Kontrol Pusat Papan',
        content:
          'Petak tengah (e4, d4, e5, d5) adalah area terpenting. Gerakkan pion ke e4 atau d4 di langkah pertama. Bidak di tengah mengontrol lebih banyak petak dan memberi ruang gerak untuk bidak lain.',
        example: '1. e4 e5 2. Kf3 — pion e4 mengontrol d5 dan f5, kuda f3 mengontrol tengah.',
      },
      {
        title: 'Kembangkan Bidak Kecil Dulu',
        content:
          'Keluaran kuda dan gajah sebelum ratu. Kuda dan gajah bernilai 3 — kembangkan mereka ke petak aktif di awal. Target: semua kuda dan gajah sudah keluar dalam 10 langkah pertama.',
        example: 'Urutan ideal: pion tengah → kuda → gajah → rokade → baru ratu.',
      },
      {
        title: 'Rokade Secepat Mungkin',
        content:
          'Lindungi raja dengan rokade dalam 7-10 langkah pertama. Rokade sisi raja (kingside) lebih cepat karena hanya butuh 2 petak kosong. Raja aman di sudut dengan perisai pion.',
      },
      {
        title: 'Jangan Keluarkan Ratu Terlalu Dini',
        content:
          'Ratu terlalu berharga untuk dikeluarkan di awal. Lawan bisa mengejar ratu dengan kuda atau gajah yang lebih murah, memaksa Anda mundur berkali-kali dan kehilangan tempo (waktu pengembangan).',
      },
      {
        title: 'Jangan Gerakkan Bidak yang Sama Dua Kali',
        content:
          'Setiap langkah berharga. Jika Anda menggerakkan kuda, lalu menggerakkan kuda yang sama lagi tanpa alasan kuat, Anda kehilangan kesempatan mengembangkan bidak lain. Satu langkah per bidak.',
      },
      {
        title: 'Hubungkan Benteng',
        content:
          'Setelah rokade dan mengembangkan bidak kecil, hubungkan dua benteng di baris pertama. Benteng yang saling melindungi memberikan kontrol di sepanjang baris dan kolom.',
      },
    ],
  },
  {
    id: 'middlegame',
    title: 'Strategi Tengah Permainan (Middlegame)',
    icon: 'Swords',
    color: 'amber',
    description:
      'Fase di mana sebagian besar aksi terjadi. Bidak sudah berkembang, sekarang waktunya merencanakan serangan, mengontrol petak penting, dan mencari keuntungan material atau posisional.',
    items: [
      {
        title: 'Identifikasi Kelemahan Lawan',
        content:
          'Cari pion yang lemah (backward, doubled, isolated), bidak yang tidak terlindungi, atau raja yang terbuka. Setiap kelemahan adalah target serangan. Fokus rencana Anda pada mengeksploitasi kelemahan tersebut.',
      },
      {
        title: 'Buat dan Manfaatkan Kolom Terbuka',
        content:
          'Kolom tanpa pain adalah jalan raya untuk benteng. Tempatkan benteng di kolom terbuka untuk mengontrol jalur penting. Jika kolom terbuka di sisi raja lawan, itu jalur serangan terbaik.',
      },
      {
        title: 'Outpost untuk Kuda',
        content:
          'Kuda di petak tengah yang dilindungi pion dan tidak bisa diusir oleh pion lawan adalah "outpost". Kuda di outpost mengontrol hingga 8 petak dan sangat sulit diusir.',
        example: 'Kuda di d4 yang dilindungi pion c3 dan e3 — kekuatan yang langgeng.',
      },
      {
        title: 'Serangan di Sisi yang Lemah',
        content:
          'Jika raja lawan rokade di satu sisi, kumpulkan kekuatan di sisi tersebut. Lebih banyak bidak menyerang = lebih besar peluang menembus pertahanan. Hitung jumlah penyerang vs pengawal.',
      },
      {
        title: 'Taktik: Fork, Pin, Skewer',
        content:
          'Fork: satu bidak menyerang dua target sekaligus. Pin: bidak lawan tidak bisa bergerak karena yang di belakangnya lebih berharga. Skewer: bidak berharga diserang, dan setelah bergerak, bidak di belakangnya tertangkap. Pelajari taktik ini!',
      },
      {
        title: 'Pertukaran Bidak yang Menguntungkan',
        content:
          'Tukar bidak jika Anda unggul material (menyederhanakan memperjelas kemenangan). Jangan tukar bidak yang aktif Anda. Tukar bidak lawan yang bertahan baik. Jika kalah material, hindari pertukaran.',
      },
    ],
  },
  {
    id: 'endgame',
    title: 'Strategi Akhir Permainan (Endgame)',
    icon: 'Crown',
    color: 'rose',
    description:
      'Saat sedikit bidak tersisa di papan, raja menjadi aktif dan setiap langkah pion sangat krusial. Akhir permainan membutuhkan ketelitian tinggi — satu kesalahan bisa berubah jadi kekalahan.',
    items: [
      {
        title: 'Aktifkan Raja',
        content:
          'Di akhir permainan, raja bukan lagi bidak yang harus bersembunyi. Raja harus bergerak ke tengah papan dan menjadi kekuatan ofensif. Raja di tengah = kontrol petak + mendukung pion.',
      },
      {
        title: 'Promosi Pion adalah Kunci',
        content:
          'Pion yang bebas (passed pawn) adalah kunci kemenangan. Dorong pion menuju promosi dengan dukungan raja. Lawan harus mengorbankan bidak untuk menghentikannya. "Passed pawn must be pushed!"',
        example: 'Raja + pion vs Raja: biasanya menang jika pion bisa dipromosikan dengan dukungan raja.',
      },
      {
        title: 'Aturan Kotak (Square Rule)',
        content:
          'Jika raja lawan tidak bisa menangkap pion yang berjalan menuju promosi, pion tersebut akan promosi dan menang. Bayangkan "kotak" dari pion ke petak promosi — jika raja lawan di luar kotak, pion aman.',
      },
      {
        title: 'Oposisi',
        content:
          'Dua raja berhadapan dengan satu petak kosong di antaranya = "oposisi". Pemain yang TIDAK giliran bergerak memiliki keuntungan karena lawan harus mundur. Oposisi adalah kunci banyak akhir permainan raja vs raja + pion.',
        example: 'Raja putih di e4, raja hitam di e6, giliran hitam — putih punya oposisi dan bisa mendominasi.',
      },
      {
        title: 'Cek Rumah Tepat',
        content:
          'Banyak akhir permainan tergantung pada "tempo" (siapa giliran). Terkadang Anda perlu kehilangan satu langkah (zugzwang) untuk memaksa lawan bergerak ke posisi yang buruk. Pelajari pola checkmate dasar: Ratu + Raja, Benteng + Raja, dua Gajah + Raja.',
      },
    ],
  },
];

export interface OpponentResponseTip {
  situation: string;
  threat: string;
  response: string[];
  tip: string;
}

export const OPPONENT_RESPONSE_TIPS: OpponentResponseTip[] = [
  {
    situation: 'Lawan mengembangkan bidak dengan cepat',
    threat: 'Lawan bisa lebih dulu menyerang dan menguasai tengah',
    response: [
      'Samakan tempo — kembangkan bidak Anda juga, jangan terjebak mempertahankan satu bidak',
      'Jangan panik dan gerakkan bidak yang sudah baik hanya untuk menghindari serangan kecil',
      'Tukar salah satu bidak aktif lawan untuk memperlambat development mereka',
    ],
    tip: 'Hitung jumlah bidak yang sudah berkembang. Jika lawan lebih banyak, fokus pada pengejaran, bukan pertahanan pasif.',
  },
  {
    situation: 'Lawan menyerang raja Anda',
    threat: 'Checkmate atau kehilangan material besar',
    response: [
      'Hitung jumlah penyerang vs pengawal — jika penyerang lebih banyak, tambahkan pertahanan',
      'Pertimbangkan untuk membalik serangan di sisi lain papan (counter-attack)',
      'Buka kolom untuk benteng Anda untuk masuk ke pertahanan',
      'Jika terdesak, pertukarkan bidak penyerang utama lawan',
    ],
    tip: 'Pertahanan terbaik adalah serangan balik. Jika lawan menyerang di sisi raja, Anda mungkin punya keuntungan di sisi menteri.',
  },
  {
    situation: 'Lawan men CAPTURE bidak Anda (Anda kalah material)',
    threat: 'Ketinggalan bidak dan kalah dalam akhir permainan',
    response: [
      'Cari kompensasi: posisi yang lebih baik, bidak lebih aktif, atau serangan terhadap raja',
      'Jangan terburu-buru men CAPTURE balik jika petak tersebut terlindungi — hitung dulu',
      'Cari taktik untuk men CAPTURE balik dengan nilai yang sama atau lebih',
      'Jika tidak ada kompensasi, mainkan posisi bertahan dan tunggu kesalahan lawan',
    ],
    tip: 'Selalu hitung pertukaran: jika Anda men CAPTURE, lawan men CAPTURE balik, dan seterusnya — siapa yang untung di akhir rantai?',
  },
  {
    situation: 'Lawan men CAPTURE pion tengah',
    threat: 'Lawan mengontrol pusat dan punya ruang lebih',
    response: [
      'Jangan terima kekalahan pusat — serang pion tengah lawan dengan bidak lain',
      'Gunakan kuda atau gajah untuk menekan pion yang baru saja men CAPTURE',
      'Pertimbangkan struktur pion: kadang mengorbankan pion tengah untuk kecepatan development adalah ide bagus',
    ],
    tip: 'Pion tengah bukan segalanya — jika Anda dapat kecepatan development sebagai gantinya, itu kompensasi yang wajar.',
  },
  {
    situation: 'Lawan mengancam akan men CAPTURE bidak besar (Ratu/Benteng)',
    threat: 'Kehilangan bidak berharga',
    response: [
      'Identifikasi ancaman: bidak mana yang terancam dan oleh apa?',
      'Pindahkan bidak ke petak aman yang sekaligus aktif',
      'Lindungi bidak dengan bidak lain yang lebih murah',
      'Jika bidak terpojok dan tidak bisa diselamatkan, cari taktik untuk men CAPTURE balik dengan nilai setara',
    ],
    tip: 'Sebelum bergerak, selalu cek: apakah bidak saya yang baru mendarat di petak aman? Apakah ada bidak lawan yang bisa men CAPTURE?',
  },
  {
    situation: 'Lawan mengancam dengan taktik (fork/pin/skewer)',
    threat: 'Kehilangan dua bidak atau bidak berharga',
    response: [
      'Pelajari pola taktik agar bisa mengenali ancaman sebelum terjadi',
      'Jika terkena fork, cari jalan: pindahkan bidak yang lebih berharga, atau buat counter-threat',
      'Jika terkena pin, coba lepas pin dengan menggerakkan bidak di belakangnya, atau blokade dengan bidak ketiga',
      'Cari counter-taktik: kadang lawan juga punya kelemahan yang bisa Anda eksploitasi',
    ],
    tip: 'Setiap kali lawan bergerak, tanyakan: "Apa tujuan langkah ini? Apakah ini mengancam sesuatu?" Jangan hanya fokus pada rencana Anda sendiri.',
  },
  {
    situation: 'Lawan men CAPTURE pion terakhir di depan raja Anda',
    threat: 'Raja terbuka dan rentan checkmate',
    response: [
      'Segera tambahkan pertahanan untuk raja — pindahkan raja atau lindungi petak di sekitarnya',
      'Gunakan bidak untuk memblokir kolom terbuka',
      'Pertimbangkan rokade ke sisi lain jika masih memungkinkan',
      'Cari serangan balik — tekanan terbaik adalah menyerang raja lawan juga',
    ],
    tip: 'Setelah perisai pion hancur, keselamatan raja adalah prioritas #1. Segalanya bisa ditunggu, tapi raja tidak.',
  },
  {
    situation: 'Lawan mengundang pertukaran bidak',
    threat: 'Posisi Anda mungkin lebih baik tanpa pertukaran, atau lawan unggul material',
    response: [
      'Jika Anda unggul material: TOLAK pertukaran, simpan bidak Anda',
      'Jika Anda kalah material: TERIMA pertukaran, sederhanakan posisi',
      'Jika posisi seimbang: pertukarkan bidak yang kurang aktif Anda, simpan yang aktif',
      'Jika lawan punya serangan: pertukarkan bidak penyerang utama mereka',
    ],
    tip: 'Pertukaran bukan tentang berapa bidak yang ditukar — tapi tentang siapa yang lebih diuntungkan setelah pertukaran.',
  },
];

// ─── Cara Membaca Situasi & Menentukan Langkah ───

export interface SituationChecklist {
  category: string;
  icon: string;
  color: string;
  questions: string[];
  action: string;
}

export const SITUATION_CHECKLIST: SituationChecklist[] = [
  {
    category: 'Cek Ancaman Langsung',
    icon: 'AlertTriangle',
    color: 'red',
    questions: [
      'Apakah raja saya sedang diserang (skak)? Jika ya, ini prioritas #1 — atasi dulu!',
      'Apakah ada bidak saya yang sedang terancam ditangkap? Bidak mana dan oleh apa?',
      'Apakah lawan mengancam skakmat di langkah berikutnya? Cari petak ke mana raja bisa lari.',
      'Apakah ada bidak lawan yang tidak terlindungi dan bisa saya tangkap gratis?',
    ],
    action: 'Jika ada ancaman langsung, atasi dulu sebelum memikirkan rencana Anda sendiri. Keselamatan di atas segalanya.',
  },
  {
    category: 'Baca Posisi Material',
    icon: 'Scale',
    color: 'amber',
    questions: [
      'Siapa yang unggul material? Hitung total nilai bidak di papan.',
      'Apakah ada bidak saya yang "menggantung" (terancam tapi tidak dilindungi)?',
      'Apakah pertukaran yang baru saja terjadi menguntungkan saya atau lawan?',
      'Apakah ada pion lawan yang siap promosi yang harus saya hentikan?',
    ],
    action: 'Jika unggul material, sederhanakan posisi dengan pertukaran. Jika kalah, cari kompensasi posisional atau serangan balik.',
  },
  {
    category: 'Evaluasi Struktur Pion',
    icon: 'LayoutGrid',
    color: 'blue',
    questions: [
      'Apakah ada pion saya yang tertinggal (backward) — tidak bisa maju karena pion lawan menghalangi?',
      'Apakah ada pion ganda (doubled) di kolom yang sama? Ini melemahkan struktur.',
      'Apakah ada pion terisolasi (isolated) — tidak ada pion sendiri di kolom sampingnya?',
      'Apakah saya punya pion bebas (passed pawn) yang bisa dorong menuju promosi?',
    ],
    action: 'Serang pion lemah lawan dan lindungi pion lemah Anda. Pion bebas adalah asset terbesar di akhir permainan.',
  },
  {
    category: 'Aktivitas Bidak',
    icon: 'Zap',
    color: 'emerald',
    questions: [
      'Bidak mana saya yang belum berkembang (masih di posisi awal)? Ini perlu diperbaiki.',
      'Bidak mana yang paling aktif saya punya? Manfaatkan dan dukung bidak aktif tersebut.',
      'Bidak lawan mana yang paling berbahaya? Cari cara untuk menukarnya atau menonaktifkannya.',
      'Apakah gajah saya terkunci di belakang pion sendiri (bad bishop)? Cari cara membebaskannya.',
    ],
    action: 'Pindahkan bidak pasif ke petak yang lebih aktif. Setiap bidak harus punya tugas — bidak tanpa peran adalah bidak yang terbuang.',
  },
  {
    category: 'Keselamatan Raja',
    icon: 'Shield',
    color: 'rose',
    questions: [
      'Apakah raja saya sudah rokade? Jika belum, apakah rokade masih mungkin?',
      'Apakah perisai pion di depan raja masih utuh, atau sudah ada yang hilang?',
      'Apakah ada kolom/file terbuka mengarah ke raja saya yang bisa dimanfaatkan lawan?',
      'Apakah raja lawan terbuka atau lemah? Jika ya, itu target serangan.',
    ],
    action: 'Jika raja Anda aman dan raja lawan tidak, inilah saatnya menyerang. Jika raja Anda terbuka, prioritaskan pertahanan.',
  },
  {
    category: 'Rencana & Target',
    icon: 'Target',
    color: 'violet',
    questions: [
      'Apa kelemahan terbesar lawan saat ini? Itu harus menjadi target rencana Anda.',
      'Bidak mana saya yang bisa saya improve (tingkatkan posisinya) di langkah ini?',
      'Apakah ada kolom atau diagonal yang bisa saya kuasai dengan benteng atau gajah?',
      'Apa rencana lawan berdasarkan langkah terakhirnya? Cegah sebelum terlambat.',
    ],
    action: 'Setiap langkah harus punya tujuan. Jangan bergerak hanya untuk menggerakkan sesuatu — bergerak untuk meningkatkan posisi atau mengganggu rencana lawan.',
  },
];

// ─── Pembukaan Terkenal ───

export interface FamousOpening {
  id: string;
  name: string;
  indonesianName: string;
  moves: string[];
  fenAfterMoves: string;
  description: string;
  keyIdeas: string[];
  variations: string[];
  difficulty: 'Pemula' | 'Menengah' | 'Lanjutan';
  color: string;
}

export const FAMOUS_OPENINGS: FamousOpening[] = [
  {
    id: 'queens-gambit',
    name: "Queen's Gambit",
    indonesianName: "Queen's Gambit (Persembahan Ratu)",
    moves: ['d4', 'd5', 'c4'],
    fenAfterMoves: 'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP1PPPPP/RNBQKBNR b KQkq c4 0 2',
    description:
      "Salah satu pembukaan tertua dan paling terhormat dalam catur. Putih mengorbankan pion c4 untuk mengontrol pusat. Namanya 'gambit' karena putih menawarkan pion, tapi 'Queen's Gambit Declined' (ditolak) juga sangat populer — hitam tidak harus menerimanya.",
    keyIdeas: [
      'Putih menyerang pusat dari sisi dengan pion c4 yang menantang pion d5 hitam.',
      'Jika hitam menerima (dxc4), putih bisa merebut kembali pion dengan c3 lalu e3/d4.',
      'Jika hitam menolak (e6, QGD), permainan menjadi posisional dengan struktur pion yang kokoh.',
      'Tujuan utama: kontrol pusat dengan dua pion (d4 dan c4) sambil mengembangkan bidak dengan cepat.',
      'Rokade sisi raja, kembangkan gajah ke g2 atau e2, dan tempatkan benteng di kolom c dan d.',
    ],
    variations: [
      "Queen's Gambit Accepted (QGA): 1.d4 d5 2.c4 dxc4 — hitam menerima korban pion",
      "Queen's Gambit Declined (QGD): 1.d4 d5 2.c4 e6 — hitam menolak dan mempertahankan pusat",
      "Slav Defense: 1.d4 d5 2.c4 c6 — hitam melindungi d5 dengan pion c6",
      "Albin Countergambit: 1.d4 d5 2.c4 e5 — hitam balas menawarkan pion",
    ],
    difficulty: 'Menengah',
    color: 'blue',
  },
  {
    id: 'italian-game',
    name: 'Italian Game',
    indonesianName: 'Permainan Italia (Giuoco Piano)',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4'],
    fenAfterMoves: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 4 3',
    description:
      'Salah satu pembukaan tertua dalam catur, sudah dimainkan sejak abad ke-16. Gajah putih di c4 menargetkan titik lemah f7 — petak yang hanya dilindungi oleh raja hitam di awal permainan. "Giuoco Piano" berarti "permainan tenang" dalam bahasa Italia.',
    keyIdeas: [
      'Gajah di c4 mengincar petak f7 yang lemah — hanya dijaga raja hitam.',
      'Kuda di f3 menyerang pion e5 hitam dan mengontrol tengah.',
      'Setelah rokade, putih bisa main c3+d4 untuk merebut pusat atau d3 untuk permainan tenang.',
      'Evans Gambit (c3 lalu b4!) adalah variasi menyerang yang terkenal dari pembukaan ini.',
      'Baik untuk pemula karena mengajarkan prinsip pengembangan dan kontrol pusat dengan natural.',
    ],
    variations: [
      'Giuoco Piano: 1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 — kedua pihak berkembang secara natural',
      'Evans Gambit: 1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.b4 — putih mengorbankan pion untuk tempo',
      'Two Knights Defense: 1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 — hitam kembangkan kuda ke f6',
      'Hungarian Defense: 1.e4 e5 2.Nf3 Nc6 3.Bc4 Be7 — hitam main aman',
    ],
    difficulty: 'Pemula',
    color: 'emerald',
  },
  {
    id: 'sicilian-defense',
    name: 'Sicilian Defense',
    indonesianName: 'Pertahanan Sisilia',
    moves: ['e4', 'c5'],
    fenAfterMoves: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 1 2',
    description:
      'Pertahanan terpopuler dan paling ditakuti melawan 1.e4. Hitam tidak langsung memperebutkan pusat, melainkan menyerang pion e4 dari sisi dengan pion c5. Sisilia menghasilkan permainan asimetris di mana kedua pihak bisa bermain untuk menang — bukan seri!',
    keyIdeas: [
      'Hitam menyerang pusat dari sisi (c5 melawan e4) alih-alih langsung memblokirnya.',
      'Struktur asimetris berarti kedua pihak bermain untuk menang, bukan seri.',
      'Putih punya ruang dan inisiatif di pusat; hitam punya serangan balik di kolom c dan sisi menteri.',
      'Pertukaran d4xc5 memberi hitam pion mayoritas di sisi menteri — keuntungan di akhir permainan.',
      'Banyak variasi menyerang: Najdorf, Dragon, Scheveningen — masing-masing dengan rencana berbeda.',
    ],
    variations: [
      'Najdorf: 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6 — variasi paling populer di tingkat GM',
      'Dragon: 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 g6 — gajah g7 naga mengontrol diagonal',
      'Scheveningen: 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 e6 — struktur fleksibel dan kokoh',
      'Closed Sicilian: 1.e4 c5 2.Nc3 — putih tidak main d4, permainan lebih posisional',
    ],
    difficulty: 'Lanjutan',
    color: 'rose',
  },
  {
    id: 'french-defense',
    name: 'French Defense',
    indonesianName: 'Pertahanan Prancis',
    moves: ['e4', 'e6'],
    fenAfterMoves: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    description:
      'Pertahanan solid di mana hitam bersiap menempatkan pion di d5 untuk menantang pusat putih. Prancis menghasilkan permainan tertutup dengan struktur pion yang kaku. Gajah putih c8 hitam sering jadi masalah karena terhalang pion e6 sendiri.',
    keyIdeas: [
      'Hitam main d5 di langkah berikutnya untuk menantang pusat putih.',
      'Struktur pion menjadi kaku — gajah c8 hitam sering "terkunci" di belakang pion e6.',
      'Putih punya ruang lebih; hitam main serangan balik di sisi menteri setelah c5.',
      'Kompensasi gajah c8: hitam bisa menukarnya atau mencari posisi di mana gajah tidak terlalu penting.',
      'Variasi Advance (e5) menciptakan rantai pion putih yang kuat tapi memberi hitam serangan c5.',
    ],
    variations: [
      'Advance Variation: 1.e4 e6 2.d4 d5 3.e5 — putih dorong e5, rantai pian kuat',
      'Exchange Variation: 1.e4 e6 2.d4 d5 3.exd5 exd5 — simetris, tenang',
      'Classical: 1.e4 e6 2.d4 d5 3.Nc3 Nf6 — pengembangan natural',
      'Winawer: 1.e4 e6 2.d4 d5 3.Nc3 Bb4 — gajah pin kuda, posisi kompleks',
    ],
    difficulty: 'Menengah',
    color: 'amber',
  },
  {
    id: 'ruy-lopez',
    name: 'Ruy Lopez',
    indonesianName: 'Ruy Lopez (Pembukaan Spanyol)',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5'],
    fenAfterMoves: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 4 3',
    description:
      'Salah satu pembukaan tertua dan paling dipelajari dalam catur, dinamai dari pendeta Spanyol Ruy Lopez de Segura (1561). Gajah putih di b5 menekan kuda c6 yang menjaga pion e5. Pembukaan ini kaya strategi dan bisa dimainkan di semua level.',
    keyIdeas: [
      'Gajah b5 menekan kuda c6 — jika kuda dipindahkan, putih bisa menangkap pion e5.',
      'Hitam biasanya main a6 untuk "menguji" gajah (Apakah putih retreat atau tukar kuda?).',
      'Putih membangun tekanan bertahap di pusat dan sisi raja dengan a4, Nc3, Bc2, d3.',
      'Pertempuran struktur pion sangat penting — perhatikan kolom c dan d setelah pertukaran.',
      'Pembukaan ini mengajarkan kesabaran posisional: keuntungan kecil yang terakumulasi.',
    ],
    variations: [
      'Morphy Defense: 1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 — hitam uji gajah dengan a6',
      'Exchange Variation: 1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Bxc6 dxc6 — putih tukar, main struktur',
      'Berlin Defense: 1.e4 e5 2.Nf3 Nc6 3.Bb5 Nf6 — "Berlin Wall", sangat solid',
      'Schliemann: 1.e4 e5 2.Nf3 Nc6 3.Bb5 f5 — hitam serang langsung, tajam dan berbahaya',
    ],
    difficulty: 'Lanjutan',
    color: 'violet',
  },
  {
    id: 'kings-indian',
    name: "King's Indian Defense",
    indonesianName: "Pertahanan India Raja (KID)",
    moves: ['d4', 'Nf6', 'c4', 'g6'],
    fenAfterMoves: 'rnbqkb1r/pppppppp/5n2/8/2PP4/8/PP1PPPPP/RNBQKBNR w KQkq - 1 2',
    description:
      "Pertahanan hypermodern yang sangat populer. Hitam membiarkan putih membangun pusat besar, lalu menyerangnya dari sisi dengan gajah g7 dan kuda f6. Di tengah permainan, hitam melancarkan serangan brutal di sisi raja. KID adalah pembukaan penuh semangat untuk pemain yang suka menang!",
    keyIdeas: [
      'Hitam main hypermodern: kontrol pusat dari jauh dengan gajah g7 dan kuda f6.',
      'Putih bangun pusat besar (e4, d4, c4) — hitam akan menyerangnya dengan ...e5 atau ...c5.',
      'Setelah rokade, gajah g7 menjadi senjata bertahan + menyerang di sepanjang diagonal a1-h8.',
      'Serangan di sisi raja: hitam dorong f5 dan buka posisi raja putih dengan taktik menyerang.',
      'Pembukaan ini butuh keberanian — hitam sengaja menerima ruang sempit untuk serangan balik.',
    ],
    variations: [
      'Classical Main Line: 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 — setup standar KID',
      'Sämisch Variation: 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.f3 — putih siap bangun pusat besar',
      'Four Pawns Attack: 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.f4 — putih agresif maksimal',
      'Fianchetto Variation: 1.d4 Nf6 2.c4 g6 3.Nf3 Bg7 4.g3 — putih juga fianchetto, permainan tenang',
    ],
    difficulty: 'Lanjutan',
    color: 'blue',
  },
];
