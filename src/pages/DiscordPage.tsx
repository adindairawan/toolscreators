import React from 'react';
import { DiscordTimestamp } from '../components/DiscordTimestamp';
import { SEOHead } from '../components/SEOHead';
import { ShieldCheck, MessageSquareCode } from 'lucide-react';

export const DiscordPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <SEOHead
        title="Discord Timestamp Generator (Dynamic Countdown Markdown)"
        description="Free, instant Discord timestamp generator. Pick date and time to create dynamic <t:timestamp:R> countdowns and localized date tags that auto-adjust to every Discord member's timezone."
        keywords="discord timestamp generator, discord countdown timestamp, discord date format markdown, discord dynamic time tag, discord time zone generator"
      />

      {/* Header */}
      <div className="max-w-3xl pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.12] text-[11px] text-[#2997ff] font-medium mb-4">
          <span>Global Time Sync Studio</span>
          <span className="text-[#6e6e73]">•</span>
          <span className="text-[#30d158] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Automatic Local Device Timezone
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#f5f5f7] tracking-tight leading-tight">
          Discord Dynamic Timestamps
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#86868b] leading-relaxed">
          Select an event date and time in your local clock. Discord markdown timestamps automatically translate into every server member's personal device timezone and render live relative countdowns (e.g. "in 3 hours").
        </p>
      </div>

      {/* Main Tool */}
      <DiscordTimestamp />

      {/* Discord Markdown Timestamp Cheatsheet */}
      <div className="apple-glass rounded-[32px] p-8 sm:p-10 space-y-6">
        <h2 className="text-xl font-bold text-[#f5f5f7] tracking-tight flex items-center gap-2">
          <MessageSquareCode className="w-4 h-4 text-[#2997ff]" />
          How Discord Timestamps Work
        </h2>

        <div className="space-y-4 text-xs text-[#86868b] leading-relaxed">
          <p>
            Instead of typing ambiguous dates like <em>"meeting at 5 PM EST"</em> which forces global members to use Google converters, Discord supports native UNIX epoch timestamp markdown tags formatted as:
          </p>
          <div className="p-4 bg-white/[0.04] font-mono text-[#2997ff] rounded-2xl border border-white/[0.08]">
            &lt;t:UNIX_TIMESTAMP:FLAG&gt;
          </div>
          <p>
            When pasted into any Discord text channel, DM, or announcement embed, Discord will render the exact wall-clock time for each viewer, accounting for day changes and daylight saving time automatically.
          </p>
        </div>
      </div>
    </div>
  );
};
