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
      <div className="max-w-3xl pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.12] text-[11px] text-[#bf5af2] font-medium mb-4">
          <span>Seamless Canvas Studio</span>
          <span className="text-[#6e6e73]">•</span>
          <span className="text-[#30d158] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Client-Side • Lossless
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#f5f5f7] tracking-tight leading-tight">
          Seamless Carousel Splitter
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#86868b] leading-relaxed">
          Upload any wide panoramic graphic or continuous infographic. Our client-side canvas engine slices it into seamless 1080×1350 (4:5) or 1080×1080 (1:1) cards with 1-click ZIP export.
        </p>
      </div>

      {/* Main Tool */}
      <CarouselSplitter />

      {/* Informational SEO Guide */}
      <div className="apple-glass rounded-[32px] p-8 sm:p-10 space-y-6">
        <h2 className="text-xl font-bold text-[#f5f5f7] tracking-tight flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#bf5af2]" />
          How to Create High-Engagement Seamless Carousels
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#86868b] leading-relaxed">
          <div className="space-y-2 p-5 bg-white/[0.03] rounded-2xl border border-white/[0.06]">
            <div className="text-sm font-semibold text-[#f5f5f7]">1. Design on One Wide Canvas</div>
            <p>
              In Figma, Photoshop, or Canva, design your content on a single continuous artboard. For example, a 3-slide 4:5 carousel is <strong>3240 × 1350 px</strong> (or 5400 × 1350 for 5 slides).
            </p>
          </div>

          <div className="space-y-2 p-5 bg-white/[0.03] rounded-2xl border border-white/[0.06]">
            <div className="text-sm font-semibold text-[#f5f5f7]">2. Slice With Hardware Precision</div>
            <p>
              Drop your PNG or JPG file above. Use the slider to override between 2 to 10 slides and fine-tune your horizontal crop shift.
            </p>
          </div>

          <div className="space-y-2 p-5 bg-white/[0.03] rounded-2xl border border-white/[0.06]">
            <div className="text-sm font-semibold text-[#f5f5f7]">3. Sequence Upload</div>
            <p>
              Download the 1-click ZIP file. In Instagram or LinkedIn, select the cards in order (`slide-01.jpg`, `slide-02.jpg`, etc.) for seamless swipe continuity.
            </p>
          </div>
        </div>
      </div>

      <DimensionsCheatSheet />
    </div>
  );
};
