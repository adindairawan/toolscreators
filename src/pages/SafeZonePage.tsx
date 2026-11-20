import React from 'react';
import { SafeZoneChecker, type Platform } from '../components/SafeZoneChecker';
import { DimensionsCheatSheet } from '../components/DimensionsCheatSheet';
import { SEOHead } from '../components/SEOHead';
import { CheckCircle2, AlertTriangle, Shield } from 'lucide-react';

interface SafeZonePageProps {
  platform: Platform;
}

const METAS: Record<Platform, { title: string; desc: string; keywords: string; eyebrow: string; h1: string }> = {
  tiktok: {
    title: 'TikTok Safe Zone Checker & Overlay Guide (1080x1920 FYP)',
    desc: 'Free client-side TikTok Safe Zone Checker. Preview FYP buttons, captions, and sound ticker overlays on your 9:16 vertical videos. Export transparent PNG guides for CapCut & Premiere.',
    keywords: 'tiktok safe zone checker, tiktok safe area, tiktok 1080x1920 overlay, tiktok safe zone template capcut, tiktok text safe zone',
    eyebrow: 'TikTok FYP Safe Zone',
    h1: 'TikTok Safe Zone Studio.',
  },
  story: {
    title: 'Instagram Story Safe Zone Checker & Template (1080x1920)',
    desc: 'Free client-side Instagram Story Safe Zone checker. Prevent top progress segment bars, username header, and bottom Send Message reply pills from covering your text or stickers.',
    keywords: 'instagram story safe zone, instagram story template 1080x1920, story safe area dimensions, story safe margin png capcut',
    eyebrow: 'Instagram Story & Highlights',
    h1: 'Instagram Story Studio.',
  },
  reels: {
    title: 'Instagram Reels Safe Zone Overlay & Previewer (9:16)',
    desc: 'Ensure your captions, face, and CTAs are never blocked by Instagram Reels buttons, header, or audio info. Instant client-side video preview and transparent overlay PNG export.',
    keywords: 'instagram reels safe zone, reels safe area template, instagram 9:16 safe margin, reels caption safe zone premiere',
    eyebrow: 'Instagram Reels Safe Zone',
    h1: 'Instagram Reels Studio.',
  },
  shorts: {
    title: 'YouTube Shorts Safe Zone Guide & Overlay Checker',
    desc: 'Accurate YouTube Shorts safe zone overlay previewer. Prevent subscribe buttons, channel names, and descriptions from blocking your video content. Zero server uploads.',
    keywords: 'youtube shorts safe zone guide, shorts safe area overlay, youtube shorts 1080x1920 dimensions template, shorts text safe area',
    eyebrow: 'YouTube Shorts Safe Zone',
    h1: 'YouTube Shorts Studio.',
  },
};

export const SafeZonePage: React.FC<SafeZonePageProps> = ({ platform }) => {
  const meta = METAS[platform];

  return (
    <div className="space-y-24 sm:space-y-28 relative max-w-6xl mx-auto">
      <SEOHead title={meta.title} description={meta.desc} keywords={meta.keywords} />

      {/* Apple HIG Header */}
      <section className="text-center max-w-3xl mx-auto pt-8 sm:pt-14 pb-2">
        <p className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-[#86868b] mb-3">
          {meta.eyebrow}
        </p>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-[-0.035em] text-[#f5f5f7] leading-[1.08]">
          <span className="apple-gradient-hero">{meta.h1}</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[#86868b] leading-relaxed max-w-2xl mx-auto font-normal">
          Preview platform UI overlays directly against your vertical video. Keep captions, hooks, and faces inside verified bounds with zero server latency.
        </p>

        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-[#30d158] bg-white/[0.04] border border-white/[0.08] px-3.5 py-1.5 rounded-full w-fit mx-auto">
          <Shield className="w-3.5 h-3.5" />
          <span>100% On-Device WebGL & Canvas Engine</span>
        </div>
      </section>

      {/* Tool Component */}
      <div className="apple-glass rounded-[24px] p-6 sm:p-8">
        <SafeZoneChecker initialPlatform={platform} />
      </div>

      {/* Deep Dive Content for Editors & SEO */}
      <section className="apple-bento-card p-8 sm:p-12 space-y-8">
        <div className="border-b border-white/[0.08] pb-6">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#2997ff]">
            Editorial Best Practices
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#f5f5f7] tracking-tight mt-1">
            Why Safe Zones Matter for Viral Short-Form Content
          </h2>
          <p className="text-xs sm:text-sm text-[#86868b] mt-2">
            Standard 9:16 viewports require careful margin planning to avoid native interface occlusion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#86868b] leading-relaxed">
          <div className="space-y-4 p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
            <h3 className="font-semibold text-[#f5f5f7] flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-[#ff9f0a]" />
              The Danger Margins
            </h3>
            <p>
              When viewers watch on {platform === 'tiktok' ? 'TikTok' : platform === 'story' ? 'Instagram Stories' : platform === 'reels' ? 'Instagram Reels' : 'YouTube Shorts'}, the native application overlays interactive elements across the video viewport:
            </p>

            {platform === 'story' ? (
              <ul className="space-y-2 text-[#f5f5f7] font-sans">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff9f0a] mt-1.5 shrink-0" />
                  <span><strong>Top Segment Bars & Header (250px):</strong> Story progress dashes, account avatar, timestamp, and close button. Never place titles or stickers here.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff9f0a] mt-1.5 shrink-0" />
                  <span><strong>Bottom Reply Pill (280px):</strong> Floating "Send message" text input, heart reaction, and share paper plane.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff9f0a] mt-1.5 shrink-0" />
                  <span><strong>Left & Right Tap Navigation Zones (65px):</strong> Tapping the screen edges advances or rewinds stories; avoid interactive poll stickers or links on screen edges.</span>
                </li>
              </ul>
            ) : (
              <ul className="space-y-2 text-[#f5f5f7] font-sans">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff9f0a] mt-1.5 shrink-0" />
                  <span><strong>Top Header (120–160px):</strong> Live indicator, search icon, and FYP/Following navigation bar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff9f0a] mt-1.5 shrink-0" />
                  <span><strong>Right Side Rail (140–160px):</strong> Profile badge, like, comment, bookmark, and share controls.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff9f0a] mt-1.5 shrink-0" />
                  <span><strong>Bottom Drawer (320–400px):</strong> Creator handle, expandable caption drawer, sound ticker, and progress scrubber.</span>
                </li>
              </ul>
            )}
          </div>

          <div className="space-y-4 p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
            <h3 className="font-semibold text-[#f5f5f7] flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#30d158]" />
              Editor Checklist (CapCut, Premiere, FCPX)
            </h3>
            <ul className="space-y-2 text-[#f5f5f7] font-sans">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#30d158] mt-1.5 shrink-0" />
                <span>Keep all primary subtitles, title cards, and callouts centered inside the inner safe rectangle.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#30d158] mt-1.5 shrink-0" />
                <span>Ensure subject faces are framed with at least 15% breathing room from the right-hand action column.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#30d158] mt-1.5 shrink-0" />
                <span>Export the 1080×1920 PNG guide template and place it on top of your timeline before rendering.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <DimensionsCheatSheet />
    </div>
  );
};
