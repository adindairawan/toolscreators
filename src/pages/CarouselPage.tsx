import React from 'react';
import { CarouselSplitter } from '../components/CarouselSplitter';
import { DimensionsCheatSheet } from '../components/DimensionsCheatSheet';
import { SEOHead } from '../components/SEOHead';
import { ShieldCheck, Sparkles } from 'lucide-react';

export const CarouselPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <SEOHead
        title="Instagram & LinkedIn Carousel Splitter Online (1080x1350)"
        description="Free, ad-free online seamless carousel splitter for Instagram and LinkedIn. Cut panorama banners into 4:5 portrait or 1:1 square swipable cards with instant 1-click ZIP export."
        keywords="instagram carousel splitter online, panoramic swipe splitter, 4:5 carousel generator, linkedin document carousel splitter, split panoramic image for instagram"
      />

      {/* Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-purple-400 font-semibold mb-2">
          <span>PANORAMA & INFOGRAPHIC UTILITY</span>
          <span>•</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Client-Side • Instant ZIP
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Instagram & LinkedIn Seamless Carousel Splitter
        </h1>
        <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
          Upload any wide panoramic image or continuous infographic. Our client-side canvas engine slices it into seamless 1080×1350 (4:5) or 1080×1080 (1:1) cards so followers can swipe across an uninterrupted visual journey.
        </p>
      </div>

      {/* Main Tool */}
      <CarouselSplitter />

      {/* Informational SEO Guide */}
      <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          How to Create High-Engagement Seamless Carousels
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-400 leading-relaxed">
          <div className="space-y-2 p-4 bg-zinc-950/60 rounded-2xl border border-zinc-800/80">
            <div className="text-sm font-semibold text-zinc-200">1. Design on One Wide Canvas</div>
            <p>
              In Figma, Photoshop, or Canva, design your content on a single wide artboard. For example, a 3-slide 4:5 carousel is <strong>3240 × 1350 px</strong> (or 5400 × 1350 for 5 slides).
            </p>
          </div>

          <div className="space-y-2 p-4 bg-zinc-950/60 rounded-2xl border border-zinc-800/80">
            <div className="text-sm font-semibold text-zinc-200">2. Slice Without Quality Loss</div>
            <p>
              Upload your PNG or JPG file above. Use the slider to choose between 2 to 10 slides and fine-tune your horizontal crop shift.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-zinc-950/60 rounded-2xl border border-zinc-800/80">
            <div className="text-sm font-semibold text-zinc-200">3. Upload in Sequence to Instagram</div>
            <p>
              Download the 1-click ZIP file. In Instagram or LinkedIn, select multiple images in order (`slide-01.jpg`, `slide-02.jpg`, etc.).
            </p>
          </div>
        </div>
      </div>

      <DimensionsCheatSheet />
    </div>
  );
};
