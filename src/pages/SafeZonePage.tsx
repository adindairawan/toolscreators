import React from 'react';
import { SafeZoneChecker, type Platform } from '../components/SafeZoneChecker';
import { DimensionsCheatSheet } from '../components/DimensionsCheatSheet';
import { SEOHead } from '../components/SEOHead';
import { CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface SafeZonePageProps {
  platform: Platform;
}

const METAS: Record<Platform, { title: string; desc: string; keywords: string; h1: string }> = {
  tiktok: {
    title: 'TikTok Safe Zone Checker & Guide (1080x1920 FYP Overlay)',
    desc: 'Free client-side TikTok Safe Zone Checker. Preview FYP buttons, captions, and sound ticker overlays on your 9:16 vertical videos. Export transparent PNG guides for CapCut & Premiere.',
    keywords: 'tiktok safe zone checker, tiktok safe area, tiktok 1080x1920 overlay, tiktok safe zone template capcut, tiktok text safe zone',
    h1: 'TikTok Safe Zone Checker & Overlay Guide',
  },
  reels: {
    title: 'Instagram Reels Safe Zone Overlay & Previewer (9:16)',
    desc: 'Ensure your captions, face, and CTAs are never blocked by Instagram Reels buttons, header, or audio info. Instant client-side video preview and transparent overlay PNG export.',
    keywords: 'instagram reels safe zone, reels safe area template, instagram 9:16 safe margin, reels caption safe zone premiere',
    h1: 'Instagram Reels Safe Zone Previewer & Template',
  },
  shorts: {
    title: 'YouTube Shorts Safe Zone Guide & Overlay Checker',
    desc: 'Accurate YouTube Shorts safe zone overlay previewer. Prevent subscribe buttons, channel names, and descriptions from blocking your video content. Zero server uploads.',
    keywords: 'youtube shorts safe zone guide, shorts safe area overlay, youtube shorts 1080x1920 dimensions template, shorts text safe area',
    h1: 'YouTube Shorts Safe Zone Checker',
  },
};

export const SafeZonePage: React.FC<SafeZonePageProps> = ({ platform }) => {
  const meta = METAS[platform];

  return (
    <div className="space-y-16">
      <SEOHead title={meta.title} description={meta.desc} keywords={meta.keywords} />

      {/* Header */}
      <div className="max-w-3xl pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.12] text-[11px] text-[#2997ff] font-medium mb-4">
          <span>9:16 Vertical Video Studio</span>
          <span className="text-[#6e6e73]">•</span>
          <span className="text-[#30d158] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Zero Server Uploads
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#f5f5f7] tracking-tight leading-tight">
          {meta.h1}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#86868b] leading-relaxed">
          Drop your vertical video or still image below to preview realistic platform overlays in real time. Adjust guide opacity or color contrast, then export the transparent PNG template directly into your editing software.
        </p>
      </div>

      {/* Tool Component */}
      <SafeZoneChecker initialPlatform={platform} />

      {/* Deep Dive Content for Editors & SEO */}
      <div className="apple-glass rounded-[32px] p-8 sm:p-10 space-y-6">
        <h2 className="text-xl font-bold text-[#f5f5f7] tracking-tight">Why Safe Zones Matter for Viral Short-Form Content</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#86868b] leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-semibold text-[#f5f5f7] flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-[#ffd60a]" />
              The Danger Margins
            </h3>
            <p>
              When viewers watch on {platform === 'tiktok' ? 'TikTok' : platform === 'reels' ? 'Instagram Reels' : 'YouTube Shorts'}, the native app overlays high-contrast interactive elements across the video:
            </p>
            <ul className="list-disc pl-4 space-y-1.5 text-[#f5f5f7]">
              <li><strong>Top Header (~120–160px):</strong> Live badge, search bar, following/for-you tabs.</li>
              <li><strong>Right Side Action Rail (~140–160px):</strong> Like, comment, save, and share icons.</li>
              <li><strong>Bottom Drawer (~320–400px):</strong> Username, caption expander, and music ticker.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-[#f5f5f7] flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#30d158]" />
              Best Practices for Video Editors
            </h3>
            <ul className="list-disc pl-4 space-y-1.5 text-[#f5f5f7]">
              <li>Keep all subtitles and primary hooks strictly within the center safe area.</li>
              <li>Avoid positioning face close-ups under the right-side like/comment column.</li>
              <li>Leave at least 15% breathing room at the bottom for automatic subtitles and platform captions.</li>
              <li>Export our 1080×1920 PNG guide and lock it on track V2/V3 in CapCut or Premiere.</li>
            </ul>
          </div>
        </div>
      </div>

      <DimensionsCheatSheet />
    </div>
  );
};
