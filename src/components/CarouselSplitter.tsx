import React, { useState, useRef } from 'react';
import { Download, Grid, Layers } from 'lucide-react';
import JSZip from 'jszip';

type AspectRatioMode = 'square' | 'portrait';

interface SlideSlice {
  index: number;
  dataUrl: string;
}

export const CarouselSplitter: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [aspectMode, setAspectMode] = useState<AspectRatioMode>('portrait');
  const [slices, setSlices] = useState<SlideSlice[]>([]);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;
    img.onload = () => {
      setOriginalDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      setImageSrc(url);
      processSlices(img, aspectMode);
    };
  };

  const processSlices = (img: HTMLImageElement, mode: AspectRatioMode) => {
    const targetW = 1080;
    const targetH = mode === 'portrait' ? 1350 : 1080;
    const targetRatioLocal = targetW / targetH;

    // How many slides fit into this image?
    const totalRatio = img.naturalWidth / img.naturalHeight;
    const estimatedSlides = Math.max(1, Math.round(totalRatio / targetRatioLocal));

    const slideWidthInImage = img.naturalWidth / estimatedSlides;
    const generatedSlices: SlideSlice[] = [];

    for (let i = 0; i < estimatedSlides; i++) {
      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (!ctx) continue;

      // Draw slice
      ctx.drawImage(
        img,
        i * slideWidthInImage,
        0,
        slideWidthInImage,
        img.naturalHeight,
        0,
        0,
        targetW,
        targetH
      );

      generatedSlices.push({
        index: i + 1,
        dataUrl: canvas.toDataURL('image/jpeg', 0.95),
      });
    }

    setSlices(generatedSlices);
  };

  const handleModeChange = (mode: AspectRatioMode) => {
    setAspectMode(mode);
    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => processSlices(img, mode);
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
    a.download = `carousel-slides-${slices.length}-pack.zip`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mr-1">Target Format:</span>
          <button
            onClick={() => handleModeChange('portrait')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              aspectMode === 'portrait'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            4:5 Portrait (1080×1350) — Recommended
          </button>
          <button
            onClick={() => handleModeChange('square')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
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
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-xs font-medium shadow-lg shadow-purple-600/25 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download All ({slices.length} Slides ZIP)</span>
          </button>
        )}
      </div>

      {!imageSrc ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-zinc-800 hover:border-purple-500/50 rounded-2xl p-16 flex flex-col items-center justify-center text-center cursor-pointer bg-zinc-900/30 hover:bg-zinc-900/60 transition-all"
        >
          <div className="p-4 bg-purple-600/10 text-purple-400 rounded-2xl mb-4">
            <Layers className="w-10 h-10" />
          </div>
          <h3 className="text-base font-semibold text-zinc-200">Upload Seamless Panorama or Banner</h3>
          <p className="text-xs text-zinc-400 max-w-md mt-1.5 leading-relaxed">
            Drop an ultrawide canvas (e.g. 3240×1080 for 3 slides, or 5400×1350 for 5 slides). We will automatically split it into pixel-perfect seamless swipable cards.
          </p>
          <span className="mt-4 px-3 py-1 text-[11px] bg-zinc-800 text-zinc-300 rounded-md">
            100% Client-Side • Instant • No Loss of Quality
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
          {/* Slices Preview Grid */}
          <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Grid className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-semibold text-zinc-200">
                  Generated {slices.length} Seamless Slides
                </h3>
                {originalDimensions && (
                  <span className="text-[11px] font-mono text-zinc-500">
                    (Source: {originalDimensions.width}×{originalDimensions.height}px)
                  </span>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
              >
                Upload different image
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {slices.map((slice) => (
                <div
                  key={slice.index}
                  className="group relative bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 shadow-md"
                >
                  <img
                    src={slice.dataUrl}
                    alt={`Slide ${slice.index}`}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur text-[10px] font-mono rounded text-zinc-200">
                    #{slice.index}
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
