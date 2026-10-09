import { useState, useCallback, useMemo } from 'react';
import { Chess } from 'chess.js';
import ChessBoard from '@/components/chess/ChessBoard';
import {
  STRATEGY_GROUPS,
  OPPONENT_RESPONSE_TIPS,
  SITUATION_CHECKLIST,
  FAMOUS_OPENINGS,
} from '@/data/strategies';

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
  emerald: {
    bg: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    iconBg: 'bg-emerald-600',
  },
  amber: {
    bg: 'from-amber-50 to-orange-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    iconBg: 'bg-amber-600',
  },
  rose: {
    bg: 'from-rose-50 to-pink-50',
    border: 'border-rose-200',
    text: 'text-rose-700',
    iconBg: 'bg-rose-600',
  },
};

const CHECKLIST_COLOR_MAP: Record<
  string,
  { bg: string; border: string; text: string; chip: string }
> = {
  red: {
    bg: 'from-red-50 to-rose-50',
    border: 'border-red-200',
    text: 'text-red-700',
    chip: 'bg-red-100 text-red-600',
  },
  amber: {
    bg: 'from-amber-50 to-yellow-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    chip: 'bg-amber-100 text-amber-600',
  },
  blue: {
    bg: 'from-blue-50 to-sky-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    chip: 'bg-blue-100 text-blue-600',
  },
  emerald: {
    bg: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    chip: 'bg-emerald-100 text-emerald-600',
  },
  rose: {
    bg: 'from-rose-50 to-pink-50',
    border: 'border-rose-200',
    text: 'text-rose-700',
    chip: 'bg-rose-100 text-rose-600',
  },
  violet: {
    bg: 'from-violet-50 to-purple-50',
    border: 'border-violet-200',
    text: 'text-violet-700',
    chip: 'bg-violet-100 text-violet-600',
  },
};

const DIFFICULTY_COLOR: Record<string, string> = {
  Pemula: 'bg-emerald-100 text-emerald-700',
  Menengah: 'bg-amber-100 text-amber-700',
  Lanjutan: 'bg-rose-100 text-rose-700',
};

export default function StrategyView() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [expandedItem, setExpandedItem] = useState<number | null>(0);
  const [expandedTip, setExpandedTip] = useState<number | null>(null);
  const [selectedOpening, setSelectedOpening] = useState(0);
  const [openingStep, setOpeningStep] = useState(0);

  const openingGame = useMemo(() => {
    const opening = FAMOUS_OPENINGS[selectedOpening];
    const game = new Chess();
    for (let i = 0; i < openingStep && i < opening.moves.length; i++) {
      try {
        game.move(opening.moves[i]);
      } catch {
        break;
      }
    }
    return game;
  }, [selectedOpening, openingStep]);

  const openingLastMove = useMemo(() => {
    const verbose = openingGame.history({ verbose: true });
    if (verbose.length === 0) return null;
    const last = verbose[verbose.length - 1];
    return { from: last.from, to: last.to };
  }, [openingGame]);

  const openingMoveCount = openingStep;

  const handleOpeningSelect = (idx: number) => {
    setSelectedOpening(idx);
    setOpeningStep(0);
  };

  const stepForward = () => {
    const opening = FAMOUS_OPENINGS[selectedOpening];
    if (openingStep < opening.moves.length) {
      setOpeningStep(openingStep + 1);
    }
  };

  const stepBackward = () => {
    if (openingStep > 0) setOpeningStep(openingStep - 1);
  };

  const handleOpeningMove = useCallback(() => false, []);

  const opening = FAMOUS_OPENINGS[selectedOpening];

  return (
    <div className="space-y-10">
      {/* ─── Strategy phases ─── */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Strategi Catur</h2>
        <p className="text-slate-500 mb-5">
          Pelajari strategi untuk setiap fase permainan: pembukaan, tengah, dan akhir.
        </p>

        {/* Phase tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {STRATEGY_GROUPS.map((group, i) => {
            const colors = COLOR_MAP[group.color];
            const isActive = activeGroup === i;
            return (
              <button
                key={group.id}
                onClick={() => {
                  setActiveGroup(i);
                  setExpandedItem(0);
                }}
                className={`
                  px-5 py-2.5 rounded-xl font-semibold text-sm transition-all
                  ${
                    isActive
                      ? `${colors.iconBg} text-white shadow-md`
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }
                `}
              >
                {group.title}
              </button>
            );
          })}
        </div>

        {/* Active strategy group */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Strategy items list */}
          <div className="lg:col-span-2 space-y-3">
            {STRATEGY_GROUPS[activeGroup].items.map((item, i) => {
              const isOpen = expandedItem === i;
              return (
                <div
                  key={i}
                  className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                    isOpen ? 'border-slate-300 shadow-md' : 'border-slate-200'
                  }`}
                >
                  <button
                    onClick={() => setExpandedItem(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 p-5 text-left"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="flex-1 font-semibold text-slate-800">{item.title}</span>
                    <span className={`text-slate-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}>
                      ›
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pl-17 space-y-3">
                      <p className="text-slate-700 text-sm leading-relaxed pl-12">{item.content}</p>
                      {item.example && (
                        <div className="ml-12 bg-slate-50 border border-slate-200 rounded-lg p-3">
                          <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                            Contoh
                          </p>
                          <p className="text-slate-600 text-sm font-mono">{item.example}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Description sidebar */}
          <div
            className={`bg-gradient-to-br ${COLOR_MAP[STRATEGY_GROUPS[activeGroup].color].bg} rounded-2xl border ${COLOR_MAP[STRATEGY_GROUPS[activeGroup].color].border} p-6 h-fit sticky top-4`}
          >
            <h3 className={`font-bold ${COLOR_MAP[STRATEGY_GROUPS[activeGroup].color].text} mb-2`}>
              {STRATEGY_GROUPS[activeGroup].title}
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              {STRATEGY_GROUPS[activeGroup].description}
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200/60">
              <p className="text-xs font-semibold text-slate-500 uppercase mb-1">
                Jumlah Prinsip
              </p>
              <p className={`text-3xl font-bold ${COLOR_MAP[STRATEGY_GROUPS[activeGroup].color].text}`}>
                {STRATEGY_GROUPS[activeGroup].items.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Situation reading checklist ─── */}
      <div>
        <div className="bg-gradient-to-r from-indigo-800 to-indigo-900 rounded-2xl p-6 text-white mb-6">
          <h2 className="text-2xl font-bold mb-1">Cara Membaca Situasi & Menentukan Langkah</h2>
          <p className="text-indigo-200 text-sm">
            Sebelum Anda bergerak, jalankan checklist ini secara mental. Enam kategori ini membantu
            Anda membaca papan, menemukan ancaman, dan memilih langkah terbaik setiap giliran.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SITUATION_CHECKLIST.map((checklist, i) => {
            const colors = CHECKLIST_COLOR_MAP[checklist.color] || CHECKLIST_COLOR_MAP.blue;
            return (
              <div
                key={i}
                className={`bg-gradient-to-br ${colors.bg} rounded-2xl border ${colors.border} p-5`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${colors.chip}`}>
                    {i + 1}
                  </span>
                  <h3 className={`font-bold text-sm ${colors.text}`}>{checklist.category}</h3>
                </div>
                <ul className="space-y-2 mb-3">
                  {checklist.questions.map((q, j) => (
                    <li key={j} className="flex gap-2 text-slate-700 text-xs leading-relaxed">
                      <span className={`flex-shrink-0 ${colors.text} font-bold`}>?</span>
                      {q}
                    </li>
                  ))}
                </ul>
                <div className="bg-white/70 rounded-lg p-3 border border-slate-200/60">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Tindakan</p>
                  <p className="text-slate-700 text-xs leading-relaxed">{checklist.action}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick reference: how to choose your next move */}
        <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 mb-4">Langkah Berpikir Setiap Giliran</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { step: '1', label: 'Apa yang baru saja lawan lakukan?', detail: 'Pahami niat langkah lawan' },
              { step: '2', label: 'Ada ancaman langsung?', detail: 'Cek skak, bidak terancam, skakmat' },
              { step: '3', label: 'Apa kelemahan lawan?', detail: 'Pion lemah, bidak tanpa pengawal' },
              { step: '4', label: 'Bidak mana yang bisa saya improve?', detail: 'Pindahkan bidak pasif ke aktif' },
              { step: '5', label: 'Hitung langkah sebelum bergerak', detail: 'Cek 2-3 langkah ke depan' },
              { step: '6', label: 'Setelah bergerak, cek: amankah posisinya?', detail: 'Jangan tinggalkan bidak menggantung' },
            ].map((item) => (
              <div
                key={item.step}
                className="flex-1 min-w-[200px] bg-slate-50 rounded-xl p-4 border border-slate-200"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                  <span className="font-semibold text-sm text-slate-800">{item.label}</span>
                </div>
                <p className="text-xs text-slate-500 pl-8">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Famous openings ─── */}
      <div>
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white mb-6">
          <h2 className="text-2xl font-bold mb-1">Pembukaan Terkenal</h2>
          <p className="text-slate-300 text-sm">
            Pelajari pembukaan paling terkenal dalam sejarah catur. Lihat langkah-langkahnya
            langsung di papan, pahami ide kuncinya, dan kenali variasinya. Pilih pembukaan lalu
            tekan tombol untuk melihat langkah demi langkah.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* Opening selector + details */}
          <div className="space-y-5">
            {/* Opening cards */}
            <div className="grid sm:grid-cols-2 gap-3">
              {FAMOUS_OPENINGS.map((op, i) => {
                const isActive = selectedOpening === i;
                const colors = CHECKLIST_COLOR_MAP[op.color] || CHECKLIST_COLOR_MAP.blue;
                return (
                  <button
                    key={op.id}
                    onClick={() => handleOpeningSelect(i)}
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      isActive
                        ? `${colors.border} bg-gradient-to-br ${colors.bg} shadow-md ring-2 ring-offset-2 ring-indigo-400`
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-bold text-sm text-slate-800">{op.name}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${DIFFICULTY_COLOR[op.difficulty]}`}>
                        {op.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{op.indonesianName}</p>
                    <div className="flex items-center gap-1 text-xs font-mono text-slate-600">
                      {op.moves.map((m, j) => (
                        <span key={j} className="px-1.5 py-0.5 bg-slate-100 rounded">
                          {j % 2 === 0 ? `${Math.floor(j / 2) + 1}.` : ''} {m}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected opening details */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{opening.indonesianName}</h3>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${DIFFICULTY_COLOR[opening.difficulty]} mt-1 inline-block`}>
                  Level: {opening.difficulty}
                </span>
              </div>

              <p className="text-slate-700 text-sm leading-relaxed">{opening.description}</p>

              {/* Key ideas */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-200 p-4">
                <h4 className="text-sm font-bold text-indigo-700 uppercase tracking-wide mb-2">
                  Ide Kunci
                </h4>
                <ul className="space-y-1.5">
                  {opening.keyIdeas.map((idea, j) => (
                    <li key={j} className="flex gap-2 text-slate-700 text-sm leading-relaxed">
                      <span className="flex-shrink-0 w-5 h-5 rounded bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center mt-0.5">
                        {j + 1}
                      </span>
                      {idea}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Variations */}
              <div>
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">
                  Variasi Terkenal
                </h4>
                <div className="space-y-1.5">
                  {opening.variations.map((variation, j) => (
                    <div
                      key={j}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                    >
                      <p className="text-slate-700 text-xs font-mono leading-relaxed">{variation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive board showing opening moves */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-slate-800 text-sm">Papan Interaktif</h4>
                <span className="text-xs text-slate-500">
                  Langkah {openingMoveCount} / {opening.moves.length}
                </span>
              </div>

              <div
                className="flex justify-center mb-4"
                style={{ '--sq': '42px' } as React.CSSProperties}
              >
                <ChessBoard
                  game={openingGame}
                  onMove={handleOpeningMove}
                  lastMove={openingLastMove}
                  interactive={false}
                  showLegalMoves={false}
                  showCoordinates={true}
                />
              </div>

              {/* Step controls */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <button
                  onClick={stepBackward}
                  disabled={openingStep === 0}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors disabled:opacity-30"
                >
                  ‹ Mundur
                </button>
                <button
                  onClick={() => setOpeningStep(0)}
                  className="px-3 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors"
                >
                  Awal
                </button>
                <button
                  onClick={stepForward}
                  disabled={openingStep >= opening.moves.length}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-30"
                >
                  Maju ›
                </button>
              </div>

              {/* Move list */}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-400 uppercase mb-2">
                  Urutan Langkah
                </p>
                {opening.moves.map((move, i) => {
                  const moveNum = Math.floor(i / 2) + 1;
                  const isWhite = i % 2 === 0;
                  const isPlayed = i < openingStep;
                  const isCurrent = i === openingStep - 1;
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm font-mono transition-all ${
                        isCurrent
                          ? 'bg-indigo-100 text-indigo-800 font-bold'
                          : isPlayed
                          ? 'text-slate-700'
                          : 'text-slate-400'
                      }`}
                    >
                      <span className="text-slate-400 text-xs w-6">{moveNum}.</span>
                      <span className="text-xs text-slate-400 w-4">{isWhite ? '♔' : '♚'}</span>
                      <span>{move}</span>
                      {isCurrent && (
                        <span className="ml-auto text-xs text-indigo-500">← sekarang</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Tip */}
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs text-amber-800 leading-relaxed">
                  Tekan <strong>Maju</strong> untuk melihat setiap langkah dimainkan di papan.
                  Perhatikan bagaimana bidak bergerak dan mengapa. Lalu coba di mode Main!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Opponent response tips ─── */}
      <div>
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white mb-6">
          <h2 className="text-2xl font-bold mb-1">Tips Menghadapi Gerakan Lawan</h2>
          <p className="text-slate-300 text-sm">
            Setiap kali lawan bergerak, gunakan panduan ini untuk membaca ancaman dan merespons
            dengan benar. Klik setiap situasi untuk melihat cara menghadapinya.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {OPPONENT_RESPONSE_TIPS.map((tip, i) => {
            const isOpen = expandedTip === i;
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                  isOpen ? 'border-sky-300 shadow-md' : 'border-slate-200'
                }`}
              >
                <button
                  onClick={() => setExpandedTip(isOpen ? null : i)}
                  className="w-full flex items-start gap-3 p-5 text-left"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 text-sm">{tip.situation}</p>
                    <p className="text-xs text-red-500 mt-1">⚠ {tip.threat}</p>
                  </div>
                  <span className={`text-slate-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}>
                    ›
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 space-y-3">
                    <div className="pl-10 space-y-2">
                      {tip.response.map((r, j) => (
                        <div key={j} className="flex gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center mt-0.5">
                            {j + 1}
                          </span>
                          <p className="text-slate-700 text-sm leading-relaxed">{r}</p>
                        </div>
                      ))}
                    </div>
                    <div className="ml-10 bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <p className="text-xs font-semibold text-amber-600 uppercase mb-1">
                        Tips Penting
                      </p>
                      <p className="text-amber-800 text-sm leading-relaxed">{tip.tip}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
