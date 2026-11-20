import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, ChevronDown, Sparkles } from 'lucide-react';

const GithubIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu upon navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const storyAndSafeZones = [
    {
      name: 'Instagram Story',
      path: '/story-safe-zone',
      desc: 'Top progress dashes & bottom reply pill',
      badge: 'NEW',
    },
    {
      name: 'Instagram Reels',
      path: '/reels-safe-zone',
      desc: '9:16 reels safe area & action rail',
    },
    {
      name: 'TikTok FYP',
      path: '/tiktok-safe-zone',
      desc: 'For You Page captions & side rail',
    },
    {
      name: 'YouTube Shorts',
      path: '/shorts-safe-zone',
      desc: 'Shorts subscribe & bottom title bar',
    },
  ];

  const isSafeZoneActive = storyAndSafeZones.some((link) => location.pathname === link.path);

  return (
    <header className="sticky top-0 z-50 apple-glass-nav border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-12 sm:h-14 flex items-center justify-between">
        {/* Apple HIG Logo & Brand */}
        <Link to="/" className="flex items-center gap-2.5 text-white group">
          <div className="w-5 h-5 rounded-md bg-white/[0.1] border border-white/[0.15] flex items-center justify-center text-xs font-semibold text-[#f5f5f7] group-hover:scale-105 transition-transform">
            ⌘
          </div>
          <span className="font-semibold text-xs sm:text-sm tracking-tight text-[#f5f5f7] flex items-center gap-2">
            Creator Studio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/"
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              location.pathname === '/'
                ? 'text-white bg-white/[0.12] font-medium'
                : 'text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/[0.04]'
            }`}
          >
            Overview
          </Link>

          {/* Story & Safe Zones Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all ${
                isSafeZoneActive || dropdownOpen
                  ? 'text-white bg-white/[0.12] font-medium'
                  : 'text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/[0.04]'
              }`}
            >
              <span>Story & Safe Zones</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#30d158]/20 text-[#30d158] font-bold">
                Story
              </span>
              <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 p-2 bg-[#1c1c1e]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#86868b]">
                  Safe Zone Suite
                </div>
                <div className="space-y-0.5">
                  {storyAndSafeZones.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center justify-between p-2.5 rounded-xl transition-all ${
                        location.pathname === item.path
                          ? 'bg-white/[0.15] text-white'
                          : 'text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/[0.06]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#f5f5f7]">
                          <span>{item.name}</span>
                          {item.badge && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#30d158]/20 text-[#30d158] font-bold">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-[#86868b] mt-0.5">{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/carousel-splitter"
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all ${
              location.pathname === '/carousel-splitter'
                ? 'text-white bg-white/[0.12] font-medium'
                : 'text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/[0.04]'
            }`}
          >
            <span>Carousel & Story Splitter</span>
          </Link>

          <Link
            to="/discord-timestamps"
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              location.pathname === '/discord-timestamps'
                ? 'text-white bg-white/[0.12] font-medium'
                : 'text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/[0.04]'
            }`}
          >
            Discord Timestamps
          </Link>
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
            className="md:hidden p-1.5 text-[#86868b] hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-black/95 backdrop-blur-2xl px-4 py-5 space-y-4 max-h-[85vh] overflow-y-auto">
          {/* Section: Safe Zones */}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#86868b] px-3 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#2997ff]" />
              <span>Story & Video Safe Zones</span>
            </div>
            <div className="space-y-1">
              {storyAndSafeZones.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-colors ${
                    location.pathname === item.path
                      ? 'bg-white/[0.12] text-white font-medium'
                      : 'text-[#86868b] hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5 font-medium text-[#f5f5f7]">
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#30d158]/20 text-[#30d158] font-bold">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-[#86868b]">{item.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Section: Creative Utilities */}
          <div className="pt-2 border-t border-white/[0.06]">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#86868b] px-3 mb-2">
              Creative Utilities
            </div>
            <div className="space-y-1">
              <Link
                to="/carousel-splitter"
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs ${
                  location.pathname === '/carousel-splitter'
                    ? 'bg-white/[0.12] text-white font-medium'
                    : 'text-[#86868b] hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <div>
                  <div className="font-medium text-[#f5f5f7]">Carousel & Story Splitter</div>
                  <div className="text-[10px] text-[#86868b]">Slice into 9:16 Story, 4:5 Portrait, or 1:1 Square</div>
                </div>
              </Link>

              <Link
                to="/discord-timestamps"
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs ${
                  location.pathname === '/discord-timestamps'
                    ? 'bg-white/[0.12] text-white font-medium'
                    : 'text-[#86868b] hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <div>
                  <div className="font-medium text-[#f5f5f7]">Discord Dynamic Timestamps</div>
                  <div className="text-[10px] text-[#86868b]">Epoch countdown & date generator</div>
                </div>
              </Link>
            </div>
          </div>

          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between px-3 text-[11px] text-[#86868b]">
            <span className="flex items-center gap-1.5 text-[#30d158]">
              <Shield className="w-3.5 h-3.5" />
              <span>100% Client-Side Engine</span>
            </span>
            <Link to="/" className="text-[#2997ff] hover:underline">
              Overview
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
