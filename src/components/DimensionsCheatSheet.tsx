import React from 'react';
import { Zap, Lock, Sparkles, CheckCircle } from 'lucide-react';

export const DimensionsCheatSheet: React.FC = () => {
  return (
    <div className="pt-16 border-t border-white/[0.08] space-y-16">
      {/* 3 Pillars / Feature Value Props */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="apple-bento-card p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-white/[0.08] border border-white/[0.12] flex items-center justify-center mb-4 text-[#30d158]">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-[#f5f5f7]">100% On-Device Privacy</h4>
            <p className="text-xs text-[#86868b] mt-2 leading-relaxed">
              Your video files and brand photography never touch a server. All video frame stepping and image slicing execute inside your browser's WebGL / Canvas runtime.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center gap-1.5 text-[11px] text-[#30d158]">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Zero cloud transfer</span>
          </div>
        </div>

        <div className="apple-bento-card p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-white/[0.08] border border-white/[0.12] flex items-center justify-center mb-4 text-[#2997ff]">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-[#f5f5f7]">Zero Ads. Zero Watermarks.</h4>
            <p className="text-xs text-[#86868b] mt-2 leading-relaxed">
              No subscription walls, no banner ads, and no logo watermarks stamped onto your split slides or exported guide templates. Pure focused utility.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center gap-1.5 text-[11px] text-[#2997ff]">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Forever unrestricted</span>
          </div>
        </div>

        <div className="apple-bento-card p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-white/[0.08] border border-white/[0.12] flex items-center justify-center mb-4 text-[#f5f5f7]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-[#f5f5f7]">NLE Editor Precision</h4>
            <p className="text-xs text-[#86868b] mt-2 leading-relaxed">
              Engineered specifically for Premiere Pro, Final Cut Pro, DaVinci Resolve, and CapCut editors needing exact pixel bounds for TikTok, Reels & Shorts.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center gap-1.5 text-[11px] text-[#86868b]">
            <CheckCircle className="w-3.5 h-3.5 text-[#30d158]" />
            <span>1080×1920 native output</span>
          </div>
        </div>
      </div>

      {/* Apple Tech Specs Style Platform Dimensions Table */}
      <div className="apple-glass rounded-[32px] p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.08]">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#86868b]">
              Platform Specifications
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#f5f5f7] mt-0.5">
              Vertical Video & Social Dimensions Reference
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-white/[0.08] border border-white/[0.12] text-[11px] text-[#86868b] self-start sm:self-auto">
            Updated for 2026 UIs
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#86868b]">
            <thead className="text-[11px] uppercase tracking-wider text-[#6e6e73] border-b border-white/[0.08]">
              <tr>
                <th className="pb-3 font-semibold text-[#f5f5f7]">Platform / Target</th>
                <th className="pb-3 font-semibold text-[#f5f5f7]">Aspect Ratio</th>
                <th className="pb-3 font-semibold text-[#f5f5f7]">Exact Resolution</th>
                <th className="pb-3 font-semibold text-[#f5f5f7]">UI Danger Margins to Avoid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] font-mono">
              <tr>
                <td className="py-4 text-[#f5f5f7] font-sans font-medium">TikTok (For You Page)</td>
                <td className="py-4">9:16</td>
                <td className="py-4">1080 × 1920 px</td>
                <td className="py-4 text-[#ffd60a]">Top 160px • Right 160px • Bottom 400px</td>
              </tr>
              <tr>
                <td className="py-4 text-[#f5f5f7] font-sans font-medium">Instagram Reels</td>
                <td className="py-4">9:16</td>
                <td className="py-4">1080 × 1920 px</td>
                <td className="py-4 text-[#ffd60a]">Top 140px • Right 140px • Bottom 360px</td>
              </tr>
              <tr>
                <td className="py-4 text-[#f5f5f7] font-sans font-medium">YouTube Shorts</td>
                <td className="py-4">9:16</td>
                <td className="py-4">1080 × 1920 px</td>
                <td className="py-4 text-[#ffd60a]">Top 120px • Right 150px • Bottom 320px</td>
              </tr>
              <tr>
                <td className="py-4 text-[#f5f5f7] font-sans font-medium">Instagram / LinkedIn Carousel (Portrait)</td>
                <td className="py-4">4:5</td>
                <td className="py-4">1080 × 1350 px</td>
                <td className="py-4 text-[#30d158]">Optimal full-height feed engagement</td>
              </tr>
              <tr>
                <td className="py-4 text-[#f5f5f7] font-sans font-medium">Instagram Carousel (Square)</td>
                <td className="py-4">1:1</td>
                <td className="py-4">1080 × 1080 px</td>
                <td className="py-4 text-[#86868b]">Classic grid square standard</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Apple Clean Accordion / FAQ Cards */}
      <div className="apple-glass rounded-[32px] p-6 sm:p-10 space-y-8">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#86868b]">
            Knowledge Base
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#f5f5f7] mt-0.5">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#86868b] leading-relaxed">
          <div className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl space-y-2">
            <h5 className="font-semibold text-[#f5f5f7]">Why do subtitles get blocked on TikTok and Reels?</h5>
            <p>
              Both platforms superimpose interactive elements over videos — username drawers, captions, sound tickers, and side action buttons. If text is placed outside the center 9:16 safe perimeter, viewers cannot read it without pausing.
            </p>
          </div>

          <div className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl space-y-2">
            <h5 className="font-semibold text-[#f5f5f7]">How do I use the exported PNG in Premiere or CapCut?</h5>
            <p>
              Click "Export 1080×1920 PNG" inside the tool. Place the transparent PNG on the topmost video track of your timeline. Align your stickers and subtitles inside the guide rectangle, then hide or mute the guide track before exporting.
            </p>
          </div>

          <div className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl space-y-2">
            <h5 className="font-semibold text-[#f5f5f7]">Are my media files uploaded anywhere?</h5>
            <p>
              No. Zero bytes leave your machine. Decoding, canvas transformations, and ZIP generation run 100% locally using HTML5 Canvas, WebGL, and JSZip.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
