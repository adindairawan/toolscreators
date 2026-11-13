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
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mr-1">Target Format:</span>
          <button
            onClick={() => handleModeChange('portrait')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${
              aspectMode === 'portrait'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            4:5 Portrait (1080×1350)
          </button>
          <button
            onClick={() => handleModeChange('square')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${
              aspectMode === 'square'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            1:1 Square (1080×1080)
          </button>
        </div>

        {slices.length > 0 && (
          <button
            onClick={downloadAllAsZip}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-medium shadow-lg shadow-purple-600/25 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download All ({slices.length} Slides ZIP)</span>
          </button>
        )}
      </div>

      {!imageSrc ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-zinc-800 hover:border-purple-500/50 rounded-3xl p-16 flex flex-col items-center justify-center text-center cursor-pointer bg-zinc-900/30 hover:bg-zinc-900/60 transition-all"
        >
          <div className="p-4 bg-purple-600/10 text-purple-400 rounded-2xl mb-4">
            <Layers className="w-10 h-10" />
          </div>
          <h3 className="text-base font-semibold text-zinc-200">Upload Panoramic Banner or Infographic</h3>
          <p className="text-xs text-zinc-400 max-w-md mt-1.5 leading-relaxed">
            Drop your wide canvas (e.g. 3240×1080 or 5400×1350). We will split it into seamless, swipable Instagram/LinkedIn cards with zero compression or watermarks.
          </p>
          <span className="mt-4 px-3 py-1 text-[11px] bg-zinc-800 text-zinc-300 rounded-full">
            100% Client-Side • Instant ZIP Export
          </span>
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
          <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slide Count Slider (2 to 10) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-zinc-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sliders className="w-3.5 h-3.5 text-purple-400" />
                  <span>Number of Slices:</span>
                </span>
                <span className="font-mono font-bold text-purple-400 bg-zinc-800 px-2 py-0.5 rounded">
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
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>2 slides</span>
                <span>5 slides</span>
                <span>10 slides</span>
              </div>
            </div>

            {/* Horizontal Crop Offset Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-zinc-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <MoveHorizontal className="w-3.5 h-3.5 text-purple-400" />
                  <span>Horizontal Crop Shift:</span>
                </span>
                <span className="font-mono text-zinc-400">{horizontalOffset}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={horizontalOffset}
                onChange={(e) => handleOffsetChange(parseInt(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
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
