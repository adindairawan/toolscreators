import React, { useState, useRef, useEffect } from 'react';
import { Upload, Play, Pause, Download, Eye, EyeOff, RotateCcw, Sliders, Palette } from 'lucide-react';

export type Platform = 'tiktok' | 'reels' | 'shorts';

interface OverlayConfig {
  name: string;
  badge: string;
  topDanger: number; // in pixels of 1080x1920
  bottomDanger: number;
  rightDanger: number;
}

const PLATFORMS: Record<Platform, OverlayConfig> = {
  tiktok: {
    name: 'TikTok FYP',
    badge: '9:16 (1080x1920)',
    topDanger: 160,
    bottomDanger: 400,
    rightDanger: 160,
  },
  reels: {
    name: 'Instagram Reels',
    badge: '9:16 (1080x1920)',
    topDanger: 140,
    bottomDanger: 360,
    rightDanger: 140,
  },
  shorts: {
    name: 'YouTube Shorts',
    badge: '9:16 (1080x1920)',
    topDanger: 120,
    bottomDanger: 320,
    rightDanger: 150,
  },
};

const GUIDE_COLORS = [
  { name: 'Emerald', value: '#10b981', borderClass: 'border-emerald-400', bgClass: 'bg-emerald-500/10' },
  { name: 'Cyan', value: '#06b6d4', borderClass: 'border-cyan-400', bgClass: 'bg-cyan-500/10' },
  { name: 'Yellow', value: '#eab308', borderClass: 'border-yellow-400', bgClass: 'bg-yellow-500/10' },
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    if (file.type.startsWith('video/')) {
      setMediaType('video');
      setMediaSrc(url);
      setIsPlaying(false);
    } else if (file.type.startsWith('image/')) {
      setMediaType('image');
      setMediaSrc(url);
      setIsPlaying(false);
    }
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

  // Spacebar and left/right frame stepping
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
    const bottomMargin = cfg.bottomDanger + (extraBottomMargin * 5); // adjust bottom
    const rightMargin = cfg.rightDanger;

    // Danger overlays (translucent dark)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    // Top
    ctx.fillRect(0, 0, 1080, topMargin);
    // Right action rail
    ctx.fillRect(1080 - rightMargin, topMargin, rightMargin, 1920 - topMargin - bottomMargin);
    // Bottom
    ctx.fillRect(0, 1920 - bottomMargin, 1080, bottomMargin);

    // Safe area outline box
    ctx.strokeStyle = activeColor.value;
    ctx.lineWidth = 4;
    ctx.strokeRect(60, topMargin + 20, 1080 - rightMargin - 80, 1920 - topMargin - bottomMargin - 40);

    // Template Watermark Text
    ctx.font = 'bold 36px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(`${cfg.name} 1080x1920 Safe Zone Template`, 540, 960);
    ctx.font = '24px sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText('Client-Side Creator Tools • Keep key headlines inside the guide boundary', 540, 1010);

    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `${platform}-safe-zone-guide-1080x1920.png`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 apple-glass rounded-2xl">
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-full border border-white/[0.08]">
          <span className="text-[11px] font-medium text-[#86868b] px-3">Platform</span>
          {(Object.keys(PLATFORMS) as Platform[]).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`px-3 py-1 text-xs rounded-full transition-all ${
                platform === p
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-[#86868b] hover:text-[#f5f5f7]'
              }`}
            >
              {PLATFORMS[p].name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
              showAdvanced
                ? 'bg-white/[0.15] text-white border-white/[0.2]'
                : 'bg-white/[0.05] text-[#86868b] border-white/[0.08] hover:text-[#f5f5f7]'
            }`}
          >
            <Sliders className="w-3 h-3 text-[#2997ff]" />
            <span>Customize</span>
          </button>

          <button
            onClick={() => setShowOverlay(!showOverlay)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] rounded-full text-[#86868b] hover:text-[#f5f5f7] transition-colors"
          >
            {showOverlay ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span>{showOverlay ? 'Hide Guides' : 'Show Guides'}</span>
          </button>

          <button
            onClick={exportOverlayPNG}
            className="apple-btn-blue flex items-center gap-1.5 text-xs py-1.5 px-4"
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
              <span>Guide Color Contrast</span>
            </span>
            <div className="flex gap-2 pt-1">
              {GUIDE_COLORS.map((col, idx) => (
                <button
                  key={col.name}
                  onClick={() => setSelectedColorIndex(idx)}
                  className={`w-6 h-6 rounded-full border-2 transition-transform ${
                    selectedColorIndex === idx ? 'scale-125 border-white shadow-md' : 'border-transparent'
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
              <span>Caption Padding Offset</span>
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
        <div className="lg:col-span-8 flex flex-col items-center justify-center p-6 sm:p-10 apple-glass rounded-[32px] min-h-[620px]">
          {/* Apple iPhone Pro Bezel Simulator (Aspect Ratio 9:16) */}
          <div className="relative w-full max-w-[340px] aspect-[9/16] bg-black rounded-[44px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-[5px] border-[#38383a] ring-1 ring-white/10 flex items-center justify-center select-none">
            {/* Dynamic Island Notch */}
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
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-white/[0.04] transition-colors h-full w-full border-2 border-dashed border-white/10 rounded-[32px] m-3"
              >
                <div className="w-12 h-12 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center mb-3">
                  <Upload className="w-5 h-5 text-[#2997ff]" />
                </div>
                <p className="text-sm font-semibold text-[#f5f5f7]">Drop MP4, MOV, or PNG</p>
                <p className="text-[11px] text-[#86868b] mt-1">100% In-Memory Preview</p>
              </div>
            )}

            {/* SVG Vector Overlays */}
            {showOverlay && (
              <div
                className="absolute inset-0 pointer-events-none transition-opacity"
                style={{ opacity: overlayOpacity }}
              >
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
                        Safe Area
                      </span>
                    </div>
                  </div>
                )}

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

          {/* Media Player Scrubber */}
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

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*,image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>

        {/* Side Panel Controls & Guide */}
        <div className="lg:col-span-4 space-y-4">
          <div className="apple-bento-card p-6">
            <h3 className="text-sm font-semibold text-[#f5f5f7] flex items-center gap-2">
              <Upload className="w-4 h-4 text-[#2997ff]" />
              Source Material
            </h3>
            <p className="text-xs text-[#86868b] mt-1.5 leading-relaxed">
              Drop any vertical video (MP4/MOV) or thumbnail (1080×1920). Instant client playback.
            </p>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-5 w-full apple-pill-primary py-2.5 flex items-center justify-center gap-2 text-xs"
            >
              <Upload className="w-4 h-4" />
              <span>Choose From Device</span>
            </button>

            {mediaSrc && (
              <button
                onClick={() => {
                  setMediaSrc(null);
                  setMediaType(null);
                }}
                className="mt-3 w-full py-1 text-xs text-[#86868b] hover:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Remove Media</span>
              </button>
            )}
          </div>

          <div className="apple-bento-card p-6">
            <h3 className="text-sm font-semibold text-[#f5f5f7]">Safe Margin Specifications</h3>
            <div className="mt-4 space-y-2.5 text-xs text-[#86868b] font-mono">
              <div className="flex justify-between pb-2 border-b border-white/[0.06]">
                <span>Top Margin</span>
                <span className="text-[#f5f5f7]">{PLATFORMS[platform].topDanger} px</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/[0.06]">
                <span>Right Actions</span>
                <span className="text-[#f5f5f7]">{PLATFORMS[platform].rightDanger} px</span>
              </div>
              <div className="flex justify-between">
                <span>Bottom Caption</span>
                <span className="text-[#f5f5f7]">{PLATFORMS[platform].bottomDanger + (extraBottomMargin * 5)} px</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl">
            <span className="text-xs font-semibold text-[#2997ff]">Editor Workflow</span>
            <p className="text-[11px] text-[#86868b] mt-1 leading-relaxed">
              Export the 1080×1920 PNG guide and lock it on the top track in Final Cut Pro, Premiere, or CapCut for zero-guesswork positioning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
