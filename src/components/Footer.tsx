import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Shield, Heart, Sparkles } from 'lucide-react';

const GithubIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-zinc-900 bg-zinc-950/70 text-xs text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Privacy */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span>Creator & Social Tools</span>
            </div>
            <p className="text-zinc-400 max-w-sm leading-relaxed text-[12px]">
              A free, ad-free, 100% client-side micro-tool suite designed for video creators, social media managers, and video editors to solve common platform friction points without popups, paywalls, or server uploads.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 pt-1 text-[11px]">
              <Shield className="w-3.5 h-3.5" />
              <span>All operations execute locally in your web browser.</span>
            </div>
          </div>

          {/* Tool Directory */}
          <div className="space-y-2">
            <h5 className="font-semibold text-zinc-200 uppercase tracking-wider text-[11px]">Free Micro Tools</h5>
            <ul className="space-y-1.5 text-zinc-400">
              <li>
                <Link to="/tiktok-safe-zone" className="hover:text-purple-400 transition-colors">
                  TikTok Safe Zone Checker
                </Link>
              </li>
              <li>
                <Link to="/reels-safe-zone" className="hover:text-purple-400 transition-colors">
                  Instagram Reels Safe Area
                </Link>
              </li>
              <li>
                <Link to="/shorts-safe-zone" className="hover:text-purple-400 transition-colors">
                  YouTube Shorts Safe Zone
                </Link>
              </li>
              <li>
                <Link to="/carousel-splitter" className="hover:text-purple-400 transition-colors">
                  Panoramic Carousel Splitter
                </Link>
              </li>
              <li>
                <Link to="/discord-timestamps" className="hover:text-purple-400 transition-colors">
                  Discord Timestamp Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Community */}
          <div className="space-y-3">
            <h5 className="font-semibold text-zinc-200 uppercase tracking-wider text-[11px]">Support Development</h5>
            <p className="text-[12px] text-zinc-400 leading-relaxed">
              Enjoying the tools? Help keep them 100% ad-free, fast, and maintained!
            </p>
            <a
              href="https://buymeacoffee.com/adindairawan"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-semibold rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all"
            >
              <Coffee className="w-4 h-4 fill-current" />
              <span>Buy Me a Coffee</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <p>© {new Date().getFullYear()} Creator & Social Tools • Open Source Under MIT</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/adindairawan/toolscreators"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-300 flex items-center gap-1.5 transition-colors"
            >
              <GithubIcon />
              <span>GitHub</span>
            </a>
            <span>•</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" /> for Creators
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
