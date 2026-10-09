import { useState } from 'react';
import { Castle, BookOpen, Brain, Swords } from 'lucide-react';
import LearnView from '@/views/LearnView';
import StrategyView from '@/views/StrategyView';
import PlayView from '@/views/PlayView';

type Tab = 'learn' | 'strategy' | 'play';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('learn');

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <Castle className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <h1 className="text-lg font-bold leading-tight">CaturKu</h1>
                <p className="text-xs text-slate-400 leading-tight">Belajar Catur Interaktif</p>
              </div>
            </div>

            {/* Nav tabs */}
            <nav className="flex gap-1">
              {(
                [
                  { id: 'learn', label: 'Belajar', icon: BookOpen },
                  { id: 'strategy', label: 'Strategi', icon: Brain },
                  { id: 'play', label: 'Main', icon: Swords },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                      isActive
                        ? 'bg-white/15 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'learn' && <LearnView />}
        {activeTab === 'strategy' && <StrategyView />}
        {activeTab === 'play' && <PlayView />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Castle className="w-5 h-5 text-amber-500" />
            <span className="font-semibold text-slate-300">CaturKu</span>
          </div>
          <p className="text-sm">
            Belajar catur dari nol — pengenalan bidak, strategi, dan praktek langsung bermain.
          </p>
          <p className="text-xs mt-3 text-slate-500">
            Dibuat dengan chess.js untuk validasi langkah yang akurat
          </p>
        </div>
      </footer>
    </div>
  );
}
