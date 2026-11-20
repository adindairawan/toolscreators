import React, { useState, useRef } from 'react';
import { Download, Grid, Layers, Sliders, MoveHorizontal, RotateCcw, Sparkles, Check } from 'lucide-react';
import JSZip from 'jszip';

export type AspectRatioMode = 'portrait' | 'square' | 'story';

interface SlideSlice {
  index: number;
  dataUrl: string;
}

export const CarouselSplitter: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [aspectMode, setAspectMode] = useState<AspectRatioMode>('portrait');
  const [slideCount, setSlideCount] = useState<number>(3);
  const [horizontalOffset, setHorizontalOffset] = useState<number>(0); // 0 to 100%
  const [slices, setSlices] = useState<SlideSlice[]>([]);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageElementRef = useRef<HTMLImageElement | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;
    img.onload = () => {
      imageElementRef.current = img;
      setOriginalDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      setImageSrc(url);

      const targetW = 1080;
      const targetH = aspectMode === 'portrait' ? 1350 : aspectMode === 'square' ? 1080 : 1920;
      const targetRatioLocal = targetW / targetH;
      const totalRatio = img.naturalWidth / img.naturalHeight;
      const estimated = Math.min(10, Math.max(2, Math.round(totalRatio / targetRatioLocal)));

      setSlideCount(estimated);
      setHorizontalOffset(0);
      generateSlices(img, estimated, aspectMode, 0);
      showToast(`Loaded banner (${img.naturalWidth}×${img.naturalHeight}px)`);
    };
  };

  const loadSamplePanorama = () => {
    const canvas = document.createElement('canvas');
    // Panoramic canvas: 3240 x 1080 (3 slides of 1080x1080 or adaptable)
    canvas.width = 3240;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Cinematic continuous horizon gradient
    const grad = ctx.createLinearGradient(0, 0, 3240, 1350);
    grad.addColorStop(0, '#09101d');
    grad.addColorStop(0.35, '#152438');
    grad.addColorStop(0.65, '#1e334f');
    grad.addColorStop(1, '#0c1524');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 3240, 1350);

    // Continuous mountain wave line across all 3 slides
    ctx.beginPath();
    ctx.moveTo(0, 950);
    ctx.bezierCurveTo(600, 650, 1000, 1100, 1620, 750);
    ctx.bezierCurveTo(2200, 450, 2700, 950, 3240, 700);
    ctx.lineTo(3240, 1350);
    ctx.lineTo(0, 1350);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 113, 227, 0.25)';
    ctx.fill();

    // Foreground ridge
    ctx.beginPath();
    ctx.moveTo(0, 1100);
    ctx.bezierCurveTo(800, 900, 1400, 1200, 2160, 980);
    ctx.bezierCurveTo(2800, 800, 3000, 1150, 3240, 1050);
    ctx.lineTo(3240, 1350);
    ctx.lineTo(0, 1350);
    ctx.closePath();
    ctx.fillStyle = 'rgba(48, 209, 88, 0.15)';
    ctx.fill();

    // Slide separator dotted guidelines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.setLineDash([12, 12]);
    ctx.beginPath();
    ctx.moveTo(1080, 0);
    ctx.lineTo(1080, 1350);
    ctx.moveTo(2160, 0);
    ctx.lineTo(2160, 1350);
    ctx.stroke();
    ctx.setLineDash([]);

    // Typography spanning across the seamless canvas
    ctx.font = 'bold 84px -apple-system, sans-serif';
    ctx.fillStyle = '#f5f5f7';
    ctx.textAlign = 'left';
    ctx.fillText('SEAMLESS PANORAMIC STORY EXPERIENCE', 120, 420);

    ctx.font = '40px -apple-system, sans-serif';
    ctx.fillStyle = '#30d158';
    ctx.fillText('Swipe to continue →', 120, 500);

    ctx.fillStyle = '#86868b';
    ctx.font = '36px -apple-system, sans-serif';
    ctx.fillText('Continuous visual narratives that bridge across consecutive story slides.', 1200, 500);
    ctx.fillText('Export in 1-click as a ready-to-post image collection.', 2280, 500);

    // Number marks on each frame
    ctx.font = 'bold 120px -apple-system, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillText('01', 120, 240);
    ctx.fillText('02', 1200, 240);
    ctx.fillText('03', 2280, 240);

    const url = canvas.toDataURL('image/jpeg', 0.95);
    const img = new Image();
    img.src = url;
    img.onload = () => {
      imageElementRef.current = img;
      setOriginalDimensions({ width: 3240, height: 1350 });
      setImageSrc(url);
      setSlideCount(3);
      setHorizontalOffset(0);
      generateSlices(img, 3, aspectMode, 0);
      showToast('Loaded interactive sample panoramic banner');
    };
  };

  const generateSlices = (
    img: HTMLImageElement,
    count: number,
    mode: AspectRatioMode,
    offsetPercent: number
  ) => {
    const targetW = 1080;
    const targetH = mode === 'portrait' ? 1350 : mode === 'square' ? 1080 : 1920;
    const targetRatio = targetW / targetH;

    const idealTotalWidthInSource = img.naturalHeight * targetRatio * count;
    const availableExtraWidth = Math.max(0, img.naturalWidth - idealTotalWidthInSource);
    const startX = (availableExtraWidth * offsetPercent) / 100;
    const sliceWidthInSource = Math.min(img.naturalWidth / count, img.naturalHeight * targetRatio);

    const generated: SlideSlice[] = [];

    for (let i = 0; i < count; i++) {
      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (!ctx) continue;

      const sx = startX + i * sliceWidthInSource;
      const sy = 0;
      const sWidth = sliceWidthInSource;
      const sHeight = img.naturalHeight;

      ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetW, targetH);

      generated.push({
        index: i + 1,
        dataUrl: canvas.toDataURL('image/jpeg', 0.95),
      });
    }

    setSlices(generated);
  };

  const handleModeChange = (mode: AspectRatioMode) => {
    setAspectMode(mode);
    if (imageElementRef.current) {
      generateSlices(imageElementRef.current, slideCount, mode, horizontalOffset);
      const label = mode === 'story' ? 'Story (9:16 — 1080×1920)' : mode === 'portrait' ? 'Portrait (4:5 — 1080×1350)' : 'Square (1:1 — 1080×1080)';
      showToast(`Switched format to ${label}`);
    }
  };

  const handleSlideCountChange = (newCount: number) => {
    setSlideCount(newCount);
    if (imageElementRef.current) {
      generateSlices(imageElementRef.current, newCount, aspectMode, horizontalOffset);
    }
  };

  const handleOffsetChange = (newOffset: number) => {
    setHorizontalOffset(newOffset);
    if (imageElementRef.current) {
      generateSlices(imageElementRef.current, slideCount, aspectMode, newOffset);
    }
  };

  const downloadAllAsZip = async () => {
    if (slices.length === 0) return;
    const zip = new JSZip();

    slices.forEach((slice) => {
      const base64Data = slice.dataUrl.replace(/^data:image\/jpeg;base64,/, '');
      const prefix = aspectMode === 'story' ? 'story' : 'slide';
      zip.file(`${prefix}-${String(slice.index).padStart(2, '0')}.jpg`, base64Data, { base64: true });
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${aspectMode === 'story' ? 'story-collection' : 'carousel'}-${slices.length}-slides.zip`;
    a.click();
    showToast(`✓ Packaged and downloaded ${slices.length} slides (.zip)`);
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
        <div className="flex items-center gap-1 bg-black/50 p-1 rounded-full border border-white/[0.08] overflow-x-auto max-w-full">
          <span className="text-[11px] font-medium text-[#86868b] px-3 hidden sm:inline">Format</span>
          
          <button
            onClick={() => handleModeChange('story')}
            className={`px-3.5 py-1.5 text-xs rounded-full transition-all whitespace-nowrap flex items-center gap-1.5 ${
              aspectMode === 'story'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-[#86868b] hover:text-[#f5f5f7]'
            }`}
          >
            <span>Story Collection (9:16)</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#30d158]/20 text-[#30d158] font-bold">NEW</span>
          </button>

          <button
            onClick={() => handleModeChange('portrait')}
            className={`px-3.5 py-1.5 text-xs rounded-full transition-all whitespace-nowrap ${
              aspectMode === 'portrait'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-[#86868b] hover:text-[#f5f5f7]'
            }`}
          >
            4:5 Portrait (1080×1350)
          </button>

          <button
            onClick={() => handleModeChange('square')}
            className={`px-3.5 py-1.5 text-xs rounded-full transition-all whitespace-nowrap ${
              aspectMode === 'square'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-[#86868b] hover:text-[#f5f5f7]'
            }`}
          >
            1:1 Square (1080×1080)
          </button>
        </div>

        {slices.length > 0 && (
          <button
            onClick={downloadAllAsZip}
            className="apple-btn-blue flex items-center gap-2 text-xs py-2 px-5 shadow-lg"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download {slices.length} {aspectMode === 'story' ? 'Stories' : 'Slides'} (.ZIP)</span>
          </button>
        )}
      </div>

      {!imageSrc ? (
        <div className="apple-bento-card p-12 sm:p-20 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center mb-6">
            <Layers className="w-7 h-7 text-[#2997ff]" />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#f5f5f7] tracking-tight">
            Drop Panoramic Banner or Graphic
          </h3>
          <p className="text-xs sm:text-sm text-[#86868b] max-w-md mt-2 leading-relaxed">
            Upload an ultra-wide canvas (e.g. 3240×1080 or 5400×1920). Slices automatically into continuous swipe cards or vertical story collections.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="apple-pill-primary py-2.5 px-6 flex items-center justify-center gap-2 text-xs"
            >
              <Layers className="w-4 h-4" />
              <span>Choose Image From Device</span>
            </button>

            <button
              onClick={loadSamplePanorama}
              className="apple-pill-secondary py-2.5 px-6 flex items-center justify-center gap-2 text-xs text-[#2997ff] border-[#2997ff]/30 hover:border-[#2997ff]/60"
            >
              <Sparkles className="w-4 h-4" />
              <span>Try Sample Panorama</span>
            </button>
          </div>

          <div className="mt-8 flex items-center gap-2 text-[11px] text-[#30d158] bg-white/[0.04] border border-white/[0.08] px-3.5 py-1.5 rounded-full">
            <span>100% In-Browser Memory • Lossless ZIP Export</span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Sliders Control Panel */}
          <div className="p-6 apple-bento-card grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Slide Count Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#f5f5f7]">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sliders className="w-3.5 h-3.5 text-[#2997ff]" />
                  <span>Number of Slices:</span>
                </span>
                <span className="font-mono font-bold text-white bg-white/[0.1] px-2.5 py-0.5 rounded-full">
                  {slideCount} {aspectMode === 'story' ? 'Stories' : 'Slides'}
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="10"
                step="1"
                value={slideCount}
                onChange={(e) => handleSlideCountChange(parseInt(e.target.value))}
                className="w-full accent-[#0071e3] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#86868b] font-mono">
                <span>2 {aspectMode === 'story' ? 'stories' : 'slides'}</span>
                <span>5 {aspectMode === 'story' ? 'stories' : 'slides'}</span>
                <span>10 {aspectMode === 'story' ? 'stories' : 'slides'}</span>
              </div>
            </div>

            {/* Horizontal Crop Offset Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#f5f5f7]">
                <span className="flex items-center gap-1.5 font-medium">
                  <MoveHorizontal className="w-3.5 h-3.5 text-[#2997ff]" />
                  <span>Horizontal Crop Shift:</span>
                </span>
                <span className="font-mono text-[#86868b]">{horizontalOffset}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={horizontalOffset}
                onChange={(e) => handleOffsetChange(parseInt(e.target.value))}
                className="w-full accent-[#0071e3] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#86868b] font-mono">
                <span>Left Aligned</span>
                <span>Center Focus</span>
                <span>Right Aligned</span>
              </div>
            </div>
          </div>

          {/* Generated Slices Grid */}
          <div className="p-6 apple-glass rounded-[24px]">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2">
                <Grid className="w-4 h-4 text-[#2997ff]" />
                <h3 className="text-sm font-semibold text-[#f5f5f7]">
                  {slices.length} {aspectMode === 'story' ? 'Vertical Story Slides (9:16)' : 'Seamless Feed Cards'}
                </h3>
                {originalDimensions && (
                  <span className="text-[11px] font-mono text-[#86868b]">
                    ({originalDimensions.width}×{originalDimensions.height}px Source)
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={loadSamplePanorama}
                  className="text-xs text-[#86868b] hover:text-white flex items-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-[#2997ff]" />
                  <span>Reload Demo</span>
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-[#2997ff] hover:underline flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Upload Another Image</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {slices.map((slice) => (
                <div
                  key={slice.index}
                  className="group relative bg-[#1c1c1e] rounded-xl overflow-hidden border border-white/[0.08] shadow-md hover:border-white/20 transition-all"
                >
                  <img
                    src={slice.dataUrl}
                    alt={`Slide ${slice.index}`}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 backdrop-blur text-[10px] font-mono rounded text-[#f5f5f7]">
                    {aspectMode === 'story' ? `Story ${slice.index}` : `Slide ${slice.index}`}
                  </div>
                  <a
                    href={slice.dataUrl}
                    download={`${aspectMode === 'story' ? 'story' : 'slide'}-${slice.index}.jpg`}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1.5 text-xs text-white transition-opacity font-medium"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Single</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      )}
    </div>
  );
};
