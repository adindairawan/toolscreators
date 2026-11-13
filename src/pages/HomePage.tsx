import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SafeZoneChecker } from '../components/SafeZoneChecker';
import { CarouselSplitter } from '../components/CarouselSplitter';
import { DiscordTimestamp } from '../components/DiscordTimestamp';
import { DimensionsCheatSheet } from '../components/DimensionsCheatSheet';
import { SEOHead } from '../components/SEOHead';
import { Video, Layers, Clock, ArrowRight, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'safezone' | 'carousel' | 'discord'>('safezone');

  return (
    <div className="space-y-24 sm:space-y-32 relative">
      <SEOHead
        title="Creator Studio Pro — Apple-Grade Video & Social Tools"
        description="Engineered for creators and video editors. Pixel-accurate safe zone overlays for TikTok, Instagram Reels, and YouTube Shorts. Panoramic carousel splitter and Discord timestamps. 100% client-side."
        keywords="apple design video tools, tiktok safe zone checker, reels safe zone, shorts safe area, carousel splitter online, discord timestamp generator"
      />

      {/* Apple Ambient Radial Glow Lights */}
      <div className="apple-glow-radial bg-[#2997ff] w-[450px] h-[450px] -top-32 -left-20" />
      <div className="apple-glow-radial bg-[#bf5af2] w-[450px] h-[450px] top-60 -right-20" />

      {/* 1. Apple Hero Section */}
      <section className="relative z-10 text-center max-w-4xl mx-auto pt-10 sm:pt-16 pb-4">
        {/* Apple Pill Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.12] text-[#f5f5f7] text-[11px] font-medium mb-8 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#2997ff]" />
          <span>Introducing Creator Studio • 100% Client-Side Engine</span>
        </div>

        {/* Monumental Apple Headline */}
        <h1 className="text-4xl sm:text-7xl font-extrabold tracking-[-0.035em] text-[#f5f5f7] leading-[1.06] max-w-3xl mx-auto">
          Studio Tools. <br />
          <span className="apple-gradient-hero">
            Engineered for Creators.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-[#86868b] leading-relaxed max-w-2xl mx-auto font-normal">
          Zero server delays. Zero ads. Zero compression. Preview vertical video safe areas, slice panoramic carousels, and generate Discord timecodes directly in your browser memory.
        </p>

        {/* Apple Primary / Secondary Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#studio-workspace"
            className="apple-pill-primary inline-flex items-center gap-2 text-sm px-6 py-2.5 font-medium shadow-lg"
          >
            <span>Launch Studio</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            to="/tiktok-safe-zone"
            className="apple-pill-secondary inline-flex items-center gap-2 text-sm px-6 py-2.5"
          >
            <span>TikTok Safe Zone</span>
          </Link>
        </div>

        {/* Apple Spec Highlights Bar */}
        <div className="mt-14 pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#f5f5f7]">0 ms</div>
            <div className="text-[11px] text-[#86868b] mt-0.5">Upload Latency</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#f5f5f7]">1080 × 1920</div>
            <div className="text-[11px] text-[#86868b] mt-0.5">Pixel-Accurate Canvas</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#f5f5f7]">100% Private</div>
            <div className="text-[11px] text-[#86868b] mt-0.5">Never Leaves Device</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#f5f5f7]">$0 / mo</div>
            <div className="text-[11px] text-[#86868b] mt-0.5">Ad-Free & Unlimited</div>
          </div>
        </div>
      </section>

      {/* 2. Apple Bento Grid Showcase */}
      <section className="relative z-10 space-y-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#86868b]">
            Three Essential Utilities
          </h2>
          <p className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f5f5f7] mt-2">
            Crafted for editors who demand perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Bento Card 1: Safe Zone (Hero Card - Spans 8 cols) */}
          <div className="lg:col-span-8 apple-bento-card p-8 sm:p-10 flex flex-col justify-between overflow-hidden relative group">
            <div className="relative z-10 max-w-md">
              <div className="w-10 h-10 rounded-2xl bg-white/[0.08] border border-white/[0.12] flex items-center justify-center mb-6">
                <Video className="w-5 h-5 text-[#2997ff]" />
              </div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#2997ff]">
                Precision Overlay
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#f5f5f7] mt-1 tracking-tight">
                Multi-Platform Safe Zone Studio.
              </h3>
              <p className="text-xs sm:text-sm text-[#86868b] mt-3 leading-relaxed">
                Check vertical videos against live UI overlays for TikTok FYP, Instagram Reels, and YouTube Shorts. Ensure headlines and faces are never masked by native buttons.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                <Link
                  to="/tiktok-safe-zone"
                  className="px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-[#f5f5f7] border border-white/[0.08] transition-colors"
                >
                  TikTok Guides →
                </Link>
                <Link
                  to="/reels-safe-zone"
                  className="px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-[#f5f5f7] border border-white/[0.08] transition-colors"
                >
                  Instagram Reels →
                </Link>
                <Link
                  to="/shorts-safe-zone"
                  className="px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-[#f5f5f7] border border-white/[0.08] transition-colors"
                >
                  YouTube Shorts →
                </Link>
              </div>
            </div>

            {/* Apple Device Bezel Graphic Simulator in background */}
            <div className="mt-8 lg:mt-0 lg:absolute lg:right-6 lg:bottom-6 w-full lg:w-[320px] aspect-[9/16] max-h-[380px] bg-black/90 rounded-[32px] border-4 border-[#333336] shadow-2xl overflow-hidden pointer-events-none opacity-85 group-hover:scale-105 transition-transform duration-500 flex flex-col justify-between p-4">
              <div className="flex justify-between items-center text-[10px] text-[#86868b]">
                <span>9:41</span>
                <div className="w-16 h-3 bg-white/20 rounded-full" />
                <span>5G 100%</span>
              </div>
              <div className="border border-[#30d158]/60 bg-[#30d158]/10 rounded-xl p-3 text-center my-auto">
                <span className="text-[10px] uppercase font-mono text-[#30d158] font-bold">100% Title Safe Area</span>
              </div>
              <div className="flex justify-between items-end text-[10px] text-white">
                <div className="space-y-1">
                  <div className="w-20 h-2 bg-white/40 rounded" />
                  <div className="w-32 h-2 bg-white/20 rounded" />
                </div>
                <div className="space-y-2 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-white/20" />
                  <div className="w-6 h-6 rounded-full bg-white/20" />
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Carousel Splitter (Spans 4 cols) */}
          <div className="lg:col-span-4 apple-bento-card p-8 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/[0.08] border border-white/[0.12] flex items-center justify-center mb-6">
                <Layers className="w-5 h-5 text-[#bf5af2]" />
              </div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#bf5af2]">
                Seamless Canvas
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#f5f5f7] mt-1 tracking-tight">
                Panoramic Carousel Splitter.
              </h3>
              <p className="text-xs sm:text-sm text-[#86868b] mt-3 leading-relaxed">
                Transform wide panoramic infographics into seamless swipable cards for Instagram & LinkedIn. Auto-detects 4:5 portrait & 1:1 square.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="p-3 bg-white/[0.04] border border-white/[0.08] rounded-2xl flex items-center justify-between text-xs">
                <span className="text-[#86868b]">Output Quality</span>
                <span className="text-[#f5f5f7] font-medium">100% Lossless</span>
              </div>
              <Link
                to="/carousel-splitter"
                className="apple-pill-primary w-full text-center block text-xs py-2.5 font-medium"
              >
                Split a Panorama
              </Link>
            </div>
          </div>

          {/* Bento Card 3: Discord Timestamp Generator (Spans 12 cols full width) */}
          <div className="lg:col-span-12 apple-bento-card p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="w-10 h-10 rounded-2xl bg-white/[0.08] border border-white/[0.12] flex items-center justify-center mb-6">
                <Clock className="w-5 h-5 text-[#ff375f]" />
              </div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#ff375f]">
                Global Time Sync
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#f5f5f7] mt-1 tracking-tight">
                Discord Dynamic Timestamps.
              </h3>
              <p className="text-xs sm:text-sm text-[#86868b] mt-2 leading-relaxed">
                Generate markdown tags that dynamically translate into every server member's personal clock. Supports relative countdowns and full localized dates with zero math required.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <div className="p-3 bg-white/[0.04] border border-white/[0.08] rounded-2xl font-mono text-xs text-[#2997ff] select-all">
                &lt;t:1700000000:R&gt;
              </div>
              <Link
                to="/discord-timestamps"
                className="apple-pill-primary whitespace-nowrap text-xs py-2.5 px-6 font-medium w-full sm:w-auto text-center"
              >
                Generate Code
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Studio Workspace Section */}
      <section id="studio-workspace" className="relative z-10 space-y-6 pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#f5f5f7]">
              Interactive Studio Workspace
            </h2>
            <p className="text-xs text-[#86868b] mt-0.5">
              Live hardware-accelerated preview engine
            </p>
          </div>

          {/* Apple Segmented Switcher Pill */}
          <div className="inline-flex p-1 bg-white/[0.06] border border-white/[0.12] rounded-full backdrop-blur-xl">
            <button
              onClick={() => setActiveTab('safezone')}
              className={`flex items-center gap-2 px-4 py-1.5 text-xs rounded-full transition-all ${
                activeTab === 'safezone'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-[#86868b] hover:text-[#f5f5f7]'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Safe Zone</span>
            </button>
            <button
              onClick={() => setActiveTab('carousel')}
              className={`flex items-center gap-2 px-4 py-1.5 text-xs rounded-full transition-all ${
                activeTab === 'carousel'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-[#86868b] hover:text-[#f5f5f7]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Carousel Splitter</span>
            </button>
            <button
              onClick={() => setActiveTab('discord')}
              className={`flex items-center gap-2 px-4 py-1.5 text-xs rounded-full transition-all ${
                activeTab === 'discord'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-[#86868b] hover:text-[#f5f5f7]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Discord Timestamps</span>
            </button>
          </div>
        </div>

        {/* Live Workspace Container */}
        <div className="apple-glass rounded-[32px] p-6 sm:p-8">
          {activeTab === 'safezone' && <SafeZoneChecker initialPlatform="tiktok" />}
          {activeTab === 'carousel' && <CarouselSplitter />}
          {activeTab === 'discord' && <DiscordTimestamp />}
        </div>
      </section>

      {/* 4. Apple Tech Specs & Dimensions Sheet */}
      <DimensionsCheatSheet />
    </div>
  );
};
