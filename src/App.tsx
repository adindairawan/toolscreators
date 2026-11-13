import React, { useState } from 'react';
import { SafeZoneChecker } from './components/SafeZoneChecker';
import { CarouselSplitter } from './components/CarouselSplitter';
import { DiscordTimestamp } from './components/DiscordTimestamp';
import { DimensionsCheatSheet } from './components/DimensionsCheatSheet';
import { ShieldCheck, Video, Layers, Clock, Sparkles } from 'lucide-react';

type ActiveTab = 'safezone' | 'carousel' | 'discord';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('safezone');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-850 border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-600/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white flex items-center gap-2">
                Creator & Social Tools
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">
                  100% Client-Side
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-800/40 px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero Uploads • Privacy First</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Fast, Free & Ad-Free Micro Tools for Video Creators
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Zero server uploads, zero wait times, zero paywalls. Pixel-accurate safe zone overlays, carousel splitter & dynamic Discord tags.
          </p>
        </div>

        {/* Tab Selection Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
            <button
              onClick={() => setActiveTab('safezone')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'safezone'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Safe Zone Previewer</span>
            </button>

            <button
              onClick={() => setActiveTab('carousel')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'carousel'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Carousel Splitter</span>
            </button>

            <button
              onClick={() => setActiveTab('discord')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'discord'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Discord Timestamps</span>
            </button>
          </div>
        </div>

        {/* Active Tool View */}
        <div>
          {activeTab === 'safezone' && <SafeZoneChecker />}
          {activeTab === 'carousel' && <CarouselSplitter />}
          {activeTab === 'discord' && <DiscordTimestamp />}
        </div>

        {/* Dimensions Cheat Sheet & FAQ (Milestone 4 & SEO) */}
        <DimensionsCheatSheet />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 py-8 bg-zinc-950/60 text-center text-xs text-zinc-500">
        <p>100% Client-Side Creator Tools • Open Source • No Cookies or Tracking</p>
      </footer>
    </div>
  );
};

export default App;
