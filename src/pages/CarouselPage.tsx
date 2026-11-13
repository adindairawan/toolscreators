import React from 'react';
import { CarouselSplitter } from '../components/CarouselSplitter';
import { DimensionsCheatSheet } from '../components/DimensionsCheatSheet';
import { SEOHead } from '../components/SEOHead';
import { Shield, Sparkles } from 'lucide-react';

export const CarouselPage: React.FC = () => {
  return (
    <div className="space-y-24 sm:space-y-28 relative max-w-6xl mx-auto">
      <SEOHead
        title="Instagram & LinkedIn Carousel Splitter Online (1080x1350)"
        description="Free, ad-free online seamless carousel splitter for Instagram and LinkedIn. Cut panorama banners into 4:5 portrait or 1:1 square swipable cards with instant 1-click ZIP export."
        keywords="instagram carousel splitter online, panoramic swipe splitter, 4:5 carousel generator, linkedin document carousel splitter, split panoramic image for instagram"
      />

      {/* Apple HIG Header */}
      <section className="text-center max-w-3xl mx-auto pt-8 sm:pt-14 pb-2">
        <p className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-[#86868b] mb-3">
          Panoramic Canvas Studio
        </p>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-[-0.035em] text-[#f5f5f7] leading-[1.08]">
          <span className="apple-gradient-hero">Seamless Carousel Splitter.</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[#86868b] leading-relaxed max-w-2xl mx-auto font-normal">
          Upload any wide panoramic graphic or continuous infographic. Our client-side canvas engine slices it into seamless 1080×1350 (4:5) or 1080×1080 (1:1) cards with 1-click ZIP export.
        </p>

        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-[#30d158] bg-white/[0.04] border border-white/[0.08] px-3.5 py-1.5 rounded-full w-fit mx-auto">
          <Shield className="w-3.5 h-3.5" />
          <span>100% Client-Side • Lossless Compression</span>
        </div>
      </section>

      {/* Main Tool Container */}
      <div className="apple-glass rounded-[24px] p-6 sm:p-8">
        <CarouselSplitter />
      </div>

      {/* Informational SEO Guide */}
      <section className="apple-bento-card p-8 sm:p-12 space-y-8">
        <div className="border-b border-white/[0.08] pb-6">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#2997ff]">
            Creative Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#f5f5f7] tracking-tight mt-1 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#2997ff]" />
            How to Design High-Engagement Seamless Carousels
          </h2>
          <p className="text-xs sm:text-sm text-[#86868b] mt-2">
            Three simple steps to build uninterrupted swipeable stories for Instagram and LinkedIn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#86868b] leading-relaxed">
          <div className="space-y-3 p-6 bg-white/[0.02] rounded-2xl border border-white/[0.06]">
            <div className="text-sm font-semibold text-[#f5f5f7]">1. Design on One Wide Canvas</div>
            <p>
              In Figma, Photoshop, or Canva, design your graphic on a single wide artboard. For a 3-slide 4:5 carousel, use <strong>3240 × 1350 px</strong> (or 5400 × 1350 px for 5 slides).
            </p>
          </div>

          <div className="space-y-3 p-6 bg-white/[0.02] rounded-2xl border border-white/[0.06]">
            <div className="text-sm font-semibold text-[#f5f5f7]">2. Slice With Hardware Precision</div>
            <p>
              Drop your high-resolution PNG or JPG file into the splitter above. Use the interactive slider to select 2 to 10 slides and fine-tune horizontal crop framing.
            </p>
          </div>

          <div className="space-y-3 p-6 bg-white/[0.02] rounded-2xl border border-white/[0.06]">
            <div className="text-sm font-semibold text-[#f5f5f7]">3. Sequential Upload</div>
            <p>
              Download the 1-click ZIP archive. On Instagram or LinkedIn, select the cards in order (`slide-01.jpg`, `slide-02.jpg`, etc.) for uninterrupted continuous swiping.
            </p>
          </div>
        </div>
      </section>

      <DimensionsCheatSheet />
    </div>
  );
};
