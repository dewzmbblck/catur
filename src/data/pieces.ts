export type PieceType = 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king';
export type PieceColor = 'white' | 'black';

export interface PieceInfo {
  type: PieceType;
  name: string;
  symbol: string;
  whiteSymbol: string;
  blackSymbol: string;
  value: number;
  description: string;
  movement: string;
  specialRules: string[];
  tips: string[];
  startingPositions: string;
}

export const PIECE_INFO: Record<PieceType, PieceInfo> = {
  pawn: {
    type: 'pawn',
    name: 'Pion',
    symbol: '♟',
    whiteSymbol: '♙',
    blackSymbol: '♟',
    value: 1,
    description:
      'Pion adalah bidak terbanyak di papan catur (16 total, 8 per pemain) dan bernilai paling rendah. Meski lemah, pion adalah tulang punggung strategi catur — mereka mengontrol ruang dan melindungi bidak lain.',
    movement:
      'Pion bergerak maju satu petak. Dari posisi awal, pion bisa maju dua petak sekaligus. Pion tidak bisa mundur. Pion men CAPTURE secara diagonal satu petak ke depan — berbeda dari arah geraknya!',
    specialRules: [
      'En Passant: Jika pion lawan maju dua petak dan mendarat sejajar dengan pion Anda, Anda bisa menangkapnya secara diagonal seolah-olah ia hanya maju satu petak. Hanya bisa dilakukan di langkah berikutnya.',
      'Promosi: Jika pion mencapai petak terjauh (petak ke-8 untuk putih, petak ke-1 untuk hitam), pion harus dipromosikan menjadi Ratu, Menteri, Gajah, atau Kuda sesuai pilihan Anda.',
      'Dua langkah awal: Hanya di langkah pertama, pion boleh maju dua petak sekaligus untuk mempercepat development.',
    ],
    tips: [
      'Jangan menggeser pion di depan raja Anda sembarangan — itu membuka pertahanan raja.',
      'Pion yang berpasangan (doubled pawns) di kolom yang sama menjadi lemah karena saling menghalangi.',
      'Pion yang bebas (passed pawn) tanpa pion lawan di depannya sangat berbahaya dan harus didukung.',
      'Pion di tengah (e4, d4, e5, d5) mengontrol petak-petak penting di papan.',
    ],
    startingPositions: 'Baris ke-2 untuk putih, baris ke-7 untuk hitam — 8 pion per pemain.',
  },
  knight: {
    type: 'knight',
    name: 'Kuda',
    symbol: '♞',
    whiteSymbol: '♘',
    blackSymbol: '♞',
    value: 3,
    description:
      'Kuda adalah bidak yang bergerak unik dalam bentuk huruf "L" — dua petak lurus lalu satu petak menyilang. Kuda adalah satu-satunya bidak yang bisa melompati bidak lain.',
    movement:
      'Kuda bergerak dalam bentuk L: dua petak ke satu arah (horizontal/vertikal) lalu satu petak menyilang. Hasilnya, kuda bisa mencapai maksimum 8 petak dari posisinya. Kuda men CAPTURE dengan mendarat di petak musuh.',
    specialRules: [
      'Kuda bisa melompati bidak lain — baik milik sendiri maupun lawan. Ini menjadikannya sangat berguna di posisi yang ramai.',
      'Kuda berpindah warna petak setiap bergerak — kuda di petak putih akan mendarat di petak gelap, dan sebaliknya.',
    ],
    tips: [
      'Kuda lebih kuat di tengah papan (mencapai lebih banyak petak) dan lebih lemah di pinggir/sudut.',
      'Kuda adalah bidak tertutup yang baik — jika papan penuh pion, kuda lebih effektif dari gajah.',
      'Gunakan kuda untuk "fork" — menyerang dua bidak lawan sekaligus dari satu petak.',
      'Pasangan kuda bisa menjaga raja dengan baik di akhir permainan.',
    ],
    startingPositions: 'Petak b1 dan g1 untuk putih, b8 dan g8 untuk hitam.',
  },
  bishop: {
    type: 'bishop',
    name: 'Gajah',
    symbol: '♝',
    whiteSymbol: '♗',
    blackSymbol: '♝',
    value: 3,
    description:
      'Gajah bergerak diagonal sejauh mungkin. Setiap pemain punya dua gajah — satu di petak terang dan satu di petak gelap. Gajah tidak bisa berpindah warna petak.',
    movement:
      'Gajah bergerak diagonal sejauh mungkin, sepanjang petak yang sama warnanya. Gajah tidak bisa melompati bidak lain. Gajah men CAPTURE dengan mendarat di petak musuh di jalur diagonalnya.',
    specialRules: [
      'Gajah terang hanya bisa berada di petak terang sepanjang permainan, gajah gelap hanya di petak gelap.',
      'Pasangan gajah (bishop pair) memberikan keunggulan strategis karena bisa mengontrol semua warna petak.',
    ],
    tips: [
      'Gajah sangat kuat di papan terbuka dengan sedikit pion yang menghalangi.',
      'Pasangan gajah dianggap lebih bernilai dari kuda + gajah atau dua kuda.',
      'Gajah yang terkunci di belakang pion sendiri (bad bishop) menjadi tidak berguna.',
      'Tempatkan gajah di diagonal terbuka untuk mengontrol jalur penting.',
    ],
    startingPositions: 'Petak c1 dan f1 untuk putih, c8 dan f8 untuk hitam.',
  },
  rook: {
    type: 'rook',
    name: 'Benteng',
    symbol: '♜',
    whiteSymbol: '♖',
    blackSymbol: '♜',
    value: 5,
    description:
      'Benteng adalah bidak berat yang bergerak horizontal dan vertikal sejauh mungkin. Benteng paling kuat di akhir permainan dan di kolom yang terbuka.',
    movement:
      'Benteng bergerak horizontal atau vertikal sejauh mungkin. Benteng tidak bisa melompati bidak lain. Benteng men CAPTURE dengan mendarat di petak musuh di jalurnya.',
    specialRules: [
      'Castling (Rokade): Benteng dan raja bisa bergerak bersamaan dalam satu langkah jika memenuhi syarat — raja belum bergerak, benteng belum bergerak, tidak ada bidak di antaranya, dan raja tidak melewati/mendarat di petak yang diserang lawan.',
      'Rokade sisi raja (kingside): Raja ke g1, benteng ke f1. Rokade sisi menteri (queenside): Raja ke c1, benteng ke d1.',
    ],
    tips: [
      'Benteng paling efektif di kolom terbuka (tanpa pion) atau semi-terbuka (hanya pion lawan).',
      'Dua benteng di baris ke-7 (seventh rank) sering memenangkan permainan.',
      'Benteng di belakang pion lawan adalah posisi yang sangat menguntungkan.',
      'Lindungi benteng di awal permainan — jangan biarkan mudah diserang oleh kuda atau gajah.',
    ],
    startingPositions: 'Petak a1 dan h1 untuk putih, a8 dan h8 untuk hitam.',
  },
  queen: {
    type: 'queen',
    name: 'Ratu',
    symbol: '♛',
    whiteSymbol: '♕',
    blackSymbol: '♛',
    value: 9,
    description:
      'Ratu adalah bidak terkuat di papan. Ratu bisa bergerak horizontal, vertikal, dan diagonal sejauh mungkin — menggabungkan kemampuan benteng dan gajah.',
    movement:
      'Ratu bergerak ke segala arah (horizontal, vertikal, diagonal) sejauh mungkin. Ratu tidak bisa melompati bidak lain. Ratu men CAPTURE dengan mendarat di petak musuh di jalurnya.',
    specialRules: [
      'Ratu adalah kombinasi benteng + gajah — bidak paling fleksibel di papan.',
      'Jangan keluarkan ratu terlalu dini di awal permainan — ratu bisa dikejar oleh bidak lebih murah lawan, memaksa Anda kehilangan tempo.',
    ],
    tips: [
      'Ratu paling efektif di tengah papan di akhir permainan, tapi harus hati-hati di awal karena bisa dikejar.',
      'Lindungi ratu Anda — kehilangan ratu biasanya berarti kalah.',
      'Ratu + raja bisa melakukan checkmate sendirian melawan raja yang terpojok.',
      'Gunakan ratu untuk mendukung serangan, bukan sebagai bidak terdepan di awal permainan.',
    ],
    startingPositions: 'Petak d1 untuk putih, d8 untuk hitam — di samping raja.',
  },
  king: {
    type: 'king',
    name: 'Raja',
    symbol: '♚',
    whiteSymbol: '♔',
    blackSymbol: '♚',
    value: Infinity,
    description:
      'Raja adalah bidak terpenting — bukan dari nilai, tapi karena jika raja di-checkmate, permainan berakhir. Raja tidak pernah bisa ditangkap, hanya di-skak (check) atau di-mate (checkmate).',
    movement:
      'Raja bergerak satu petak ke segala arah (horizontal, vertikal, diagonal). Raja tidak bisa bergerak ke petak yang diserang oleh bidak lawan. Raja men CAPTURE bidak lawan yang tidak terlindungi.',
    specialRules: [
      'Skak (Check): Jika raja diserang, pemain HARUS mengatasinya — dengan menggerakkan raja, menangkap bidak penyerang, atau menghalangi serangan.',
      'Skakmat (Checkmate): Jika raja diserang dan tidak bisa mengatasinya — permainan berakhir, lawan menang.',
      'Rokade: Raja bisa melakukan rokade dengan benteng dalam satu langkah (lihat bidak Benteng).',
      'Stalemate (Pat): Jika pemain tidak bisa bergerak tapi rajanya tidak diserang — permainan berakhir seri (draw).',
      'Raja tidak boleh berdekatan dengan raja lawan — minimal satu petak jarak.',
    ],
    tips: [
      'Jaga keselamatan raja di atas segalanya — lakukan rokade di awal untuk melindunginya.',
      'Di akhir permainan, raja menjadi bidak ofensif yang aktif menuju tengah papan.',
      'Jangan biarkan raja di tengah papan di tengah permainan — ia rentan diserang.',
      'Perisai pion di depan raja sangat penting untuk keselamatannya.',
    ],
    startingPositions: 'Petak e1 untuk putih, e8 untuk hitam.',
  },
};

export const PIECE_ORDER: PieceType[] = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];
