import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';

const GithubIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Overview', path: '/' },
    { name: 'TikTok FYP', path: '/tiktok-safe-zone' },
    { name: 'Instagram Reels', path: '/reels-safe-zone' },
    { name: 'YouTube Shorts', path: '/shorts-safe-zone' },
    { name: 'Carousel Splitter', path: '/carousel-splitter' },
    { name: 'Discord Timestamps', path: '/discord-timestamps' },
  ];

  return (
    <header className="sticky top-0 z-50 apple-glass-nav border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-12 sm:h-14 flex items-center justify-between">
        {/* Apple Style Brand Identity */}
        <Link to="/" className="flex items-center gap-2.5 text-white group">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#2997ff] via-[#bf5af2] to-[#ff375f] flex items-center justify-center p-0.5 shadow-sm group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-[#2997ff]" />
            </div>
          </div>
          <span className="font-semibold text-xs sm:text-sm tracking-tight text-[#f5f5f7] flex items-center gap-2">
            Creator Studio
            <span className="hidden sm:inline-block text-[10px] font-medium tracking-normal text-[#86868b] border border-white/[0.12] px-2 py-0.5 rounded-full">
              Pro
            </span>
          </span>
        </Link>

        {/* Desktop Apple-Style Subdued Menu */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1 rounded-full text-xs font-normal transition-all ${
                  isActive
                    ? 'text-white bg-white/[0.12] shadow-sm font-medium'
                    : 'text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/[0.05]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-[#86868b] bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-full">
            <Shield className="w-3 h-3 text-[#30d158]" />
            <span>100% Client-Side</span>
          </div>

          <a
            href="https://github.com/adindairawan/toolscreators"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/[0.08] rounded-full transition-colors"
            title="GitHub Repository"
            aria-label="View on GitHub"
          >
            <GithubIcon />
          </a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#86868b] hover:text-white rounded-lg"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-black/95 backdrop-blur-2xl px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs ${
                location.pathname === link.path
                  ? 'bg-white/[0.12] text-white font-medium'
                  : 'text-[#86868b] hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <span>{link.name}</span>
              <ArrowUpRight className="w-3 h-3 text-[#6e6e73]" />
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
