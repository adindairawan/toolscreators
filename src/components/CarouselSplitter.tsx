import React, { useState, useRef } from 'react';
import { Download, Grid, Layers, Sliders, MoveHorizontal, RotateCcw } from 'lucide-react';
import JSZip from 'jszip';

type AspectRatioMode = 'portrait' | 'square';

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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageElementRef = useRef<HTMLImageElement | null>(null);

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

      // Auto calculate initial slide count based on aspect ratio
      const targetW = 1080;
      const targetH = aspectMode === 'portrait' ? 1350 : 1080;
      const targetRatioLocal = targetW / targetH;
      const totalRatio = img.naturalWidth / img.naturalHeight;
      const estimated = Math.min(10, Math.max(2, Math.round(totalRatio / targetRatioLocal)));

      setSlideCount(estimated);
      setHorizontalOffset(0);
      generateSlices(img, estimated, aspectMode, 0);
    };
  };

  const generateSlices = (
    img: HTMLImageElement,
    count: number,
    mode: AspectRatioMode,
    offsetPercent: number
  ) => {
    const targetW = 1080;
    const targetH = mode === 'portrait' ? 1350 : 1080;
    const targetRatio = targetW / targetH;

    // The total width of all slices in the source image
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
      zip.file(`slide-${String(slice.index).padStart(2, '0')}.jpg`, base64Data, { base64: true });
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `carousel-${slices.length}-slides.zip`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 apple-glass rounded-2xl">
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-full border border-white/[0.08]">
          <span className="text-[11px] font-medium text-[#86868b] px-3">Format</span>
          <button
            onClick={() => handleModeChange('portrait')}
            className={`px-3.5 py-1 text-xs rounded-full transition-all ${
              aspectMode === 'portrait'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-[#86868b] hover:text-[#f5f5f7]'
            }`}
          >
            4:5 Portrait (1080×1350)
          </button>
          <button
            onClick={() => handleModeChange('square')}
            className={`px-3.5 py-1 text-xs rounded-full transition-all ${
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
            className="apple-pill-primary flex items-center gap-2 text-xs py-2 px-5 shadow-lg"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download {slices.length} Slides (.ZIP)</span>
          </button>
        )}
      </div>

      {!imageSrc ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="apple-bento-card p-16 sm:p-20 flex flex-col items-center justify-center text-center cursor-pointer hover:border-white/[0.2] transition-all group"
        >
          <div className="w-16 h-16 rounded-3xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Layers className="w-7 h-7 text-[#bf5af2]" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#f5f5f7] tracking-tight">
            Drop Panoramic Banner or Infographic
          </h3>
          <p className="text-xs sm:text-sm text-[#86868b] max-w-md mt-2 leading-relaxed">
            Upload an ultra-wide canvas (e.g. 3240×1080 or 5400×1350). The browser slices it into seamless swipe cards with 100% loss-free clarity.
          </p>
          <div className="mt-6 flex items-center gap-2 text-[11px] text-[#30d158] bg-white/[0.04] border border-white/[0.08] px-3.5 py-1.5 rounded-full">
            <span>Instant Client ZIP Export</span>
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
            {/* Slide Count Slider (2 to 10) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#f5f5f7]">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sliders className="w-3.5 h-3.5 text-[#2997ff]" />
                  <span>Number of Slices:</span>
                </span>
                <span className="font-mono font-bold text-white bg-white/[0.1] px-2.5 py-0.5 rounded-full">
                  {slideCount} Slides
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="10"
                step="1"
                value={slideCount}
                onChange={(e) => handleSlideCountChange(parseInt(e.target.value))}
                className="w-full accent-[#2997ff] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#86868b] font-mono">
                <span>2 slides</span>
                <span>5 slides</span>
                <span>10 slides</span>
              </div>
            </div>

            {/* Horizontal Crop Offset Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#f5f5f7]">
                <span className="flex items-center gap-1.5 font-medium">
                  <MoveHorizontal className="w-3.5 h-3.5 text-[#bf5af2]" />
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
                className="w-full accent-[#bf5af2] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#86868b] font-mono">
                <span>Left Aligned</span>
                <span>Center</span>
                <span>Right Aligned</span>
              </div>
            </div>
          </div>

          {/* Generated Slices Grid */}
          <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Grid className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-semibold text-zinc-200">
                  {slices.length} Seamless Slide Previews
                </h3>
                {originalDimensions && (
                  <span className="text-[11px] font-mono text-zinc-500">
                    ({originalDimensions.width}×{originalDimensions.height}px Source)
                  </span>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Upload New Image</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {slices.map((slice) => (
                <div
                  key={slice.index}
                  className="group relative bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-lg"
                >
                  <img
                    src={slice.dataUrl}
                    alt={`Slide ${slice.index}`}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/75 backdrop-blur text-[10px] font-mono rounded text-zinc-200">
                    Slide {slice.index}
                  </div>
                  <a
                    href={slice.dataUrl}
                    download={`slide-${slice.index}.jpg`}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1.5 text-xs text-white transition-opacity font-medium"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
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
