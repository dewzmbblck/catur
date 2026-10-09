import { useState, useMemo, useCallback } from 'react';
import { Chess } from 'chess.js';
import ChessBoard from '@/components/chess/ChessBoard';
import { PIECE_INFO, PIECE_ORDER, type PieceType } from '@/data/pieces';

const PIECE_SYMBOLS: Record<string, { w: string; b: string }> = {
  p: { w: '♙', b: '♟' },
  r: { w: '♖', b: '♜' },
  n: { w: '♘', b: '♞' },
  b: { w: '♗', b: '♝' },
  q: { w: '♕', b: '♛' },
  k: { w: '♔', b: '♚' },
};

const PRACTICE_FEN: Record<PieceType, string> = {
  pawn: '8/8/8/8/8/8/PPPPPPPP/8 w - - 0 1',
  knight: '8/8/8/8/3N4/8/8/8 w - - 0 1',
  bishop: '8/8/8/8/3B4/8/8/8 w - - 0 1',
  rook: '8/8/8/8/3R4/8/8/8 w - - 0 1',
  queen: '8/8/8/8/3Q4/8/8/8 w - - 0 1',
  king: '8/8/8/8/3K4/8/8/8 w - - 0 1',
};

export default function LearnView() {
  const [selectedPiece, setSelectedPiece] = useState<PieceType>('pawn');
  const [practiceGame, setPracticeGame] = useState<Chess>(new Chess());
  const [practiceFen, setPracticeFen] = useState<string>(PRACTICE_FEN.pawn);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [showTipsFor, setShowTipsFor] = useState<number | null>(null);

  const info = PIECE_INFO[selectedPiece];

  const startPractice = useCallback((piece: PieceType) => {
    const fen = PRACTICE_FEN[piece];
    const game = new Chess(fen);
    setPracticeGame(game);
    setPracticeFen(fen);
    setLastMove(null);
    setMoveHistory([]);
  }, []);

  const handlePieceSelect = (piece: PieceType) => {
    setSelectedPiece(piece);
    startPractice(piece);
  };

  const handleMove = useCallback(
    (from: string, to: string, promotion?: string) => {
      try {
        const newGame = new Chess(practiceGame.fen());
        newGame.move({ from, to, promotion: promotion || 'q' });
        setPracticeGame(newGame);
        setPracticeFen(newGame.fen());
        setLastMove({ from, to });
        setMoveHistory((prev) => [...prev, newGame.history().pop() || '']);
        return true;
      } catch {
        return false;
      }
    },
    [practiceGame]
  );

  const resetPractice = () => startPractice(selectedPiece);

  const highlightedSquares = useMemo(() => {
    return [];
  }, []);

  return (
    <div className="space-y-8">
      {/* Piece selector */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Pengenalan Bidak Catur</h2>
        <p className="text-slate-500 mb-5">
          Pilih setiap bidak untuk mempelajari cara bergerak, aturan khusus, dan langsung praktek
          di papan.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PIECE_ORDER.map((type) => {
            const pinfo = PIECE_INFO[type];
            const isActive = selectedPiece === type;
            return (
              <button
                key={type}
                onClick={() => handlePieceSelect(type)}
                className={`
                  relative flex flex-col items-center gap-2 p-4 rounded-2xl
                  transition-all duration-200
                  ${
                    isActive
                      ? 'bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-lg scale-105'
                      : 'bg-white text-slate-600 hover:bg-slate-50 hover:shadow-md border border-slate-200'
                  }
                `}
              >
                <span
                  className="text-5xl leading-none"
                  style={{
                    color: isActive ? '#f8fafc' : '#1e293b',
                    textShadow: '0 0 1px #000, 1px 1px 2px rgba(0,0,0,0.3)',
                  }}
                >
                  {PIECE_SYMBOLS[type[0]].w}
                </span>
                <span className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-slate-700'}`}>
                  {pinfo.name}
                </span>
                <span className={`text-xs ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
                  Nilai: {pinfo.value === Infinity ? '∞' : pinfo.value}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Piece details + practice board */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Details */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-700 to-slate-900 p-6 text-white">
              <div className="flex items-center gap-4">
                <span
                  className="text-6xl leading-none"
                  style={{ textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.5)' }}
                >
                  {PIECE_SYMBOLS[info.type[0]].w}
                </span>
                <div>
                  <h3 className="text-2xl font-bold">{info.name}</h3>
                  <p className="text-slate-300 text-sm">
                    Nilai: {info.value === Infinity ? '∞' : info.value} | {info.startingPositions}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-1">
                  Deskripsi
                </h4>
                <p className="text-slate-700 text-sm leading-relaxed">{info.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-1">
                  Cara Bergerak
                </h4>
                <p className="text-slate-700 text-sm leading-relaxed">{info.movement}</p>
              </div>
            </div>
          </div>

          {/* Special rules */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-3">
              Aturan Khusus
            </h4>
            <ul className="space-y-3">
              {info.specialRules.map((rule, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-slate-700 text-sm leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-6">
            <h4 className="text-sm font-bold text-emerald-700 uppercase tracking-wide mb-3">
              Tips Strategi
            </h4>
            <ul className="space-y-2">
              {info.tips.map((tip, i) => (
                <li key={i} className="flex gap-2 text-slate-700 text-sm leading-relaxed">
                  <span className="text-emerald-600 font-bold">›</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Practice board */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-slate-800">Praktek Langsung</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Klik bidak {info.name} untuk melihat langkah legalnya, lalu klik petak tujuan.
                </p>
              </div>
              <button
                onClick={resetPractice}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>

            <div
              className="flex justify-center"
              style={{ '--sq': '48px' } as React.CSSProperties}
            >
              <ChessBoard
                game={practiceGame}
                onMove={handleMove}
                lastMove={lastMove}
                highlightedSquares={highlightedSquares}
                showLegalMoves={true}
                showCoordinates={true}
                interactive={true}
              />
            </div>

            {moveHistory.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-2">
                  Riwayat Langkah
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {moveHistory.map((move, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-mono rounded"
                    >
                      {i + 1}. {move}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick quiz */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-200 p-6">
            <h4 className="font-bold text-indigo-800 mb-3">Coba Ini!</h4>
            <div className="space-y-2">
              {info.type === 'pawn' && (
                <p className="text-sm text-slate-700">
                  Coba gerakkan pion dari posisi awal maju dua petak. Lalu coba gerakkan pion
                  secara diagonal — perhatikan bahwa pion hanya bisa menangkap secara diagonal,
                  bukan gerak lurus.
                </p>
              )}
              {info.type === 'knight' && (
                <p className="text-sm text-slate-700">
                  Kuda ada di d4. Coba gerakkan kuda ke berbagai arah dan perhatikan pola huruf
                  L. Kuda bisa mencapai 8 petak dari tengah papan!
                </p>
              )}
              {info.type === 'bishop' && (
                <p className="text-sm text-slate-700">
                  Gajah ada di d4. Coba gerakkan ke berbagai arah diagonal. Perhatikan bahwa gajah
                  hanya bisa bergerak di satu warna petak.
                </p>
              )}
              {info.type === 'rook' && (
                <p className="text-sm text-slate-700">
                  Benteng ada di d4. Coba gerakkan horizontal dan vertikal sejauh mungkin.
                  Perhatikan jalur yang bisa dicapai benteng.
                </p>
              )}
              {info.type === 'queen' && (
                <p className="text-sm text-slate-700">
                  Ratu ada di d4. Coba gerakkan ke segala arah — horizontal, vertikal, dan
                  diagonal. Ratu adalah bidak paling fleksibel!
                </p>
              )}
              {info.type === 'king' && (
                <p className="text-sm text-slate-700">
                  Raja ada di d4. Coba gerakkan raja satu petak ke segala arah. Perhatikan bahwa
                  raja hanya bisa satu petak per langkah.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
