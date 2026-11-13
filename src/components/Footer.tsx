import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Shield, Heart } from 'lucide-react';

const GithubIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="mt-28 border-t border-white/[0.08] bg-black text-xs text-[#86868b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        {/* Apple Style Top Disclaimer */}
        <div className="pb-8 border-b border-white/[0.08] text-[11px] leading-relaxed text-[#6e6e73] space-y-2">
          <p>
            1. All video manipulation, canvas decoding, and multi-slide compression execute strictly in-memory on the local client device. No media files or metadata are transmitted to external servers.
          </p>
          <p>
            2. Safe zone boundaries are modeled according to standard vertical 9:16 mobile viewports (1080 × 1920 px) across TikTok FYP, Instagram Reels, and YouTube Shorts as of 2026.
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-10">
          <div className="space-y-3">
            <h5 className="font-semibold text-[#f5f5f7] text-[11px] uppercase tracking-wider">
              Studio Tools
            </h5>
            <ul className="space-y-2 text-[12px]">
              <li>
                <Link to="/tiktok-safe-zone" className="hover:text-white transition-colors">
                  TikTok Safe Zone
                </Link>
              </li>
              <li>
                <Link to="/reels-safe-zone" className="hover:text-white transition-colors">
                  Instagram Reels Guide
                </Link>
              </li>
              <li>
                <Link to="/shorts-safe-zone" className="hover:text-white transition-colors">
                  YouTube Shorts Safe Area
                </Link>
              </li>
              <li>
                <Link to="/carousel-splitter" className="hover:text-white transition-colors">
                  Seamless Carousel Splitter
                </Link>
              </li>
              <li>
                <Link to="/discord-timestamps" className="hover:text-white transition-colors">
                  Discord Dynamic Timestamps
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-semibold text-[#f5f5f7] text-[11px] uppercase tracking-wider">
              Specifications
            </h5>
            <ul className="space-y-2 text-[12px]">
              <li><span className="text-[#6e6e73]">Canvas: 1080 × 1920 px</span></li>
              <li><span className="text-[#6e6e73]">Portrait Card: 1080 × 1350 px</span></li>
              <li><span className="text-[#6e6e73]">Square Card: 1080 × 1080 px</span></li>
              <li><span className="text-[#6e6e73]">Format: Lossless PNG / JPG</span></li>
              <li><span className="text-[#6e6e73]">Engine: WebGL & Canvas2D</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-semibold text-[#f5f5f7] text-[11px] uppercase tracking-wider">
              Privacy & Trust
            </h5>
            <ul className="space-y-2 text-[12px]">
              <li className="flex items-center gap-1.5 text-[#30d158]">
                <Shield className="w-3.5 h-3.5" />
                <span>Zero Cloud Storage</span>
              </li>
              <li><span className="text-[#6e6e73]">No Cookies or Trackers</span></li>
              <li><span className="text-[#6e6e73]">Ad-Free Experience</span></li>
              <li><span className="text-[#6e6e73]">MIT Open Source</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-semibold text-[#f5f5f7] text-[11px] uppercase tracking-wider">
              Support The Project
            </h5>
            <p className="text-[12px] leading-relaxed text-[#86868b]">
              Help maintain this ad-free, 100% free studio utility for video creators worldwide.
            </p>
            <a
              href="https://buymeacoffee.com/adindairawan"
              target="_blank"
              rel="noreferrer"
              className="apple-pill-secondary inline-flex items-center gap-2 text-xs py-2 px-4 text-[#f5f5f7]"
            >
              <Coffee className="w-3.5 h-3.5 fill-current text-[#ffd60a]" />
              <span>Buy Me a Coffee</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#6e6e73] text-[11px]">
          <p>© {new Date().getFullYear()} Creator Studio Pro • Independent Open Source Project</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/adindairawan/toolscreators"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <GithubIcon />
              <span>GitHub</span>
            </a>
            <span>•</span>
            <span className="flex items-center gap-1">
              Engineered with <Heart className="w-3 h-3 text-[#ff375f] fill-[#ff375f] inline" /> for Video Editors
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
