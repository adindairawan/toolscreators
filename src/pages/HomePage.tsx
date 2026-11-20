import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SafeZoneChecker } from '../components/SafeZoneChecker';
import { CarouselSplitter } from '../components/CarouselSplitter';
import { DiscordTimestamp } from '../components/DiscordTimestamp';
import { DimensionsCheatSheet } from '../components/DimensionsCheatSheet';
import { SEOHead } from '../components/SEOHead';
import { Video, Layers, Clock, ChevronRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'safezone' | 'carousel' | 'discord'>('safezone');

  return (
    <div className="space-y-24 sm:space-y-32 relative max-w-6xl mx-auto">
      <SEOHead
        title="Creator Studio — Professional Social Video & Image Utilities"
        description="Designed with Apple clarity. Pixel-accurate safe zone overlays for TikTok, Instagram Reels, and YouTube Shorts. Panoramic carousel splitter and Discord timestamps. 100% on-device."
        keywords="apple design video tools, tiktok safe zone checker, reels safe zone, shorts safe area, carousel splitter online, discord timestamp generator"
      />

      {/* 1. Apple Hero Section */}
      <section className="relative z-10 text-center max-w-4xl mx-auto pt-12 sm:pt-20 pb-4">
        {/* Apple HIG Eyebrow */}
        <p className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-[#86868b] mb-4">
          Creator Studio Pro
        </p>

        {/* Monumental Apple Headline */}
        <h1 className="text-4xl sm:text-7xl font-semibold tracking-[-0.035em] text-[#f5f5f7] leading-[1.08] max-w-3xl mx-auto">
          Pixel perfection. <br />
          <span className="apple-gradient-hero">
            Zero server uploads.
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-xl text-[#86868b] leading-relaxed max-w-2xl mx-auto font-normal">
          A focused suite of micro-tools designed for video editors and social managers. Preview safe zones, split panoramas, and format timecodes with native browser performance.
        </p>

        {/* Apple Primary / Secondary Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#studio-workspace"
            className="apple-btn-blue inline-flex items-center gap-1.5"
          >
            <span>Open Studio</span>
            <ChevronRight className="w-4 h-4" />
          </a>
          <Link
            to="/story-safe-zone"
            className="apple-pill-secondary inline-flex items-center gap-1.5 border-[#30d158]/30 hover:border-[#30d158]/60"
          >
            <span className="text-[#30d158] font-semibold">Story Safe Zone</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#30d158]/20 text-[#30d158] font-bold">NEW</span>
          </Link>
          <Link
            to="/tiktok-safe-zone"
            className="apple-pill-secondary inline-flex items-center gap-1.5"
          >
            <span>TikTok Safe Zone</span>
          </Link>
        </div>

        {/* Apple Spec Highlights Bar */}
        <div className="mt-16 pt-10 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#f5f5f7]">0 ms</div>
            <div className="text-xs text-[#86868b] mt-1">Upload Latency</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#f5f5f7]">1080 × 1920</div>
            <div className="text-xs text-[#86868b] mt-1">Native Short-Form Canvas</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#f5f5f7]">On-Device</div>
            <div className="text-xs text-[#86868b] mt-1">100% Private Memory</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#f5f5f7]">Ad-Free</div>
            <div className="text-xs text-[#86868b] mt-1">No Subscription Gates</div>
          </div>
        </div>
      </section>

      {/* 2. Apple Bento Grid Showcase */}
      <section className="relative z-10 space-y-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-xs uppercase tracking-[0.12em] font-semibold text-[#86868b]">
            Three Essential Utilities
          </h2>
          <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#f5f5f7] mt-1.5">
            Everything you need. Nothing you don't.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Bento Card 1: Safe Zone (Hero Card - Spans 8 cols) */}
          <div className="lg:col-span-8 apple-bento-card p-8 sm:p-10 flex flex-col justify-between overflow-hidden relative group">
            <div className="relative z-10 max-w-md">
              <div className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/[0.1] flex items-center justify-center mb-6">
                <Video className="w-5 h-5 text-[#2997ff]" />
              </div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#2997ff]">
                Precision Overlay
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#f5f5f7] mt-1 tracking-tight">
                Multi-Platform Safe Zone Studio.
              </h3>
              <p className="text-xs sm:text-sm text-[#86868b] mt-3 leading-relaxed">
                Check vertical videos against native UI overlays for TikTok FYP, Instagram Reels, and YouTube Shorts. Verify that titles and faces avoid interactive platform elements.
              </p>

              <div className="mt-8 flex flex-wrap gap-2 text-xs">
                <Link
                  to="/story-safe-zone"
                  className="px-3 py-1.5 rounded-full bg-[#30d158]/10 hover:bg-[#30d158]/20 text-[#30d158] border border-[#30d158]/30 transition-colors flex items-center gap-1 font-medium"
                >
                  <span>Instagram Story</span>
                  <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-[#30d158]/20 font-bold">New</span>
                </Link>
                <Link
                  to="/reels-safe-zone"
                  className="px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#f5f5f7] border border-white/[0.08] transition-colors"
                >
                  Instagram Reels
                </Link>
                <Link
                  to="/tiktok-safe-zone"
                  className="px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#f5f5f7] border border-white/[0.08] transition-colors"
                >
                  TikTok Guides
                </Link>
                <Link
                  to="/shorts-safe-zone"
                  className="px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#f5f5f7] border border-white/[0.08] transition-colors"
                >
                  YouTube Shorts
                </Link>
              </div>
            </div>

            {/* Apple Device Bezel Graphic Simulator in background */}
            <div className="mt-8 lg:mt-0 lg:absolute lg:right-8 lg:bottom-8 w-full lg:w-[300px] aspect-[9/16] max-h-[360px] bg-black rounded-[36px] border-[3px] border-[#2c2c2e] shadow-2xl overflow-hidden pointer-events-none opacity-85 group-hover:scale-105 transition-transform duration-500 flex flex-col justify-between p-4">
              <div className="flex justify-between items-center text-[10px] text-[#86868b]">
                <span>9:41</span>
                <div className="w-16 h-3 bg-white/20 rounded-full" />
                <span>5G 100%</span>
              </div>
              <div className="border border-[#30d158]/70 bg-[#30d158]/10 rounded-xl p-3 text-center my-auto">
                <span className="text-[10px] uppercase font-mono text-[#30d158] font-semibold">100% Safe Zone</span>
              </div>
              <div className="flex justify-between items-end text-[10px] text-white">
                <div className="space-y-1">
                  <div className="w-16 h-2 bg-white/30 rounded" />
                  <div className="w-24 h-2 bg-white/15 rounded" />
                </div>
                <div className="space-y-2 flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full bg-white/20" />
                  <div className="w-5 h-5 rounded-full bg-white/20" />
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Carousel Splitter (Spans 4 cols) */}
          <div className="lg:col-span-4 apple-bento-card p-8 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/[0.1] flex items-center justify-center mb-6">
                <Layers className="w-5 h-5 text-[#2997ff]" />
              </div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#2997ff]">
                Seamless Canvas & Story Slices
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#f5f5f7] mt-1 tracking-tight">
                Panoramic Carousel & Story Splitter.
              </h3>
              <p className="text-xs sm:text-sm text-[#86868b] mt-3 leading-relaxed">
                Transform wide panoramic infographics into seamless swipable cards or vertical Story collections (9:16). Supports 9:16 Story, 4:5 portrait & 1:1 square.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <div className="p-3 bg-white/[0.04] border border-white/[0.08] rounded-xl flex items-center justify-between text-xs">
                <span className="text-[#86868b]">Output Quality</span>
                <span className="text-[#f5f5f7] font-medium">100% Lossless</span>
              </div>
              <Link
                to="/carousel-splitter"
                className="apple-btn-blue w-full text-center block text-xs py-2.5 font-medium"
              >
                Split a Panorama
              </Link>
            </div>
          </div>

          {/* Bento Card 3: Discord Timestamp Generator (Spans 12 cols full width) */}
          <div className="lg:col-span-12 apple-bento-card p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/[0.1] flex items-center justify-center mb-6">
                <Clock className="w-5 h-5 text-[#2997ff]" />
              </div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#2997ff]">
                Global Time Sync
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#f5f5f7] mt-1 tracking-tight">
                Discord Dynamic Timestamps.
              </h3>
              <p className="text-xs sm:text-sm text-[#86868b] mt-2 leading-relaxed">
                Generate markdown tags that dynamically adjust to each member's personal device timezone. Clean relative countdowns and localized dates with zero manual conversion.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <div className="p-3 bg-white/[0.04] border border-white/[0.08] rounded-xl font-mono text-xs text-[#2997ff] select-all">
                &lt;t:1700000000:R&gt;
              </div>
              <Link
                to="/discord-timestamps"
                className="apple-btn-blue whitespace-nowrap text-xs py-2.5 px-6 font-medium w-full sm:w-auto text-center"
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
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#f5f5f7]">
              Interactive Studio Workspace
            </h2>
            <p className="text-xs text-[#86868b] mt-0.5">
              Live hardware-accelerated preview engine
            </p>
          </div>

          {/* Apple Segmented Switcher Pill */}
          <div className="inline-flex p-1 bg-white/[0.06] border border-white/[0.1] rounded-full backdrop-blur-xl">
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
        <div className="apple-glass rounded-[24px] p-6 sm:p-8">
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
