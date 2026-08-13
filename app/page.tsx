"use client";

import { useState, useEffect } from "react";
import { Clock } from "./components/Clock";
import { NostalgiaPlayer } from "./components/NostalgiaPlayer";
import { DurgaPujoCountdown } from "./components/DurgaPujoCountdown";
import { Playlist, PLAYLISTS, Track } from "./data/playlists";
import { Radio, Compass, Volume2, Volume1, VolumeX, RadioReceiver, Flame, Instagram } from "lucide-react";

// Helper function to calculate time-based Bengali greeting for Kolkata time
function getBengaliGreeting(): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      hour12: false,
    });
    const hour = parseInt(formatter.format(new Date()), 10);

    if (hour >= 5 && hour < 12) {
      return "শুভ সকাল"; // Subho Sokal (Morning)
    } else if (hour >= 12 && hour < 20) {
      return "শুভ সন্ধ্যা"; // Subho Sondha (Evening)
    } else {
      return "শুভ রাত্রি"; // Subho Ratri (Night)
    }
  } catch (e) {
    return "শুভ সন্ধ্যা";
  }
}

export default function Home() {
  const [activePlaylistId, setActivePlaylistId] = useState<string>(
    PLAYLISTS[0]?.id || "midnight-kolkata"
  );
  const [currentBg, setCurrentBg] = useState<string>(
    PLAYLISTS[0]?.bgImage || "/bg/Durga Pujo.png"
  );
  const [currentTrackVideoId, setCurrentTrackVideoId] = useState<string>(
    PLAYLISTS[0]?.tracks[0]?.videoId || "oyBQywMMi24"
  );
  const [greeting, setGreeting] = useState<string>("শুভ রাত্রি");
  const [listenerCount, setListenerCount] = useState<number>(1);
  const [volume, setVolume] = useState<number>(80);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showVolumeMenu, setShowVolumeMenu] = useState<boolean>(false);

  const isSundaySuspense =
    activePlaylistId === "sunday-suspense" ||
    activePlaylistId.includes("suspense") ||
    activePlaylistId === "taranath-tantrik" ||
    activePlaylistId === "sherlock-holmes";

  const isDurgaPujo =
    activePlaylistId === "durga-pujo" ||
    activePlaylistId === "midnight-kolkata" ||
    activePlaylistId.includes("durga");

  // Time-based greeting effect
  useEffect(() => {
    setGreeting(getBengaliGreeting());
    const interval = setInterval(() => {
      setGreeting(getBengaliGreeting());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Real-time server active listener heartbeat tracking
  useEffect(() => {
    let sessionId = sessionStorage.getItem("kolkata_radio_session_id");
    if (!sessionId) {
      sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      sessionStorage.setItem("kolkata_radio_session_id", sessionId);
    }

    const sendHeartbeat = async () => {
      try {
        const res = await fetch("/api/listeners", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        if (res.ok) {
          const data = await res.json();
          if (typeof data.count === "number") {
            setListenerCount(data.count);
          }
        }
      } catch (err) {
        // Fallback
      }
    };

    sendHeartbeat();
    const interval = setInterval(sendHeartbeat, 5000);

    const handleUnload = () => {
      if (sessionId) {
        navigator.sendBeacon("/api/listeners", JSON.stringify({ sessionId }));
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const handlePlaylistSelect = (playlist: Playlist, currentTrack?: Track) => {
    setActivePlaylistId(playlist.id);
    if (currentTrack) {
      setCurrentTrackVideoId(currentTrack.videoId);
    }
    if (playlist.bgImage) {
      setCurrentBg(playlist.bgImage);
    }
  };

  const handleTrackChange = (track: Track, playlist: Playlist) => {
    setActivePlaylistId(playlist.id);
    if (track?.videoId) {
      setCurrentTrackVideoId(track.videoId);
    }
  };

  // Determine dynamic background URL (Full HD 1080p YouTube thumbnail)
  const activeBgImage = isSundaySuspense
    ? `https://i.ytimg.com/vi/${currentTrackVideoId}/maxresdefault.jpg`
    : currentBg;

  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden select-none">
      {/* Right Side Durga Puja Countdown Widget (Visible on Durga Pujo Playlist) */}
      <DurgaPujoCountdown isVisible={isDurgaPujo} />

      {/* Bottom-Left Corner: Made By + Instagram Link Button */}
      <div
        className="fixed left-3 sm:left-6 bottom-3 sm:bottom-4 z-40 flex items-center gap-2 rounded-full border border-white/15 bg-black/65 px-3 py-1.5 backdrop-blur-md text-xs text-white/90 shadow-xl pointer-events-auto transition hover:border-pink-500/50 hover:bg-black/80"
        style={{
          paddingLeft: "max(0.75rem, env(safe-area-inset-left))",
          paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))",
        }}
      >
        <span className="text-[11px] font-medium text-white/70">Made by</span>
        <a
          href="https://www.instagram.com/bikram_official011?igsh=MXVyZ3M4ZHdkYTJ4dg=="
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Bikram Instagram Profile"
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 px-2.5 py-0.5 text-[11.5px] font-bold text-white shadow-md hover:scale-105 active:scale-95 transition"
        >
          <Instagram className="h-3.5 w-3.5" />
          <span>bikram_official011</span>
        </a>
      </div>

      {/* 1. Fixed Background Div (-z-20) with Dynamic Image Overlay */}
      <div className="fixed inset-0 -z-20 overflow-hidden bg-black">
        {/* Layer 1: Ambient Soft Blurred Glow Backdrop */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-3xl scale-125 opacity-60 transition-all duration-700"
          style={activeBgImage ? { backgroundImage: `url('${activeBgImage}')` } : undefined}
        />

        {/* Layer 2: Main Full Artwork (bg-cover for Durga Pujo edge-to-edge fill, bg-contain for Sunday Suspense) */}
        <div
          className={`absolute inset-0 bg-center transition-all duration-700 ${
            isSundaySuspense ? "bg-contain bg-no-repeat" : "bg-cover"
          }`}
          style={activeBgImage ? { backgroundImage: `url('${activeBgImage}')` } : undefined}
        />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/90 pointer-events-none" />
      </div>

      {/* 2. Fixed Grain Overlay (-z-10) with SVG feTurbulence Data-URI */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 3. Fixed Top Row: Clock Top-Left, Real Server Listener Count Top-Centre, Volume Dropdown Top-Right */}
      <header
        className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 pointer-events-none"
        style={{
          paddingTop: "max(1rem, env(safe-area-inset-top))",
          paddingLeft: "max(1rem, env(safe-area-inset-left))",
          paddingRight: "max(1rem, env(safe-area-inset-right))",
        }}
      >
        {/* Top-Left: Clock */}
        <div className="pointer-events-auto flex items-center">
          <Clock />
        </div>

        {/* Top-Centre: Real Server Active Listener Count */}
        <div className="pointer-events-auto hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3.5 py-1.5 backdrop-blur-md text-xs font-medium text-white/90 shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="font-mono text-amber-300 font-semibold">
            {listenerCount.toLocaleString()}
          </span>
          <span className="text-white/80 font-medium">শুনছে এখন</span>
        </div>

        {/* Top-Right: Clickable Volume Control Dropdown */}
        <div className="pointer-events-auto relative flex items-center">
          <button
            onClick={() => setShowVolumeMenu(!showVolumeMenu)}
            type="button"
            aria-label="Toggle Volume Controls"
            className="flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3.5 py-1.5 backdrop-blur-md text-xs font-semibold text-white/90 shadow-lg hover:bg-black/70 hover:border-amber-400/50 transition duration-200 focus:outline-none"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="h-4 w-4 text-amber-400" />
            ) : volume < 50 ? (
              <Volume1 className="h-4 w-4 text-amber-400" />
            ) : (
              <Volume2 className="h-4 w-4 text-amber-400" />
            )}
            <span className="font-mono text-amber-300 text-xs font-semibold">
              {isMuted ? "Mute" : `${volume}%`}
            </span>
          </button>

          {/* Floating Dropdown Menu */}
          {showVolumeMenu && (
            <div className="absolute right-0 top-full mt-2.5 z-50 flex flex-col gap-3 rounded-2xl border border-white/15 bg-black/85 p-3.5 backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.85)] w-48 text-xs animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between text-xs font-semibold text-white/90 pb-2 border-b border-white/10">
                <span>Sound Volume</span>
                <span className="font-mono text-amber-300 font-bold">{isMuted ? "0%" : `${volume}%`}</span>
              </div>

              {/* Slider Row */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-amber-400 hover:text-amber-300 transition"
                  aria-label="Mute toggle"
                >
                  {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setVolume(val);
                    if (val > 0 && isMuted) setIsMuted(false);
                  }}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              {/* Quick Level Buttons */}
              <div className="grid grid-cols-4 gap-1 text-[11px] font-mono font-bold pt-1">
                {[25, 50, 75, 100].map((level) => (
                  <button
                    key={level}
                    onClick={() => {
                      setVolume(level);
                      if (isMuted) setIsMuted(false);
                    }}
                    className={`rounded-md py-1 border transition ${
                      !isMuted && volume === level
                        ? "bg-amber-500/25 border-amber-400/60 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.3)]"
                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/15 hover:text-white"
                    }`}
                  >
                    {level}%
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Middle Tagline & Title Section */}
      <div className="flex-1 flex flex-col items-center justify-start pt-20 sm:pt-28 text-center px-4 z-10 pointer-events-none max-w-lg">
        {/* Dynamic Time-Based Greeting Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/15 px-4 py-1 text-xs font-bold text-amber-300 backdrop-blur-md mb-2 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <Compass className="h-3.5 w-3.5 animate-spin text-amber-400" style={{ animationDuration: "12s" }} />
          <span>{greeting}</span>
        </div>

        {/* SHOW TITLE AND SUBTITLE ONLY IF NOT SUNDAY SUSPENSE */}
        {!isSundaySuspense ? (
          <>
            {/* Golden Glossy Metallic Title */}
            <div className="relative overflow-visible pt-1 pb-0">
              <h1 className="gold-glossy-text text-3xl sm:text-6xl font-bold tracking-wider pt-2 pb-0 px-3 overflow-visible inline-block whitespace-nowrap">
                কলকাতা রেডিও
              </h1>
              {/* Ambient Soft Golden Glow */}
              <div className="absolute inset-0 bg-amber-400/25 blur-3xl -z-10 rounded-full scale-150 opacity-70 animate-pulse" />
            </div>

            {/* Subtitle placed closely under title */}
            <p className="text-sm sm:text-base text-amber-100/80 mt-0 sm:mt-0.5 font-sans font-medium tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              শুনতে থাকুন আপনার পছন্দের গান
            </p>
          </>
        ) : (
          <div className="mt-2 py-1 px-4 rounded-full border border-rose-500/40 bg-rose-950/40 backdrop-blur-md flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(225,29,72,0.25)]">
            <Flame className="h-3.5 w-3.5 text-rose-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-rose-200 tracking-wider">
              Sunday সাসপেন্স • {activePlaylistId === "sherlock-holmes" ? "শার্লক হোমস্‌" : "তারাণাথ তান্ত্রিক"}
            </span>
          </div>
        )}
      </div>

      {/* 4. Bottom-Anchored Player (max-w-xl) */}
      <footer
        className="fixed bottom-0 left-0 right-0 z-30 flex flex-col items-center justify-center p-4 pointer-events-none"
        style={{
          paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
          paddingLeft: "max(1rem, env(safe-area-inset-left))",
          paddingRight: "max(1rem, env(safe-area-inset-right))",
        }}
      >
        <div className="pointer-events-auto w-full max-w-xl">
          <NostalgiaPlayer
            onPlaylistSelect={handlePlaylistSelect}
            onTrackChange={handleTrackChange}
            volume={volume}
            isMuted={isMuted}
            onToggleMute={() => setIsMuted((prev) => !prev)}
          />
        </div>
      </footer>
    </main>
  );
}
