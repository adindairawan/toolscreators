import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SafeZoneChecker } from '../components/SafeZoneChecker';
import { CarouselSplitter } from '../components/CarouselSplitter';
import { DiscordTimestamp } from '../components/DiscordTimestamp';
import { DimensionsCheatSheet } from '../components/DimensionsCheatSheet';
import { SEOHead } from '../components/SEOHead';
import { Video, Layers, Clock, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'safezone' | 'carousel' | 'discord'>('safezone');

  return (
    <div className="space-y-16">
      <SEOHead
        title="Free Video & Social Creator Micro Tools"
        description="Free, ad-free, 100% client-side micro-tool suite for creators. TikTok, Reels & Shorts safe zone previewer, panoramic carousel splitter, and Discord dynamic timestamps."
        keywords="creator tools, tiktok safe zone, reels safe area, youtube shorts overlay, instagram carousel splitter, discord timestamp generator"
      />

      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto pt-6 pb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>100% Client-Side Engine • Zero Upload Wait Time</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Ad-Free Micro Utilities for <br />
          <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">
            Video Editors & Creators
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          No sign-ups, no monthly paywalls, and no pop-ups. Preview vertical video safe areas in real time, slice seamless panoramas into Instagram carousels, and generate Discord timestamp tags in seconds.
        </p>

        {/* Value badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Files never leave your computer</span>
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-purple-400" />
            <span>Export 1080×1920 PNG templates</span>
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-indigo-400" />
            <span>Zero watermark on exported slides</span>
          </span>
        </div>
      </section>

      {/* Quick Jump Tool Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Safe Zone */}
        <div className="group p-6 bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800 hover:border-purple-500/40 rounded-3xl transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="p-3 bg-purple-600/10 text-purple-400 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
              Multi-Platform Safe Zone Previewer
            </h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Verify your TikTok FYP, Instagram Reels, and YouTube Shorts. Check captions and faces against platform UI overlays before rendering.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
            <div className="flex gap-2">
              <Link to="/tiktok-safe-zone" className="text-[11px] text-zinc-400 hover:text-purple-400 font-medium">TikTok</Link>
              <span className="text-zinc-600">•</span>
              <Link to="/reels-safe-zone" className="text-[11px] text-zinc-400 hover:text-purple-400 font-medium">Reels</Link>
              <span className="text-zinc-600">•</span>
              <Link to="/shorts-safe-zone" className="text-[11px] text-zinc-400 hover:text-purple-400 font-medium">Shorts</Link>
            </div>
            <Link
              to="/tiktok-safe-zone"
              className="text-xs font-semibold text-purple-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            >
              <span>Launch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Card 2: Carousel Splitter */}
        <div className="group p-6 bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800 hover:border-purple-500/40 rounded-3xl transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="p-3 bg-indigo-600/10 text-indigo-400 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
              Seamless Carousel Splitter
            </h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Cut panoramic banners and wide infographics into seamless 4:5 portrait (1080×1350) or 1:1 square cards with 1-click ZIP bundle.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
            <span className="text-[11px] text-zinc-500 font-mono">Auto 2–10 Slides</span>
            <Link
              to="/carousel-splitter"
              className="text-xs font-semibold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            >
              <span>Launch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Card 3: Discord Timestamps */}
        <div className="group p-6 bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800 hover:border-purple-500/40 rounded-3xl transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="p-3 bg-pink-600/10 text-pink-400 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-pink-300 transition-colors">
              Discord Dynamic Timestamps
            </h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Generate countdown tags (&lt;t:timestamp:R&gt;) that automatically adjust to every community member's local timezone.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
            <span className="text-[11px] text-zinc-500 font-mono">Live Bubble Preview</span>
            <Link
              to="/discord-timestamps"
              className="text-xs font-semibold text-pink-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            >
              <span>Launch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Tool Playground Container */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Instant Tool Workspace</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Test any utility right here without leaving the page</p>
          </div>

          <div className="inline-flex p-1 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <button
              onClick={() => setActiveTab('safezone')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'safezone'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Safe Zone</span>
            </button>
            <button
              onClick={() => setActiveTab('carousel')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
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
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
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

        <div className="p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-3xl">
          {activeTab === 'safezone' && <SafeZoneChecker initialPlatform="tiktok" />}
          {activeTab === 'carousel' && <CarouselSplitter />}
          {activeTab === 'discord' && <DiscordTimestamp />}
        </div>
      </section>

      {/* Dimension Cheat Sheet & SEO FAQs */}
      <DimensionsCheatSheet />
    </div>
  );
};
