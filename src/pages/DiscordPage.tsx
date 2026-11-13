import React from 'react';
import { DiscordTimestamp } from '../components/DiscordTimestamp';
import { DimensionsCheatSheet } from '../components/DimensionsCheatSheet';
import { SEOHead } from '../components/SEOHead';
import { Shield, MessageSquareCode } from 'lucide-react';

export const DiscordPage: React.FC = () => {
  return (
    <div className="space-y-24 sm:space-y-28 relative max-w-6xl mx-auto">
      <SEOHead
        title="Discord Timestamp Generator (Dynamic Countdown Markdown)"
        description="Free, instant Discord timestamp generator. Pick date and time to create dynamic <t:timestamp:R> countdowns and localized date tags that auto-adjust to every Discord member's timezone."
        keywords="discord timestamp generator, discord countdown timestamp, discord date format markdown, discord dynamic time tag, discord time zone generator"
      />

      {/* Apple HIG Header */}
      <section className="text-center max-w-3xl mx-auto pt-8 sm:pt-14 pb-2">
        <p className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-[#86868b] mb-3">
          Global Time Synchronization
        </p>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-[-0.035em] text-[#f5f5f7] leading-[1.08]">
          <span className="apple-gradient-hero">Discord Dynamic Timestamps.</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[#86868b] leading-relaxed max-w-2xl mx-auto font-normal">
          Pick an event time in your local clock. Discord markdown timestamps automatically adapt to every member's personal device timezone with live relative countdowns.
        </p>

        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-[#30d158] bg-white/[0.04] border border-white/[0.08] px-3.5 py-1.5 rounded-full w-fit mx-auto">
          <Shield className="w-3.5 h-3.5" />
          <span>Automatic Local Device Timezone Conversion</span>
        </div>
      </section>

      {/* Main Tool Container */}
      <div className="apple-glass rounded-[24px] p-6 sm:p-8">
        <DiscordTimestamp />
      </div>

      {/* Discord Markdown Timestamp Cheatsheet */}
      <section className="apple-bento-card p-8 sm:p-12 space-y-8">
        <div className="border-b border-white/[0.08] pb-6">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#2997ff]">
            Markdown Reference
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#f5f5f7] tracking-tight mt-1 flex items-center gap-2">
            <MessageSquareCode className="w-5 h-5 text-[#2997ff]" />
            How Discord Native Timestamps Work
          </h2>
          <p className="text-xs sm:text-sm text-[#86868b] mt-2">
            Eliminate timezone confusion in community announcements, gaming lobbies, and event reminders.
          </p>
        </div>

        <div className="space-y-4 text-xs text-[#86868b] leading-relaxed max-w-3xl">
          <p>
            Instead of typing ambiguous static times like <em>"stream starts at 8 PM EST"</em> which requires global viewers to search for timezone converters, Discord supports native UNIX epoch tags formatted as:
          </p>
          <div className="p-4 bg-black/60 font-mono text-[#2997ff] text-sm rounded-xl border border-white/[0.08] select-all w-fit">
            &lt;t:UNIX_TIMESTAMP:FLAG&gt;
          </div>
          <p>
            When pasted into any Discord text channel, DM, or embed, Discord dynamically translates the timestamp into each viewer's personal clock, accounting for local daylight saving time and 12/24-hour OS settings automatically.
          </p>
        </div>
      </section>

      <DimensionsCheatSheet />
    </div>
  );
};
