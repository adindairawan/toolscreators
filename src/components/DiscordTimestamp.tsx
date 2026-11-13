import React, { useState } from 'react';
import { Copy, Check, Calendar, Globe } from 'lucide-react';

interface TimestampFormat {
  code: string;
  name: string;
  description: string;
  render: (date: Date) => string;
}

const FORMATS: TimestampFormat[] = [
  {
    code: 'R',
    name: 'Relative Time',
    description: 'Dynamic countdown or past indicator (e.g. in 2 hours, 5 minutes ago)',
    render: (date: Date) => {
      const now = new Date();
      const diffMs = date.getTime() - now.getTime();
      const diffSec = Math.round(diffMs / 1000);
      const isFuture = diffSec >= 0;
      const absSec = Math.abs(diffSec);

      if (absSec < 60) return isFuture ? `in ${absSec} seconds` : `${absSec} seconds ago`;
      const absMin = Math.round(absSec / 60);
      if (absMin < 60) return isFuture ? `in ${absMin} minutes` : `${absMin} minutes ago`;
      const absHours = Math.round(absMin / 60);
      if (absHours < 24) return isFuture ? `in ${absHours} hours` : `${absHours} hours ago`;
      const absDays = Math.round(absHours / 24);
      return isFuture ? `in ${absDays} days` : `${absDays} days ago`;
    },
  },
  {
    code: 'F',
    name: 'Full Date & Time with Day of the Week',
    description: 'Wednesday, November 13, 2026 5:00 PM',
    render: (date: Date) =>
      date.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
  },
  {
    code: 'f',
    name: 'Short Date & Time',
    description: 'November 13, 2026 5:00 PM',
    render: (date: Date) =>
      date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
  },
  {
    code: 'd',
    name: 'Short Date',
    description: '11/13/2026',
    render: (date: Date) => date.toLocaleDateString(),
  },
  {
    code: 'D',
    name: 'Long Date',
    description: 'November 13, 2026',
    render: (date: Date) =>
      date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
  },
  {
    code: 't',
    name: 'Short Time',
    description: '5:00 PM',
    render: (date: Date) =>
      date.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' }),
  },
  {
    code: 'T',
    name: 'Long Time with Seconds',
    description: '5:00:00 PM',
    render: (date: Date) => date.toLocaleTimeString(),
  },
];

export const DiscordTimestamp: React.FC = () => {
  // Default to 1 hour in the future
  const getInitialDateTime = () => {
    const d = new Date();
    d.setHours(d.getHours() + 1, 0, 0, 0);
    const tzOffset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
  };

  const [dateTimeStr, setDateTimeStr] = useState<string>(getInitialDateTime());
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const selectedDate = new Date(dateTimeStr);
  const unixTimestamp = Math.floor(selectedDate.getTime() / 1000);

  const handleCopy = (tag: string, id: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Date Time Picker Section */}
      <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              Pick Event Date & Local Time
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Discord automatically converts this timestamp to every viewer's local device timezone!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="datetime-local"
              value={dateTimeStr}
              onChange={(e) => setDateTimeStr(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 text-zinc-100 text-xs px-3.5 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
            />
            <button
              onClick={() => {
                const now = new Date();
                const tzOffset = now.getTimezoneOffset() * 60000;
                setDateTimeStr(new Date(now.getTime() - tzOffset).toISOString().slice(0, 16));
              }}
              className="px-3 py-2 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl"
            >
              Now
            </button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center gap-3 text-xs text-zinc-400">
          <Globe className="w-4 h-4 text-zinc-500" />
          <span>Calculated UNIX epoch:</span>
          <code className="text-purple-300 font-mono bg-zinc-800/80 px-2 py-0.5 rounded">
            {unixTimestamp}
          </code>
        </div>
      </div>

      {/* Generated Format Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FORMATS.map((fmt) => {
          const discordTag = `<t:${unixTimestamp}:${fmt.code}>`;
          const liveValue = isNaN(selectedDate.getTime()) ? 'Invalid Date' : fmt.render(selectedDate);
          const isCopied = copiedCode === fmt.code;

          return (
            <div
              key={fmt.code}
              className="p-5 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-2xl flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-200">{fmt.name}</span>
                  <code className="text-[10px] text-zinc-400 font-mono bg-zinc-800 px-1.5 py-0.5 rounded">
                    :{fmt.code}
                  </code>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">{fmt.description}</p>

                {/* Simulated Discord Message Bubble */}
                <div className="mt-3.5 p-3 bg-[#313338] rounded-lg text-sm text-[#dbdee1] font-sans flex items-center justify-between">
                  <span className="bg-[#2b2d31] px-2 py-1 rounded text-xs font-medium text-white border border-[#1e1f22]">
                    {liveValue}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono opacity-60">Discord client view</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <code className="text-xs font-mono text-purple-300 bg-purple-950/30 px-2 py-1 rounded border border-purple-800/40 select-all">
                  {discordTag}
                </code>

                <button
                  onClick={() => handleCopy(discordTag, fmt.code)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                  }`}
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
