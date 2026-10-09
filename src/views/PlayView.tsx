import { useState, useCallback, useEffect } from 'react';
import { Chess } from 'chess.js';
import ChessBoard from '@/components/chess/ChessBoard';

const PIECE_SYMBOLS: Record<string, { w: string; b: string }> = {
  p: { w: '♙', b: '♟' },
  r: { w: '♖', b: '♜' },
  n: { w: '♘', b: '♞' },
  b: { w: '♗', b: '♝' },
  q: { w: '♕', b: '♛' },
  k: { w: '♔', b: '♚' },
};

const PIECE_VALUES: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 100 };

type Difficulty = 'easy' | 'medium' | 'hard';

function evaluateBoard(game: Chess): number {
  const board = game.board();
  let score = 0;
  for (const row of board) {
    for (const piece of row) {
      if (piece) {
        const val = PIECE_VALUES[piece.type] || 0;
        score += piece.color === 'w' ? val : -val;
      }
    }
  }
  return score;
}

function makeAIMove(game: Chess, difficulty: Difficulty): string | null {
  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;

  if (difficulty === 'easy') {
    // Random move
    const move = moves[Math.floor(Math.random() * moves.length)];
    return move.san;
  }

  // Score moves
  const scored = moves.map((move) => {
    const testGame = new Chess(game.fen());
    testGame.move(move);
    let score = evaluateBoard(testGame);

    // Prefer captures
    if (move.captured) {
      score += PIECE_VALUES[move.captured] * (difficulty === 'hard' ? 10 : 5);
    }

    // Prefer checks
    if (move.san.includes('+')) {
      score += 3;
    }

    // Prefer checkmates
    if (move.san.includes('#')) {
      score += 1000;
    }

    // Hard: look one move deeper
    if (difficulty === 'hard') {
      const opponentMoves = testGame.moves({ verbose: true });
      let worstResponse = 0;
      for (const oppMove of opponentMoves) {
        const testGame2 = new Chess(testGame.fen());
        testGame2.move(oppMove);
        const responseScore = evaluateBoard(testGame2);
        if (responseScore < worstResponse) worstResponse = responseScore;
      }
      score += worstResponse;
    }

    // Slight randomization to avoid identical games
    score += Math.random() * 0.5;

    return { san: move.san, score };
  });

  // AI is black, so it wants to minimize the score (negative = good for black)
  scored.sort((a, b) => a.score - b.score);
  return scored[0].san;
}

export default function PlayView() {
  const [game, setGame] = useState<Chess>(new Chess());
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);
  const [fen, setFen] = useState(game.fen());
  const [history, setHistory] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [playerColor, setPlayerColor] = useState<'white' | 'black'>('white');
  const [showHint, setShowHint] = useState(false);
  const [hintMove, setHintMove] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);

  const isPlayerTurn =
    (playerColor === 'white' && game.turn() === 'w') ||
    (playerColor === 'black' && game.turn() === 'b');

  const checkGameOver = useCallback((g: Chess) => {
    if (g.isCheckmate()) {
      const winner = g.turn() === 'w' ? 'Hitam' : 'Putih';
      setGameOver(`Skakmat! ${winner} menang.`);
    } else if (g.isStalemate()) {
      setGameOver('Pat (Stalemate) — permainan seri.');
    } else if (g.isDraw()) {
      setGameOver('Permainan seri (Draw).');
    } else if (g.isThreefoldRepetition()) {
      setGameOver('Permainan seri (pengulangan tiga kali).');
    } else if (g.isInsufficientMaterial()) {
      setGameOver('Permainan seri — material tidak cukup.');
    } else {
      setGameOver(null);
    }
  }, []);

  const handleMove = useCallback(
    (from: string, to: string, promotion?: string) => {
      if (!isPlayerTurn || gameOver) return false;
      try {
        const newGame = new Chess(game.fen());
        const result = newGame.move({ from, to, promotion: promotion || 'q' });
        if (result) {
          setGame(newGame);
          setFen(newGame.fen());
          setLastMove({ from, to });
          setHistory(newGame.history());
          setShowHint(false);
          setHintMove(null);
          checkGameOver(newGame);
          return true;
        }
      } catch {
        return false;
      }
      return false;
    },
    [game, isPlayerTurn, gameOver, checkGameOver]
  );

  // AI move
  useEffect(() => {
    if (gameOver) return;
    const aiTurn = (playerColor === 'white' && game.turn() === 'b') ||
                   (playerColor === 'black' && game.turn() === 'w');
    if (aiTurn && !thinking) {
      setThinking(true);
      const timer = setTimeout(() => {
        const aiMove = makeAIMove(game, difficulty);
        if (aiMove) {
          const newGame = new Chess(game.fen());
          newGame.move(aiMove);
          setGame(newGame);
          setFen(newGame.fen());
          const verboseMoves = newGame.history({ verbose: true });
          const lastVerbose = verboseMoves[verboseMoves.length - 1];
          if (lastVerbose) {
            setLastMove({ from: lastVerbose.from, to: lastVerbose.to });
          }
          setHistory(newGame.history());
          checkGameOver(newGame);
        }
        setThinking(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [game, playerColor, difficulty, gameOver, thinking, checkGameOver]);

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setFen(newGame.fen());
    setLastMove(null);
    setHistory([]);
    setGameOver(null);
    setShowHint(false);
    setHintMove(null);
    setThinking(false);
  };

  const undoMove = () => {
    const newGame = new Chess(game.fen());
    // Undo AI move + player move
    newGame.undo();
    if (newGame.history().length > 0) {
      newGame.undo();
    }
    setGame(newGame);
    setFen(newGame.fen());
    setHistory(newGame.history());
    setGameOver(null);
    setShowHint(false);
    setHintMove(null);
  };

  const getHint = () => {
    if (!isPlayerTurn) return;
    // Use the AI logic with hard difficulty to suggest a move
    const hint = makeAIMove(game, 'hard');
    // Flip perspective: for white, we want to maximize score
    const moves = game.moves({ verbose: true });
    if (moves.length === 0) return;

    const scored = moves.map((move) => {
      const testGame = new Chess(game.fen());
      testGame.move(move);
      let score = evaluateBoard(testGame);
      if (move.captured) score += PIECE_VALUES[move.captured] * 10;
      if (move.san.includes('+')) score += 3;
      if (move.san.includes('#')) score += 1000;
      score += Math.random() * 0.5;
      return { san: move.san, score, from: move.from, to: move.to };
    });

    // Player is white (or black), so maximize for their color
    const playerIsWhite = playerColor === 'white';
    scored.sort((a, b) => (playerIsWhite ? b.score - a.score : a.score - b.score));
    const best = scored[0];
    if (best) {
      setHintMove(`${best.from} → ${best.to} (${best.san})`);
      setShowHint(true);
    }
  };

  const capturedWhite = game.board().flat().filter((p) => p && p.color === 'w').length;
  const capturedBlack = game.board().flat().filter((p) => p && p.color === 'b').length;
  const whiteCaptured = 16 - capturedBlack;
  const blackCaptured = 16 - capturedWhite;

  const inCheck = game.inCheck();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Main Langsung</h2>
          <p className="text-slate-500 text-sm mt-1">
            Bermain melawan AI dengan berbagai tingkat kesulitan. Langsung praktek sambil belajar!
          </p>
        </div>
        <div className="flex gap-2">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => {
                setDifficulty(d);
                resetGame();
              }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                difficulty === d
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {d === 'easy' ? 'Mudah' : d === 'medium' ? 'Sedang' : 'Sulit'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Board area */}
        <div className="flex flex-col items-center">
          {/* Black player info */}
          <div
            className={`w-full max-w-[500px] flex items-center justify-between px-4 py-3 rounded-xl mb-2 transition-all ${
              game.turn() === 'b' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">♚</span>
              <div>
                <p className="font-semibold text-sm">
                  Hitam {playerColor === 'black' ? '(Anda)' : '(AI)'}
                </p>
                {blackCaptured > 0 && (
                  <p className="text-xs opacity-70">Bidak ditangkap: {blackCaptured}</p>
                )}
              </div>
            </div>
            {game.turn() === 'b' && !gameOver && (
              <span className="text-xs font-semibold animate-pulse">
                {playerColor === 'black' ? 'Giliran Anda' : thinking ? 'AI berpikir...' : ''}
              </span>
            )}
          </div>

          {/* Board */}
          <div
            className="rounded-xl overflow-hidden shadow-xl"
            style={{ '--sq': '56px' } as React.CSSProperties}
          >
            <ChessBoard
              game={game}
              onMove={handleMove}
              orientation={playerColor}
              lastMove={lastMove}
              interactive={isPlayerTurn && !gameOver}
              showLegalMoves={true}
            />
          </div>

          {/* White player info */}
          <div
            className={`w-full max-w-[500px] flex items-center justify-between px-4 py-3 rounded-xl mt-2 transition-all ${
              game.turn() === 'w' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100 text-slate-500'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">♔</span>
              <div>
                <p className="font-semibold text-sm">
                  Putih {playerColor === 'white' ? '(Anda)' : '(AI)'}
                </p>
                {whiteCaptured > 0 && (
                  <p className="text-xs opacity-70">Bidak ditangkap: {whiteCaptured}</p>
                )}
              </div>
            </div>
            {game.turn() === 'w' && !gameOver && (
              <span className="text-xs font-semibold animate-pulse">
                {playerColor === 'white' ? 'Giliran Anda' : thinking ? 'AI berpikir...' : ''}
              </span>
            )}
          </div>

          {/* Check indicator */}
          {inCheck && !gameOver && (
            <div className="mt-3 px-4 py-2 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm font-semibold animate-pulse">
              ⚠ Skak! Lindungi raja Anda!
            </div>
          )}

          {/* Game over */}
          {gameOver && (
            <div className="mt-4 w-full max-w-[500px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-center text-white">
              <p className="text-xl font-bold mb-2">{gameOver}</p>
              <button
                onClick={resetGame}
                className="mt-2 px-6 py-2.5 bg-white text-slate-800 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
              >
                Main Lagi
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Controls */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
            <h3 className="font-bold text-slate-800 text-sm">Kontrol Permainan</h3>

            {/* Color selector */}
            <div>
              <p className="text-xs text-slate-500 mb-2">Warna Anda:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setPlayerColor('white');
                    resetGame();
                  }}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    playerColor === 'white'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-slate-50 text-slate-500 border border-slate-200'
                  }`}
                >
                  ♔ Putih
                </button>
                <button
                  onClick={() => {
                    setPlayerColor('black');
                    resetGame();
                  }}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    playerColor === 'black'
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-50 text-slate-500 border border-slate-200'
                  }`}
                >
                  ♚ Hitam
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={getHint}
                disabled={!isPlayerTurn || !!gameOver}
                className="flex-1 px-3 py-2 bg-sky-500 text-white rounded-lg text-sm font-semibold hover:bg-sky-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                💡 Petunjuk
              </button>
              <button
                onClick={undoMove}
                disabled={history.length < 2}
                className="flex-1 px-3 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors disabled:opacity-40"
              >
                ↩ Batal
              </button>
            </div>
            <button
              onClick={resetGame}
              className="w-full px-3 py-2 bg-rose-50 text-rose-600 rounded-lg text-sm font-semibold hover:bg-rose-100 transition-colors"
            >
              Permainan Baru
            </button>
          </div>

          {/* Hint display */}
          {showHint && hintMove && (
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4">
              <p className="text-xs font-semibold text-sky-600 uppercase mb-1">Petunjuk Langkah</p>
              <p className="text-slate-800 font-mono font-semibold">{hintMove}</p>
              <p className="text-xs text-slate-500 mt-1">
                Ini saran langkah terbaik berdasarkan evaluasi posisi.
              </p>
            </div>
          )}

          {/* Move history */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 text-sm mb-3">Riwayat Langkah</h3>
            {history.length === 0 ? (
              <p className="text-slate-400 text-xs">Belum ada langkah.</p>
            ) : (
              <div className="max-h-60 overflow-y-auto space-y-1">
                {Array.from({ length: Math.ceil(history.length / 2) }).map((_, i) => (
                  <div key={i} className="flex gap-2 text-sm font-mono">
                    <span className="text-slate-400 w-6">{i + 1}.</span>
                    <span className="text-slate-700 flex-1">{history[i * 2]}</span>
                    {history[i * 2 + 1] && (
                      <span className="text-slate-700 flex-1">{history[i * 2 + 1]}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tips while playing */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-200 p-5">
            <h3 className="font-bold text-indigo-800 text-sm mb-2">Ingat Saat Bermain</h3>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li>• Pikirkan dulu sebelum bergerak — jangan terburu-buru</li>
              <li>• Cek: apakah bidak saya aman setelah bergerak?</li>
              <li>• Kontrol pusat papan adalah kunci</li>
              <li>• Lakukan rokade untuk melindungi raja</li>
              <li>• Jangan keluarkan ratu terlalu dini</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
