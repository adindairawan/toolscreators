import React, { useState, useRef, useEffect } from 'react';
import { Upload, Play, Pause, Download, Eye, EyeOff, RotateCcw } from 'lucide-react';

type Platform = 'tiktok' | 'reels' | 'shorts';

interface OverlayConfig {
  name: string;
  badge: string;
  color: string;
}

const PLATFORMS: Record<Platform, OverlayConfig> = {
  tiktok: {
    name: 'TikTok FYP',
    badge: '9:16 (1080x1920)',
    color: '#00f2fe'
  },
  reels: {
    name: 'Instagram Reels',
    badge: '9:16 (1080x1920)',
    color: '#e1306c'
  },
  shorts: {
    name: 'YouTube Shorts',
    badge: '9:16 (1080x1920)',
    color: '#ff0000'
  }
};

export const SafeZoneChecker: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>('tiktok');
  const [mediaSrc, setMediaSrc] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'video' | 'image' | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [overlayOpacity, setOverlayOpacity] = useState(0.85);
  const [showOverlay, setShowOverlay] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Keyboard shortcuts
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

  const exportOverlayPNG = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw grid & safe areas on 1080x1920 canvas
    ctx.clearRect(0, 0, 1080, 1920);

    // Platform-specific overlay graphics
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 4;

    if (platform === 'tiktok') {
      // Header danger zone (Top 160px)
      ctx.fillRect(0, 0, 1080, 160);
      // Right action rail danger zone (Right 160px, vertical 600px - 1450px)
      ctx.fillRect(920, 600, 160, 850);
      // Bottom caption & audio danger zone (Bottom 400px)
      ctx.fillRect(0, 1520, 1080, 400);

      // Safe zone box outline
      ctx.strokeStyle = '#22c55e';
      ctx.strokeRect(60, 180, 840, 1320);
    } else if (platform === 'reels') {
      // Header danger zone (Top 140px)
      ctx.fillRect(0, 0, 1080, 140);
      // Right actions (Right 140px, 900px - 1500px)
      ctx.fillRect(940, 900, 140, 600);
      // Bottom caption & audio (Bottom 360px)
      ctx.fillRect(0, 1560, 1080, 360);

      // Safe zone box outline
      ctx.strokeStyle = '#22c55e';
      ctx.strokeRect(60, 160, 860, 1380);
    } else {
      // YouTube Shorts
      // Top header (Top 120px)
      ctx.fillRect(0, 0, 1080, 120);
      // Right actions (Right 150px, 800px - 1550px)
      ctx.fillRect(930, 800, 150, 750);
      // Bottom info bar (Bottom 320px)
      ctx.fillRect(0, 1600, 1080, 320);

      // Safe zone box outline
      ctx.strokeStyle = '#22c55e';
      ctx.strokeRect(60, 140, 850, 1440);
    }

    // Label watermark
    ctx.font = 'bold 32px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(`${PLATFORMS[platform].name} Safe Zone Template (1080x1920)`, 540, 960);
    ctx.font = '24px sans-serif';
    ctx.fillStyle = '#a1a1aa';
    ctx.fillText('Client-Side Creator Tools • Keep critical text inside the green box', 540, 1005);

    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `${platform}-safe-zone-template-1080x1920.png`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mr-1">Platform:</span>
          {(Object.keys(PLATFORMS) as Platform[]).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                platform === p
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {PLATFORMS[p].name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowOverlay(!showOverlay)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-200"
              title="Toggle Overlay"
            >
              {showOverlay ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{showOverlay ? 'Hide Guides' : 'Show Guides'}</span>
            </button>

            {showOverlay && (
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span>Opacity:</span>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={overlayOpacity}
                  onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
                  className="w-20 accent-purple-500 cursor-pointer"
                />
              </div>
            )}
          </div>

          <button
            onClick={exportOverlayPNG}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-zinc-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-purple-400" />
            <span>Export Guide PNG (1080x1920)</span>
          </button>
        </div>
      </div>

      {/* Main Preview Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Safe-zone Canvas / Phone Frame Viewport */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center p-6 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl min-h-[550px]">
          {/* Phone Frame Simulator (Aspect Ratio 9:16) */}
          <div className="relative w-full max-w-[340px] aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-zinc-800 flex items-center justify-center select-none">
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
                className="flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-zinc-900/50 transition-colors h-full w-full border-2 border-dashed border-zinc-700/60 rounded-2xl m-3"
              >
                <Upload className="w-10 h-10 text-purple-400 mb-3 animate-pulse" />
                <p className="text-sm font-semibold text-zinc-200">Drop MP4, MOV, or PNG here</p>
                <p className="text-xs text-zinc-500 mt-1">100% Client-Side. Never leaves your browser.</p>
              </div>
            )}

            {/* Accurate UI Safe Zone SVG Overlay */}
            {showOverlay && (
              <div
                className="absolute inset-0 pointer-events-none transition-opacity"
                style={{ opacity: overlayOpacity }}
              >
                {platform === 'tiktok' && (
                  <div className="relative w-full h-full text-white text-[10px]">
                    {/* Top Bar Header */}
                    <div className="absolute top-0 inset-x-0 h-[10%] bg-gradient-to-b from-black/70 to-transparent flex items-center justify-between px-4 pt-3">
                      <span className="opacity-60 text-[9px]">LIVE</span>
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
                        <span className="text-[8px] font-medium mt-0.5">84.2K</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">💬</div>
                        <span className="text-[8px] font-medium mt-0.5">1.2K</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">🔖</div>
                        <span className="text-[8px] font-medium mt-0.5">4.9K</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">↗️</div>
                        <span className="text-[8px] font-medium mt-0.5">Share</span>
                      </div>
                    </div>

                    {/* Bottom Caption & Audio Ticker */}
                    <div className="absolute bottom-0 inset-x-0 h-[22%] bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-3.5 pr-14">
                      <span className="font-semibold text-xs text-white">@creator_handle</span>
                      <p className="line-clamp-2 text-[10px] text-zinc-200 mt-1 leading-tight">
                        Check out this safe-zone preview. Keep all critical headlines and CTAs inside the green boundaries!
                      </p>
                      <div className="flex items-center gap-1.5 mt-2 text-[9px] text-zinc-300">
                        <span>🎵</span>
                        <span className="truncate">Original Sound - Trending Audio</span>
                      </div>
                    </div>

                    {/* Recommended Safe Area Guide Box */}
                    <div className="absolute top-[12%] bottom-[22%] left-[6%] right-[18%] border border-emerald-400/80 bg-emerald-500/5 rounded-lg flex items-center justify-center">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300/80 bg-black/60 px-2 py-0.5 rounded">
                        Safe Zone (Text & Faces)
                      </span>
                    </div>
                  </div>
                )}

                {platform === 'reels' && (
                  <div className="relative w-full h-full text-white text-[10px]">
                    {/* Top Bar Header */}
                    <div className="absolute top-0 inset-x-0 h-[8%] bg-gradient-to-b from-black/60 to-transparent flex items-center justify-between px-4 pt-3">
                      <span className="font-bold text-xs tracking-wide">Reels</span>
                      <span>📷</span>
                    </div>

                    {/* Right Side Action Rail */}
                    <div className="absolute right-2 bottom-16 flex flex-col items-center gap-3.5 z-10">
                      <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">❤️</div>
                      <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">💬</div>
                      <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">✈️</div>
                      <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">⋯</div>
                    </div>

                    {/* Bottom Caption & Audio */}
                    <div className="absolute bottom-0 inset-x-0 h-[20%] bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-3.5 pr-14">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs">brand.official</span>
                        <span className="px-2 py-0.5 border border-white/50 rounded-md text-[8px]">Follow</span>
                      </div>
                      <p className="line-clamp-2 text-[10px] text-zinc-200 mt-1 leading-tight">
                        Instagram Reels safe area: Avoid placing text near buttons or bottom caption drawer!
                      </p>
                    </div>

                    {/* Safe Area Guide Box */}
                    <div className="absolute top-[10%] bottom-[20%] left-[6%] right-[16%] border border-emerald-400/80 bg-emerald-500/5 rounded-lg flex items-center justify-center">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300/80 bg-black/60 px-2 py-0.5 rounded">
                        Reels Safe Area
                      </span>
                    </div>
                  </div>
                )}

                {platform === 'shorts' && (
                  <div className="relative w-full h-full text-white text-[10px]">
                    {/* Top Header */}
                    <div className="absolute top-0 inset-x-0 h-[8%] flex items-center justify-between px-4 pt-3">
                      <span>🔍</span>
                      <span>⋯</span>
                    </div>

                    {/* Right Side Actions */}
                    <div className="absolute right-2 bottom-16 flex flex-col items-center gap-3.5 z-10">
                      <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">👍</div>
                      <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">👎</div>
                      <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">💬</div>
                      <div className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-[11px]">↗️</div>
                    </div>

                    {/* Bottom Channel Bar */}
                    <div className="absolute bottom-0 inset-x-0 h-[18%] bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-3.5 pr-14">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs">@channel</span>
                        <span className="px-2 py-0.5 bg-red-600 rounded text-[9px] font-bold">Subscribe</span>
                      </div>
                      <p className="line-clamp-1 text-[10px] text-zinc-200 mt-1">Shorts Title Overlay Preview</p>
                    </div>

                    {/* Safe Area Guide Box */}
                    <div className="absolute top-[8%] bottom-[18%] left-[6%] right-[16%] border border-emerald-400/80 bg-emerald-500/5 rounded-lg flex items-center justify-center">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300/80 bg-black/60 px-2 py-0.5 rounded">
                        YouTube Shorts Safe Area
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Media Player Controls (if video loaded) */}
          {mediaType === 'video' && (
            <div className="w-full max-w-[340px] mt-4 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white"
                  title="Spacebar to toggle"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
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
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
                <span>{currentTime.toFixed(1)}s / {duration.toFixed(1)}s</span>
                <span>Keyboard: [Space] Play/Pause • [←/→] Frame Step</span>
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

        {/* Instructions & Tools Side Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-2xl">
            <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
              <Upload className="w-4 h-4 text-purple-400" />
              Upload Source File
            </h3>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              Upload a 9:16 vertical video (MP4/MOV) or thumbnail image (1080x1920) to check safe boundaries in real time.
            </p>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-500 font-medium text-xs rounded-xl text-white shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Choose File from Device</span>
            </button>

            {mediaSrc && (
              <button
                onClick={() => {
                  setMediaSrc(null);
                  setMediaType(null);
                }}
                className="mt-2 w-full py-1.5 text-xs text-zinc-400 hover:text-zinc-200 flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Remove & Reset File</span>
              </button>
            )}
          </div>

          <div className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-2xl">
            <h3 className="text-sm font-semibold text-zinc-200">Safe Zone Dimensions</h3>
            <div className="mt-3 space-y-2 text-xs text-zinc-400 font-mono">
              <div className="flex justify-between pb-1.5 border-b border-zinc-800">
                <span>Canvas Size</span>
                <span className="text-zinc-200">1080 × 1920 px (9:16)</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-zinc-800">
                <span>Top Safe Margin</span>
                <span className="text-zinc-200">160 px</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-zinc-800">
                <span>Bottom Safe Margin</span>
                <span className="text-zinc-200">400 px</span>
              </div>
              <div className="flex justify-between">
                <span>Right Action Margin</span>
                <span className="text-zinc-200">160 px</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-purple-950/20 border border-purple-800/30 rounded-2xl">
            <span className="text-xs font-semibold text-purple-300">💡 Pro Editor Tip</span>
            <p className="text-[11px] text-zinc-300 mt-1 leading-relaxed">
              Export the PNG overlay guide and drop it as the topmost track in Premiere Pro, CapCut, or DaVinci Resolve. Toggle track visibility before final render!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
