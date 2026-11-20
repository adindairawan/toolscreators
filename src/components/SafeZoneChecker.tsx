import React, { useState, useRef, useEffect } from 'react';
import { Upload, Play, Pause, Download, Eye, EyeOff, RotateCcw, Sliders, Palette, Sparkles, Check, Info } from 'lucide-react';

export type Platform = 'tiktok' | 'reels' | 'shorts' | 'story';

interface OverlayConfig {
  name: string;
  badge: string;
  topDanger: number; // in pixels of 1080x1920
  bottomDanger: number;
  rightDanger: number;
  leftDanger?: number;
  desc: string;
}

const PLATFORMS: Record<Platform, OverlayConfig> = {
  tiktok: {
    name: 'TikTok FYP',
    badge: '9:16 (1080x1920)',
    topDanger: 160,
    bottomDanger: 400,
    rightDanger: 160,
    desc: 'For You Page (FYP) search bar, right action icons & bottom caption drawer.',
  },
  story: {
    name: 'Instagram Story',
    badge: '9:16 (1080x1920)',
    topDanger: 250,
    bottomDanger: 280,
    rightDanger: 65,
    leftDanger: 65,
    desc: 'Top progress segment bars, username header & bottom Send Message reply pill.',
  },
  reels: {
    name: 'Instagram Reels',
    badge: '9:16 (1080x1920)',
    topDanger: 140,
    bottomDanger: 360,
    rightDanger: 140,
    desc: 'Reels header, follow button, caption drawer & right-hand interaction rail.',
  },
  shorts: {
    name: 'YouTube Shorts',
    badge: '9:16 (1080x1920)',
    topDanger: 120,
    bottomDanger: 320,
    rightDanger: 150,
    desc: 'Shorts search/overflow menu, channel subscribe bar & bottom title block.',
  },
};

const GUIDE_COLORS = [
  { name: 'Emerald', value: '#30d158', borderClass: 'border-[#30d158]', bgClass: 'bg-[#30d158]/10' },
  { name: 'Cyan', value: '#2997ff', borderClass: 'border-[#2997ff]', bgClass: 'bg-[#2997ff]/10' },
  { name: 'Yellow', value: '#ffd60a', borderClass: 'border-[#ffd60a]', bgClass: 'bg-[#ffd60a]/10' },
  { name: 'White', value: '#ffffff', borderClass: 'border-white', bgClass: 'bg-white/10' },
];

interface SafeZoneCheckerProps {
  initialPlatform?: Platform;
}

export const SafeZoneChecker: React.FC<SafeZoneCheckerProps> = ({ initialPlatform = 'tiktok' }) => {
  const [platform, setPlatform] = useState<Platform>(initialPlatform);
  const [mediaSrc, setMediaSrc] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'video' | 'image' | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // User Customization Sliders
  const [overlayOpacity, setOverlayOpacity] = useState(0.85);
  const [showOverlay, setShowOverlay] = useState(true);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [extraBottomMargin, setExtraBottomMargin] = useState(0); // in percentage offset
  const [showAdvanced, setShowAdvanced] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPlatform(initialPlatform);
  }, [initialPlatform]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    if (file.type.startsWith('video/')) {
      setMediaType('video');
      setMediaSrc(url);
      setIsPlaying(false);
      showToast(`Loaded video: ${file.name}`);
    } else if (file.type.startsWith('image/')) {
      setMediaType('image');
      setMediaSrc(url);
      setIsPlaying(false);
      showToast(`Loaded image: ${file.name}`);
    }
  };

  const loadDemoMedia = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Elegant cinematic background
    const grad = ctx.createLinearGradient(0, 0, 1080, 1920);
    grad.addColorStop(0, '#070a10');
    grad.addColorStop(0.3, '#0e1828');
    grad.addColorStop(0.7, '#142136');
    grad.addColorStop(1, '#080d16');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1920);

    // Subtle grid pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 1080; x += 120) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1920);
      ctx.stroke();
    }
    for (let y = 0; y < 1920; y += 120) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1080, y);
      ctx.stroke();
    }

    // Radial center illumination
    const radial = ctx.createRadialGradient(540, 880, 40, 540, 880, 520);
    radial.addColorStop(0, 'rgba(0, 113, 227, 0.2)');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, 1080, 1920);

    // Center Demo Avatar Circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(540, 680, 72, 0, Math.PI * 2);
    ctx.fillStyle = '#1c1c1e';
    ctx.fill();
    ctx.strokeStyle = '#2997ff';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.font = '54px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚡', 540, 680);
    ctx.restore();

    // Primary Hook Headline in Safe Zone
    ctx.font = 'bold 56px -apple-system, sans-serif';
    ctx.fillStyle = '#f5f5f7';
    ctx.textAlign = 'center';
    ctx.fillText('SAFE ZONE DEMO PREVIEW', 540, 830);

    // Subtitle
    ctx.font = '600 30px -apple-system, sans-serif';
    ctx.fillStyle = '#30d158';
    ctx.fillText('✓ Keep subtitles and hooks inside the safe boundary', 540, 895);

    // Context Card
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.beginPath();
    ctx.roundRect(140, 960, 800, 240, 24);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = '28px -apple-system, sans-serif';
    ctx.fillStyle = '#f5f5f7';
    ctx.fillText('Live Interactive UI Simulator', 540, 1030);
    ctx.fillStyle = '#86868b';
    ctx.font = '24px -apple-system, sans-serif';
    ctx.fillText('Toggle Instagram Story, Reels, TikTok & Shorts guides.', 540, 1080);
    ctx.fillText('Never let buttons, captions or stickers hide your message.', 540, 1125);

    // Warning annotations
    ctx.font = 'bold 22px -apple-system, sans-serif';
    ctx.fillStyle = '#ffd60a';
    ctx.fillText('▲ TOP DANGER AREA: Status icons, story bars & search bars', 540, 180);
    ctx.fillText('▼ BOTTOM DANGER AREA: Caption drawers, reply pills & audio titles', 540, 1780);

    const dataUrl = canvas.toDataURL('image/png');
    setMediaType('image');
    setMediaSrc(dataUrl);
    setIsPlaying(false);
    showToast('Loaded interactive demo preview');
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Keyboard accessibility & editor shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space' && mediaType === 'video') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowLeft' && videoRef.current) {
        e.preventDefault();
        videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 1 / 30);
      } else if (e.code === 'ArrowRight' && videoRef.current) {
        e.preventDefault();
        videoRef.current.currentTime = Math.min(videoRef.current.duration || 0, videoRef.current.currentTime + 1 / 30);
      } else if (e.code === 'KeyO') {
        e.preventDefault();
        setShowOverlay((prev) => !prev);
      } else if (e.code === 'KeyC') {
        e.preventDefault();
        setSelectedColorIndex((prev) => (prev + 1) % GUIDE_COLORS.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mediaType]);

  const activeColor = GUIDE_COLORS[selectedColorIndex];

  const exportOverlayPNG = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, 1080, 1920);

    const cfg = PLATFORMS[platform];
    const topMargin = cfg.topDanger;
    const bottomMargin = cfg.bottomDanger + (extraBottomMargin * 5);
    const rightMargin = cfg.rightDanger;
    const leftMargin = cfg.leftDanger || 60;

    // Danger overlays (translucent dark mask)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    // Top
    ctx.fillRect(0, 0, 1080, topMargin);
    // Left tap area
    if (leftMargin > 0) {
      ctx.fillRect(0, topMargin, leftMargin, 1920 - topMargin - bottomMargin);
    }
    // Right action rail
    ctx.fillRect(1080 - rightMargin, topMargin, rightMargin, 1920 - topMargin - bottomMargin);
    // Bottom
    ctx.fillRect(0, 1920 - bottomMargin, 1080, bottomMargin);

    // Safe area outline box
    ctx.strokeStyle = activeColor.value;
    ctx.lineWidth = 4;
    const boxX = Math.max(leftMargin, 60);
    const boxW = 1080 - rightMargin - boxX;
    ctx.strokeRect(boxX, topMargin + 20, boxW, 1920 - topMargin - bottomMargin - 40);

    // Template Watermark Text
    ctx.font = 'bold 36px -apple-system, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(`${cfg.name} 1080×1920 Safe Zone Guide`, 540, 940);
    ctx.font = '24px -apple-system, sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText('Client-Side Creator Studio • Keep subtitles & graphics inside the line', 540, 990);

    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `${platform}-safe-zone-guide-1080x1920.png`;
    a.click();
    showToast(`✓ Downloaded ${cfg.name} 1080×1920 PNG guide`);
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c1c1e]/95 backdrop-blur-xl border border-white/20 text-[#f5f5f7] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-medium animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-[#30d158]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 apple-glass rounded-2xl">
        {/* Platform Selector Segmented Control */}
        <div className="flex items-center gap-1 bg-black/50 p-1 rounded-full border border-white/[0.08] overflow-x-auto max-w-full">
          <span className="text-[11px] font-medium text-[#86868b] px-2.5 hidden sm:inline">Platform</span>
          {(Object.keys(PLATFORMS) as Platform[]).map((p) => (
            <button
              key={p}
              onClick={() => {
                setPlatform(p);
                showToast(`Switched to ${PLATFORMS[p].name}`);
              }}
              className={`px-3 py-1.5 text-xs rounded-full transition-all whitespace-nowrap ${
                platform === p
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-[#86868b] hover:text-[#f5f5f7]'
              }`}
            >
              {PLATFORMS[p].name}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
              showAdvanced
                ? 'bg-white/[0.15] text-white border-white/[0.2]'
                : 'bg-white/[0.05] text-[#86868b] border-white/[0.08] hover:text-[#f5f5f7]'
            }`}
            title="Adjust guide opacity and padding"
          >
            <Sliders className="w-3.5 h-3.5 text-[#2997ff]" />
            <span>Customize</span>
          </button>

          <button
            onClick={() => {
              setShowOverlay(!showOverlay);
              showToast(showOverlay ? 'Guides hidden' : 'Guides visible');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] rounded-full text-[#86868b] hover:text-[#f5f5f7] transition-colors"
            title="Press [O] on keyboard to toggle"
          >
            {showOverlay ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{showOverlay ? 'Hide Guides' : 'Show Guides'}</span>
          </button>

          <button
            onClick={exportOverlayPNG}
            className="apple-btn-blue flex items-center gap-1.5 text-xs py-1.5 px-4 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export 1080×1920 PNG</span>
          </button>
        </div>
      </div>

      {/* Advanced Customization Drawer */}
      {showAdvanced && (
        <div className="p-5 apple-bento-card grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#f5f5f7]">
          {/* Opacity slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[#86868b]">
              <span>Overlay Opacity</span>
              <span className="font-mono text-[#2997ff]">{Math.round(overlayOpacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={overlayOpacity}
              onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
              className="w-full accent-[#0071e3] cursor-pointer"
            />
          </div>

          {/* Color contrast selector */}
          <div className="space-y-1.5">
            <span className="text-[#86868b] flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" />
              <span>Guide Color (Key [C])</span>
            </span>
            <div className="flex gap-2 pt-1">
              {GUIDE_COLORS.map((col, idx) => (
                <button
                  key={col.name}
                  onClick={() => setSelectedColorIndex(idx)}
                  className={`w-6 h-6 rounded-full border-2 transition-transform ${
                    selectedColorIndex === idx ? 'scale-110 border-white' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: col.value }}
                  title={col.name}
                  aria-label={`Select ${col.name} guide color`}
                />
              ))}
            </div>
          </div>

          {/* Extra bottom margin */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[#86868b]">
              <span>Phone Bezels / Extra Safety</span>
              <span className="font-mono text-[#2997ff]">+{extraBottomMargin * 5}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={extraBottomMargin}
              onChange={(e) => setExtraBottomMargin(parseInt(e.target.value))}
              className="w-full accent-[#0071e3] cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Main Preview Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Phone Mockup Canvas Viewport */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center p-6 sm:p-10 apple-glass rounded-[32px] min-h-[640px]">
          {/* Apple iPhone Pro Bezel Simulator (Aspect Ratio 9:16) */}
          <div className="relative w-full max-w-[340px] aspect-[9/16] bg-black rounded-[44px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-[5px] border-[#38383a] ring-1 ring-white/10 flex items-center justify-center select-none">
            {/* Dynamic Island Pill */}
            <div className="absolute top-2.5 inset-x-0 mx-auto w-24 h-6 bg-black rounded-full border border-white/10 z-30 flex items-center justify-between px-2.5 pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1c1c1e] ring-1 ring-white/5" />
              <div className="w-2 h-2 rounded-full bg-[#0a84ff]/60" />
            </div>

            {mediaSrc ? (
              mediaType === 'video' ? (
                <video
                  ref={videoRef}
                  src={mediaSrc}
                  className="w-full h-full object-cover"
                  loop
                  playsInline
                  onTimeUpdate={() => {
                    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
                  }}
                  onLoadedMetadata={() => {
                    if (videoRef.current) setDuration(videoRef.current.duration);
                  }}
                />
              ) : (
                <img src={mediaSrc} alt="Preview" className="w-full h-full object-cover" />
              )
            ) : (
              /* Friendly Empty State with 1-Click Demo */
              <div className="flex flex-col items-center justify-center p-6 text-center h-full w-full border-2 border-dashed border-white/10 rounded-[32px] m-3 bg-white/[0.01]">
                <div className="w-12 h-12 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center mb-3">
                  <Upload className="w-5 h-5 text-[#2997ff]" />
                </div>
                <p className="text-sm font-semibold text-[#f5f5f7]">Drop MP4, MOV, or Image</p>
                <p className="text-[11px] text-[#86868b] mt-1 max-w-[200px] leading-relaxed">
                  100% In-Memory. No video is ever uploaded to a server.
                </p>

                <div className="mt-5 flex flex-col gap-2 w-full max-w-[220px]">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="apple-pill-primary py-2 text-xs flex items-center justify-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload File</span>
                  </button>

                  <button
                    onClick={loadDemoMedia}
                    className="apple-pill-secondary py-2 text-xs flex items-center justify-center gap-1.5 text-[#2997ff] border-[#2997ff]/30 hover:border-[#2997ff]/60"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Try Sample Demo</span>
                  </button>
                </div>
              </div>
            )}

            {/* SVG Vector Overlays */}
            {showOverlay && (
              <div
                className="absolute inset-0 pointer-events-none transition-opacity"
                style={{ opacity: overlayOpacity }}
              >
                {/* 1. TIKTOK FYP OVERLAY */}
                {platform === 'tiktok' && (
                  <div className="relative w-full h-full text-white text-[10px]">
                    {/* Top Header */}
                    <div className="absolute top-0 inset-x-0 h-[10%] bg-gradient-to-b from-black/75 to-transparent flex items-center justify-between px-4 pt-3">
                      <span className="opacity-60 text-[9px] font-medium">LIVE</span>
                      <div className="flex gap-3 font-semibold text-[11px]">
                        <span className="opacity-60">Following</span>
                        <span className="border-b-2 border-white pb-0.5">For You</span>
                      </div>
                      <span className="opacity-80">🔍</span>
                    </div>

                    {/* Right Side Action Rail */}
                    <div className="absolute right-2 bottom-20 flex flex-col items-center gap-3.5 z-10">
                      <div className="w-7 h-7 rounded-full bg-zinc-700/80 border border-white/60 flex items-center justify-center text-[10px]">👤</div>
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">❤️</div>
                        <span className="text-[8px] font-medium mt-0.5">142K</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">💬</div>
                        <span className="text-[8px] font-medium mt-0.5">3.4K</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">🔖</div>
                        <span className="text-[8px] font-medium mt-0.5">8.9K</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">↗️</div>
                        <span className="text-[8px] font-medium mt-0.5">Share</span>
                      </div>
                    </div>

                    {/* Bottom Caption & Audio */}
                    <div
                      className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-3.5 pr-14"
                      style={{ height: `${22 + extraBottomMargin}%` }}
                    >
                      <span className="font-semibold text-xs text-white">@creator</span>
                      <p className="line-clamp-2 text-[10px] text-zinc-200 mt-1 leading-tight">
                        Keep hooks and subtitles inside the safe perimeter to avoid getting obscured by the caption ticker!
                      </p>
                      <div className="flex items-center gap-1.5 mt-2 text-[9px] text-zinc-300">
                        <span>🎵</span>
                        <span className="truncate">Original Audio - Trending Sound</span>
                      </div>
                    </div>

                    {/* Safe Area Guide Box */}
                    <div
                      className={`absolute top-[12%] left-[6%] right-[18%] border-2 rounded-lg flex items-center justify-center ${activeColor.borderClass} ${activeColor.bgClass}`}
                      style={{ bottom: `${22 + extraBottomMargin}%` }}
                    >
                      <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-100 bg-black/70 px-2 py-0.5 rounded">
                        TikTok Safe Area
                      </span>
                    </div>
                  </div>
                )}

                {/* 2. INSTAGRAM STORY OVERLAY */}
                {platform === 'story' && (
                  <div className="relative w-full h-full text-white text-[10px]">
                    {/* Story Top Segment Progress Bars */}
                    <div className="absolute top-2.5 inset-x-0 px-3 flex gap-1 z-20">
                      <div className="h-0.5 rounded-full bg-white flex-1" />
                      <div className="h-0.5 rounded-full bg-white/40 flex-1" />
                      <div className="h-0.5 rounded-full bg-white/40 flex-1" />
                      <div className="h-0.5 rounded-full bg-white/40 flex-1" />
                    </div>

                    {/* Story Header Bar */}
                    <div className="absolute top-5 inset-x-0 flex items-center justify-between px-3 pt-1 z-20">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-500 to-rose-500">
                          <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center text-[9px]">
                            📸
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-[11px] text-white">creator_story</span>
                          <span className="text-[10px] text-zinc-400">2h</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-white/90">
                        <span>⋯</span>
                        <span className="text-sm font-light">✕</span>
                      </div>
                    </div>

                    {/* Side Tap Danger Indicators */}
                    <div className="absolute inset-y-16 left-0 w-[12%] bg-black/15 border-r border-dashed border-white/20 flex items-center justify-center pointer-events-none">
                      <span className="text-[8px] font-mono text-zinc-400 -rotate-90 whitespace-nowrap opacity-75">Tap: Prev</span>
                    </div>
                    <div className="absolute inset-y-16 right-0 w-[12%] bg-black/15 border-l border-dashed border-white/20 flex items-center justify-center pointer-events-none">
                      <span className="text-[8px] font-mono text-zinc-400 rotate-90 whitespace-nowrap opacity-75">Tap: Next</span>
                    </div>

                    {/* Story Bottom Reply Pill & Quick Reactions */}
                    <div
                      className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-center justify-between px-3 pb-3 pt-6 gap-2"
                      style={{ height: `${16 + extraBottomMargin}%` }}
                    >
                      <div className="flex-1 h-8 rounded-full border border-white/40 bg-black/30 backdrop-blur-sm px-3 flex items-center text-[10px] text-white/70">
                        <span>Send message...</span>
                      </div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm">
                        🤍
                      </div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm">
                        ✈️
                      </div>
                    </div>

                    {/* Story Center Safe Area Guide Box */}
                    <div
                      className={`absolute top-[14%] left-[12%] right-[12%] border-2 rounded-xl flex items-center justify-center ${activeColor.borderClass} ${activeColor.bgClass}`}
                      style={{ bottom: `${16 + extraBottomMargin}%` }}
                    >
                      <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-100 bg-black/75 px-2.5 py-0.5 rounded shadow">
                        Story Safe Area (Stickers & Text)
                      </span>
                    </div>
                  </div>
                )}

                {/* 3. INSTAGRAM REELS OVERLAY */}
                {platform === 'reels' && (
                  <div className="relative w-full h-full text-white text-[10px]">
                    <div className="absolute top-0 inset-x-0 h-[8%] bg-gradient-to-b from-black/60 to-transparent flex items-center justify-between px-4 pt-3">
                      <span className="font-bold text-xs tracking-wide">Reels</span>
                      <span>📷</span>
                    </div>

                    <div className="absolute right-2 bottom-16 flex flex-col items-center gap-3.5 z-10">
                      <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">❤️</div>
                      <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">💬</div>
                      <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">✈️</div>
                      <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">⋯</div>
                    </div>

                    <div
                      className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-3.5 pr-14"
                      style={{ height: `${20 + extraBottomMargin}%` }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs">brand.creator</span>
                        <span className="px-2 py-0.5 border border-white/50 rounded-md text-[8px]">Follow</span>
                      </div>
                      <p className="line-clamp-2 text-[10px] text-zinc-200 mt-1 leading-tight">
                        Instagram Reels safe boundary guide. Keep critical CTAs inside!
                      </p>
                    </div>

                    <div
                      className={`absolute top-[10%] left-[6%] right-[16%] border-2 rounded-lg flex items-center justify-center ${activeColor.borderClass} ${activeColor.bgClass}`}
                      style={{ bottom: `${20 + extraBottomMargin}%` }}
                    >
                      <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-100 bg-black/70 px-2 py-0.5 rounded">
                        Reels Safe Area
                      </span>
                    </div>
                  </div>
                )}

                {/* 4. YOUTUBE SHORTS OVERLAY */}
                {platform === 'shorts' && (
                  <div className="relative w-full h-full text-white text-[10px]">
                    <div className="absolute top-0 inset-x-0 h-[8%] flex items-center justify-between px-4 pt-3">
                      <span>🔍</span>
                      <span>⋯</span>
                    </div>

                    <div className="absolute right-2 bottom-16 flex flex-col items-center gap-3.5 z-10">
                      <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">👍</div>
                      <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">👎</div>
                      <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">💬</div>
                      <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">↗️</div>
                    </div>

                    <div
                      className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-3.5 pr-14"
                      style={{ height: `${18 + extraBottomMargin}%` }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs">@channel</span>
                        <span className="px-2 py-0.5 bg-red-600 rounded text-[9px] font-bold">Subscribe</span>
                      </div>
                      <p className="line-clamp-1 text-[10px] text-zinc-200 mt-1">Shorts Title Overlay</p>
                    </div>

                    <div
                      className={`absolute top-[8%] left-[6%] right-[16%] border-2 rounded-lg flex items-center justify-center ${activeColor.borderClass} ${activeColor.bgClass}`}
                      style={{ bottom: `${18 + extraBottomMargin}%` }}
                    >
                      <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-100 bg-black/70 px-2 py-0.5 rounded">
                        Shorts Safe Area
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Media Player Scrubber (For Videos) */}
          {mediaType === 'video' && (
            <div className="w-full max-w-[340px] mt-4 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 bg-white text-black hover:opacity-90 rounded-full transition-opacity shadow-sm"
                  title="Spacebar to toggle"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.05"
                  value={currentTime}
                  onChange={(e) => {
                    const time = parseFloat(e.target.value);
                    if (videoRef.current) {
                      videoRef.current.currentTime = time;
                      setCurrentTime(time);
                    }
                  }}
                  className="w-full accent-[#2997ff] cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-[11px] text-[#86868b] font-mono">
                <span>{currentTime.toFixed(1)}s / {duration.toFixed(1)}s</span>
                <span>[Space] Play • [←/→] Step</span>
              </div>
            </div>
          )}

          {/* Keyboard Shortcuts Hint Pill */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[10px] text-[#86868b]">
            <span className="px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] rounded-md font-mono">[Space] Play/Pause</span>
            <span className="px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] rounded-md font-mono">[←/→] Frame Step</span>
            <span className="px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] rounded-md font-mono">[O] Toggle Guides</span>
            <span className="px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] rounded-md font-mono">[C] Cycle Color</span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*,image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>

        {/* Side Panel Controls & Guides */}
        <div className="lg:col-span-4 space-y-4">
          {/* Quick Actions Card */}
          <div className="apple-bento-card p-6">
            <h3 className="text-sm font-semibold text-[#f5f5f7] flex items-center gap-2">
              <Upload className="w-4 h-4 text-[#2997ff]" />
              Video / Image Input
            </h3>
            <p className="text-xs text-[#86868b] mt-1.5 leading-relaxed">
              Drop any vertical MP4, MOV, or PNG file. Decoded entirely inside your browser.
            </p>

            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full apple-pill-primary py-2.5 flex items-center justify-center gap-2 text-xs"
              >
                <Upload className="w-4 h-4" />
                <span>Upload From Computer</span>
              </button>

              <button
                onClick={loadDemoMedia}
                className="w-full apple-pill-secondary py-2 flex items-center justify-center gap-1.5 text-xs text-[#2997ff]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Load Interactive Demo</span>
              </button>

              {mediaSrc && (
                <button
                  onClick={() => {
                    setMediaSrc(null);
                    setMediaType(null);
                    showToast('Media removed');
                  }}
                  className="mt-1 w-full py-1 text-xs text-[#86868b] hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset to Blank Canvas</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Platform Danger Margins */}
          <div className="apple-bento-card p-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <h3 className="text-sm font-semibold text-[#f5f5f7]">Safe Margin Specs</h3>
              <span className="text-[11px] font-mono text-[#30d158]">{PLATFORMS[platform].badge}</span>
            </div>

            <p className="text-xs text-[#86868b] mt-2 mb-4 leading-relaxed">
              {PLATFORMS[platform].desc}
            </p>

            <div className="space-y-2 text-xs text-[#86868b] font-mono">
              <div className="flex justify-between pb-1.5 border-b border-white/[0.04]">
                <span>Top Danger Header</span>
                <span className="text-[#f5f5f7] font-semibold">{PLATFORMS[platform].topDanger} px</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-white/[0.04]">
                <span>Right Action Column</span>
                <span className="text-[#f5f5f7] font-semibold">{PLATFORMS[platform].rightDanger} px</span>
              </div>
              {PLATFORMS[platform].leftDanger ? (
                <div className="flex justify-between pb-1.5 border-b border-white/[0.04]">
                  <span>Left Tap Margin</span>
                  <span className="text-[#f5f5f7] font-semibold">{PLATFORMS[platform].leftDanger} px</span>
                </div>
              ) : null}
              <div className="flex justify-between">
                <span>Bottom Safe Clearance</span>
                <span className="text-[#f5f5f7] font-semibold">{PLATFORMS[platform].bottomDanger + (extraBottomMargin * 5)} px</span>
              </div>
            </div>
          </div>

          {/* Pro Editor Tip Card */}
          <div className="p-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl flex items-start gap-3">
            <Info className="w-4 h-4 text-[#2997ff] shrink-0 mt-0.5" />
            <div className="text-[11px] text-[#86868b] leading-relaxed">
              <span className="font-semibold text-[#f5f5f7] block mb-0.5">Editor Pro-Tip:</span>
              Download the 1080×1920 PNG guide and place it on your top timeline track in Premiere Pro, Final Cut, or CapCut for pixel-perfect title alignment.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
