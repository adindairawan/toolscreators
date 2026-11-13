import React from 'react';
import { Zap, Lock, Sparkles, Smartphone } from 'lucide-react';

export const DimensionsCheatSheet: React.FC = () => {
  return (
    <div className="mt-16 pt-12 border-t border-zinc-800/80 space-y-12">
      {/* 3 Pillars / Feature Value Props */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 bg-zinc-900/40 border border-zinc-800 rounded-2xl">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit mb-3">
            <Lock className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-semibold text-zinc-100">100% Client-Side Privacy</h4>
          <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
            Your videos, images, and brand assets never upload to any remote server. Everything is rendered locally in your browser with HTML5 Canvas.
          </p>
        </div>

        <div className="p-5 bg-zinc-900/40 border border-zinc-800 rounded-2xl">
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl w-fit mb-3">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-semibold text-zinc-100">Zero Ads, Zero Watermarks</h4>
          <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
            No popup ads, no subscription gates, no login walls, and zero watermarks applied to exported template assets or split carousel slides.
          </p>
        </div>

        <div className="p-5 bg-zinc-900/40 border border-zinc-800 rounded-2xl">
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl w-fit mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-semibold text-zinc-100">Editor-Grade Precision</h4>
          <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
            Designed specifically for Premiere Pro, Final Cut Pro, DaVinci Resolve, and CapCut editors needing exact pixel bounds for TikTok, Reels & Shorts.
          </p>
        </div>
      </div>

      {/* Quick Platform Dimensions Cheat Sheet */}
      <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl">
        <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2 mb-4">
          <Smartphone className="w-4 h-4 text-purple-400" />
          Vertical Video & Carousel Dimensions Cheat Sheet (2026 Updated)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-400">
            <thead className="text-[11px] uppercase tracking-wider text-zinc-500 border-b border-zinc-800">
              <tr>
                <th className="pb-3 font-semibold">Platform & Format</th>
                <th className="pb-3 font-semibold">Aspect Ratio</th>
                <th className="pb-3 font-semibold">Resolution</th>
                <th className="pb-3 font-semibold">Danger Margins to Avoid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-mono">
              <tr>
                <td className="py-3 text-zinc-200 font-sans font-medium">TikTok (FYP)</td>
                <td className="py-3">9:16</td>
                <td className="py-3">1080 × 1920 px</td>
                <td className="py-3 text-amber-400">Top 160px, Right 160px, Bottom 400px</td>
              </tr>
              <tr>
                <td className="py-3 text-zinc-200 font-sans font-medium">Instagram Reels</td>
                <td className="py-3">9:16</td>
                <td className="py-3">1080 × 1920 px</td>
                <td className="py-3 text-amber-400">Top 140px, Right 140px, Bottom 360px</td>
              </tr>
              <tr>
                <td className="py-3 text-zinc-200 font-sans font-medium">YouTube Shorts</td>
                <td className="py-3">9:16</td>
                <td className="py-3">1080 × 1920 px</td>
                <td className="py-3 text-amber-400">Top 120px, Right 150px, Bottom 320px</td>
              </tr>
              <tr>
                <td className="py-3 text-zinc-200 font-sans font-medium">Instagram / LinkedIn Carousel (Portrait)</td>
                <td className="py-3">4:5</td>
                <td className="py-3">1080 × 1350 px</td>
                <td className="py-3 text-emerald-400">Highest feed engagement</td>
              </tr>
              <tr>
                <td className="py-3 text-zinc-200 font-sans font-medium">Instagram Carousel (Square)</td>
                <td className="py-3">1:1</td>
                <td className="py-3">1080 × 1080 px</td>
                <td className="py-3 text-zinc-400">Standard square feed format</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO FAQs */}
      <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl space-y-4">
        <h3 className="text-sm font-semibold text-zinc-100">Frequently Asked Questions</h3>
        <div className="space-y-3 text-xs text-zinc-400 leading-relaxed">
          <div>
            <h5 className="font-semibold text-zinc-200">Why do my captions get covered on TikTok and Reels?</h5>
            <p className="mt-1">
              Social platforms render dynamic UI elements on top of vertical videos — including username headers, like/comment buttons, sound tickers, and description boxes. If text is placed outside the 9:16 safe area, it gets obscured by these overlays.
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-zinc-200">How do I use the exported transparent PNG guide in CapCut or Premiere?</h5>
            <p className="mt-1">
              Click "Export Guide PNG (1080x1920)" above, import the image into your editing timeline on the topmost video track, and adjust your title and sticker placements to stay within the inner guide box. Hide or delete the guide track before exporting your video.
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-zinc-200">Is my media uploaded to a server?</h5>
            <p className="mt-1">
              No. All video decoding, image slicing, and timestamp generation execute 100% locally on your machine using HTML5 Canvas and Web APIs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
