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
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-purple-400 font-semibold mb-2">
          <span>COMMUNITY & EVENT UTILITY</span>
          <span>•</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Automatic Global Timezone Translation
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Discord Dynamic Timestamp Generator
        </h1>
        <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
          Select an event date and time in your local clock. Discord markdown timestamps automatically translate into every server member's personal device timezone and render live relative countdowns (e.g. "in 3 hours").
        </p>
      </div>

      {/* Main Tool */}
      <DiscordTimestamp />

      {/* Discord Markdown Timestamp Cheatsheet */}
      <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <MessageSquareCode className="w-4 h-4 text-purple-400" />
          How Discord Timestamps Work
        </h2>

        <div className="space-y-4 text-xs text-zinc-400 leading-relaxed">
          <p>
            Instead of typing ambiguous dates like <em>"meeting at 5 PM EST"</em> which forces global members to use Google converters, Discord supports native UNIX epoch timestamp markdown tags formatted as:
          </p>
          <div className="p-4 bg-zinc-950 font-mono text-purple-300 rounded-xl border border-zinc-800/80">
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
