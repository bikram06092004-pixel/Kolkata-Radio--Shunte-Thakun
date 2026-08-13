"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

interface DurgaPujoCountdownProps {
  isVisible: boolean;
}

export function DurgaPujoCountdown({ isVisible }: DurgaPujoCountdownProps) {
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [greeting, setGreeting] = useState<string | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentYear = now.getFullYear();

      // Durga Puja Sasthi target date (Oct 16, 2026)
      let targetYear = currentYear;
      let sasthiDate = new Date(targetYear, 9, 16, 0, 0, 0);

      const dashamiDate = new Date(targetYear, 9, 20, 23, 59, 59);
      if (now > dashamiDate) {
        targetYear += 1;
        sasthiDate = new Date(targetYear, 9, 16, 0, 0, 0);
      }

      // Check current day special greeting
      const month = now.getMonth(); // 9 = October
      const date = now.getDate();

      let specialGreeting: string | null = null;
      if (month === 9 && targetYear === currentYear) {
        if (date === 10) specialGreeting = "শুভ মহালয়া";
        else if (date === 16) specialGreeting = "শুভ ষষ্ঠী";
        else if (date === 17) specialGreeting = "শুভ সপ্তমী";
        else if (date === 18) specialGreeting = "শুভ মহাঅষ্টমী";
        else if (date === 19) specialGreeting = "শুভ মহানবমী";
        else if (date === 20) specialGreeting = "শুভ বিজয়া ও দশমী";
      }

      const diff = sasthiDate.getTime() - now.getTime();
      const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));

      setDaysLeft(days);
      setGreeting(specialGreeting);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Durga Puja Countdown"
      className="fixed left-2 sm:left-8 top-16 sm:top-24 z-20 w-40 sm:w-52 rounded-2xl border border-amber-400/30 bg-black/65 p-2.5 sm:p-3.5 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.15)] text-white select-none transition-all duration-500 animate-in fade-in slide-in-from-left-4 pointer-events-auto"
      style={{
        paddingLeft: "max(0.5rem, env(safe-area-inset-left))",
        paddingTop: "max(1rem, env(safe-area-inset-top))",
      }}
    >
      {/* 1. TOP HEADER WRITING: "দুর্গাপূজার আর বাকি" */}
      <div className="flex items-center justify-between pb-0.5 sm:pb-1 border-b border-amber-400/20 mb-1 sm:mb-1.5">
        <span className="text-[10px] sm:text-xs font-semibold text-amber-200/95 tracking-wide">
          দুর্গাপূজার আর বাকি
        </span>
        <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-400 opacity-80 animate-pulse flex-shrink-0" />
      </div>

      {/* Special Day Festive Greeting (Subho Mahalaya / Sasthi / Saptami / Ashtami / Nabami / Dashami) */}
      {greeting && (
        <div className="mb-1 sm:mb-2 py-0.5 sm:py-1 px-1.5 sm:px-2 rounded-lg bg-gradient-to-r from-amber-500/25 to-red-500/25 border border-amber-400/40 text-center shadow-[0_0_12px_rgba(245,158,11,0.3)]">
          <span className="gold-glossy-text text-xs sm:text-sm font-bold tracking-wide">
            {greeting}
          </span>
        </div>
      )}

      {/* 2. CENTER BIG NUMBER & "দিন" */}
      <div className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-b from-white/10 to-white/5 border border-amber-400/20 py-2 sm:py-3 px-2 text-center shadow-inner">
        <span className="font-mono text-3xl sm:text-4xl font-bold text-amber-300 tracking-tight drop-shadow-[0_2px_10px_rgba(245,158,11,0.4)] leading-none">
          {daysLeft}
        </span>
        <span className="text-[10px] sm:text-xs text-amber-100/90 font-medium mt-0.5 sm:mt-1">
          দিন
        </span>
      </div>
    </aside>
  );
}
