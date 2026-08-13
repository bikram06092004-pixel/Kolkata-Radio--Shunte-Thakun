"use client";

import { useEffect, useState } from "react";

interface ClockDisplayProps {
  timeParts: { hour: string; minute: string; dayPeriod: string } | null;
}

// Module-scoped subcomponent to avoid identity changes during renders
function ClockDisplay({ timeParts }: ClockDisplayProps) {
  if (!timeParts) {
    return (
      <div className="flex items-center gap-1.5 font-mono text-sm font-medium tracking-wider text-white/90">
        <span>--</span>
        <span className="animate-colon-blink text-amber-400/90">:</span>
        <span>--</span>
        <span className="ml-1 text-[11px] font-semibold text-amber-400/80">IST</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-0.5 font-mono text-sm font-semibold tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
      <span className="text-white/95">{timeParts.hour}</span>
      <span className="animate-colon-blink px-0.5 text-amber-400 font-bold">:</span>
      <span className="text-white/95">{timeParts.minute}</span>
      <span className="ml-1.5 rounded bg-white/10 px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-widest text-amber-300 ring-1 ring-white/20">
        {timeParts.dayPeriod} IST
      </span>
    </div>
  );
}

export function Clock() {
  const [timeParts, setTimeParts] = useState<{
    hour: string;
    minute: string;
    dayPeriod: string;
  } | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const updateClock = () => {
      const parts = formatter.formatToParts(new Date());
      let hour = "";
      let minute = "";
      let dayPeriod = "";

      for (const part of parts) {
        if (part.type === "hour") hour = part.value;
        if (part.type === "minute") minute = part.value;
        if (part.type === "dayPeriod") dayPeriod = part.value;
      }

      setTimeParts({ hour, minute, dayPeriod });
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3.5 py-1.5 backdrop-blur-md shadow-lg">
      <div className="relative flex h-2 w-2 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
      </div>
      <ClockDisplay timeParts={timeParts} />
    </div>
  );
}
