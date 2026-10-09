import { useState, useCallback, useMemo } from 'react';
import type { Chess } from 'chess.js';

interface ChessBoardProps {
  game: Chess;
  onMove: (from: string, to: string, promotion?: string) => boolean;
  orientation?: 'white' | 'black';
  highlightedSquares?: string[];
  showLegalMoves?: boolean;
  lastMove?: { from: string; to: string } | null;
  showCoordinates?: boolean;
  interactive?: boolean;
}

const PIECE_SYMBOLS: Record<string, { w: string; b: string }> = {
  p: { w: '♙', b: '♟' },
  r: { w: '♖', b: '♜' },
  n: { w: '♘', b: '♞' },
  b: { w: '♗', b: '♝' },
  q: { w: '♕', b: '♛' },
  k: { w: '♔', b: '♚' },
};

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['1', '2', '3', '4', '5', '6', '7', '8'];

export default function ChessBoard({
  game,
  onMove,
  orientation = 'white',
  highlightedSquares = [],
  showLegalMoves = true,
  lastMove = null,
  showCoordinates = true,
  interactive = true,
}: ChessBoardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [promotion, setPromotion] = useState<{ from: string; to: string } | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);

  const board = game.board();

  const displayRanks = orientation === 'white' ? [...RANKS].reverse() : [...RANKS];
  const displayFiles = orientation === 'white' ? FILES : [...FILES].reverse();

  const legalMoves = useMemo(() => {
    if (!selected || !interactive) return [];
    return game.moves({ square: selected as any, verbose: true });
  }, [selected, game, interactive]);

  const legalTargets = useMemo(() => {
    const map = new Map<string, string>();
    legalMoves.forEach((m) => map.set(m.to, m.promotion ? 'promotion' : 'normal'));
    return map;
  }, [legalMoves]);

  const handleSquareClick = useCallback(
    (square: string) => {
      if (!interactive) return;

      if (selected) {
        if (square === selected) {
          setSelected(null);
          return;
        }

        if (legalTargets.has(square)) {
          const moveType = legalTargets.get(square);
          if (moveType === 'promotion') {
            setPromotion({ from: selected, to: square });
            return;
          }
          const success = onMove(selected, square);
          if (success) setSelected(null);
          return;
        }

        const piece = game.get(square as any);
        if (piece) {
          setSelected(square);
          return;
        }
        setSelected(null);
      } else {
        const piece = game.get(square as any);
        if (piece) {
          const turn = game.turn();
          if (piece.color === turn || !showLegalMoves) {
            setSelected(square);
          }
        }
      }
    },
    [selected, interactive, legalTargets, game, onMove, showLegalMoves]
  );

  const handlePromotionChoice = (piece: string) => {
    if (promotion) {
      onMove(promotion.from, promotion.to, piece);
      setSelected(null);
      setPromotion(null);
    }
  };

  const isLight = (file: string, rank: string) => {
    const fileIdx = FILES.indexOf(file);
    const rankIdx = RANKS.indexOf(rank);
    return (fileIdx + rankIdx) % 2 === 1;
  };

  return (
    <div className="relative inline-block">
      <div className="flex">
        {showCoordinates && orientation === 'white' && (
          <div className="flex flex-col-reverse justify-around pr-1">
            {displayRanks.map((r) => (
              <span key={r} className="text-xs font-semibold text-slate-500 flex items-center">
                {r}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-col">
          {displayRanks.map((rank) => (
            <div key={rank} className="flex">
              {displayFiles.map((file) => {
                const square = `${file}${rank}`;
                const piece = board[8 - parseInt(rank)][FILES.indexOf(file)];
                const isSelected = selected === square;
                const isLegal = legalTargets.has(square);
                const isHighlighted = highlightedSquares.includes(square);
                const isLastFrom = lastMove?.from === square;
                const isLastTo = lastMove?.to === square;
                const isDragOver = dragOver === square;
                const light = isLight(file, rank);

                return (
                  <div
                    key={square}
                    onClick={() => handleSquareClick(square)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(square);
                    }}
                    onDragLeave={() => setDragOver(null)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(null);
                      const from = e.dataTransfer.getData('text/plain');
                      if (from && legalTargets.has(square)) {
                        if (legalTargets.get(square) === 'promotion') {
                          setPromotion({ from, to: square });
                        } else {
                          onMove(from, square);
                          setSelected(null);
                        }
                      }
                    }}
                    className={`
                      relative flex items-center justify-center cursor-pointer
                      transition-colors duration-150
                      ${light ? 'bg-[#f0d9b5]' : 'bg-[#b58863]'}
                      ${isSelected ? 'ring-4 ring-inset ring-amber-400 bg-amber-300!' : ''}
                      ${isLastFrom || isLastTo ? 'bg-amber-200!' : ''}
                      ${isHighlighted ? 'ring-4 ring-inset ring-sky-400' : ''}
                      ${isDragOver ? 'ring-4 ring-inset ring-emerald-400' : ''}
                    `}
                    style={{ width: 'var(--sq)', height: 'var(--sq)' }}
                  >
                    {/* Coordinate labels */}
                    {showCoordinates && rank === (orientation === 'white' ? '1' : '8') && (
                      <span
                        className={`absolute bottom-0.5 right-1 text-[10px] font-semibold pointer-events-none ${
                          light ? 'text-[#b58863]' : 'text-[#f0d9b5]'
                        }`}
                      >
                        {file}
                      </span>
                    )}
                    {showCoordinates && file === (orientation === 'white' ? 'a' : 'h') && (
                      <span
                        className={`absolute top-0.5 left-1 text-[10px] font-semibold pointer-events-none ${
                          light ? 'text-[#b58863]' : 'text-[#f0d9b5]'
                        }`}
                      >
                        {rank}
                      </span>
                    )}

                    {/* Legal move indicators */}
                    {isLegal && !piece && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-1/3 h-1/3 rounded-full bg-emerald-600/40" />
                      </div>
                    )}
                    {isLegal && piece && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 rounded-sm ring-4 ring-inset ring-red-500/60" />
                      </div>
                    )}

                    {/* Piece */}
                    {piece && (
                      <div
                        draggable={interactive}
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', square);
                          setSelected(square);
                        }}
                        className="relative z-10 cursor-grab active:cursor-grabbing"
                      >
                        <span
                          className="block leading-none"
                          style={{
                            fontSize: 'calc(var(--sq) * 0.78)',
                            color: piece.color === 'w' ? '#f8fafc' : '#1e293b',
                            textShadow:
                              piece.color === 'w'
                                ? '0 0 1px #000, 1px 1px 2px rgba(0,0,0,0.4), 0 0 3px rgba(0,0,0,0.2)'
                                : '0 0 1px #fff, 1px 1px 2px rgba(0,0,0,0.5)',
                          }}
                        >
                          {PIECE_SYMBOLS[piece.type][piece.color]}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {showCoordinates && orientation === 'black' && (
          <div className="flex flex-col justify-around pl-1">
            {displayRanks.map((r) => (
              <span key={r} className="text-xs font-semibold text-slate-500">
                {r}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Promotion dialog */}
      {promotion && (
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center rounded-lg z-50">
          <div className="bg-white rounded-xl p-4 shadow-2xl">
            <p className="text-center text-sm font-semibold text-slate-700 mb-3">
              Pilih bidak promosi:
            </p>
            <div className="flex gap-2">
              {(['q', 'r', 'b', 'n'] as const).map((p) => {
                const turn = game.turn();
                const symbols: Record<string, string> = {
                  q: turn === 'w' ? '♕' : '♛',
                  r: turn === 'w' ? '♖' : '♜',
                  b: turn === 'w' ? '♗' : '♝',
                  n: turn === 'w' ? '♘' : '♞',
                };
                return (
                  <button
                    key={p}
                    onClick={() => handlePromotionChoice(p)}
                    className="w-14 h-14 flex items-center justify-center bg-slate-100 hover:bg-amber-200 rounded-lg text-4xl transition-colors"
                    style={{
                      color: turn === 'w' ? '#f8fafc' : '#1e293b',
                      textShadow:
                        turn === 'w'
                          ? '0 0 1px #000, 1px 1px 2px rgba(0,0,0,0.4)'
                          : '0 0 1px #fff, 1px 1px 2px rgba(0,0,0,0.5)',
                    }}
                  >
                    {symbols[p]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
