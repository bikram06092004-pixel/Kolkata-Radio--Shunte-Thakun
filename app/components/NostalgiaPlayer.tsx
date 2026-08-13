"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { PLAYLISTS, Playlist, Track } from "../data/playlists";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Sparkles,
  ListMusic,
  Check,
  BookOpen,
  Flame,
  Flag,
} from "lucide-react";

// --- Global YouTube API Declaration ---
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

// Utility: Parse clean 11-char YouTube Video ID from full URL or string
function parseYouTubeId(input: string): string {
  if (!input) return "";
  const match = input.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1]) return match[1];
  return input.split("?")[0].split("&")[0];
}

// ==========================================
// MODULE-SCOPED SUB-COMPONENTS
// ==========================================

interface VinylDiscProps {
  isPlaying: boolean;
  size: "desktop" | "mobile";
  iframeContainerId: string;
}

function VinylDisc({ isPlaying, size, iframeContainerId }: VinylDiscProps) {
  const isDesktop = size === "desktop";
  const outerSizeClass = isDesktop ? "w-[80px] h-[80px]" : "w-[64px] h-[64px]";
  const spindleSizeClass = isDesktop ? "w-[12px] h-[12px]" : "w-[10px] h-[10px]";

  return (
    <div className={`relative shrink-0 ${outerSizeClass} rounded-full overflow-hidden shadow-2xl group cursor-pointer`}>
      {/* Outer Vinyl Ridge Pattern */}
      <div
        className={`absolute inset-0 rounded-full border-2 border-white/20 bg-gradient-to-tr from-neutral-950 via-neutral-900 to-neutral-950 animate-vinyl-spin transition-transform duration-500`}
        style={{
          animationPlayState: isPlaying ? "running" : "paused",
          backgroundImage:
            "radial-gradient(circle at center, transparent 35%, rgba(255,255,255,0.08) 36%, transparent 37%, rgba(255,255,255,0.05) 50%, transparent 51%)",
        }}
      >
        {/* Visible YouTube Player Iframe Slot inside Vinyl Artwork */}
        <div className="absolute inset-1.5 rounded-full overflow-hidden bg-black flex items-center justify-center">
          <div id={iframeContainerId} className="w-full h-full object-cover scale-[1.35] pointer-events-auto" />
        </div>

        {/* Vinyl Shine Gradient Overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Center Vinyl Spindle Hole */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div
          className={`${spindleSizeClass} rounded-full bg-black/90 border border-white/30 shadow-inner`}
        />
      </div>
    </div>
  );
}

interface SeekBarProps {
  currentTime: number;
  duration: number;
  onSeek: (newTime: number) => void;
  accentColor: string;
}

function SeekBar({ currentTime, duration, onSeek, accentColor }: SeekBarProps) {
  const percentage = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className="relative flex items-center w-full py-1">
      <input
        type="range"
        min="0"
        max={duration || 100}
        value={currentTime || 0}
        onChange={(e) => onSeek(Number(e.target.value))}
        className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none"
        style={{
          background: `linear-gradient(to right, ${accentColor} ${percentage}%, rgba(255,255,255,0.2) ${percentage}%)`,
        }}
      />
    </div>
  );
}

interface TransportControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentTime: number;
  onSeek: (newTime: number) => void;
  tracks: Track[];
  currentTrackIndex: number;
  onSelectTrackIndex: (index: number) => void;
  isMobile: boolean;
  accentColor: string;
  isSundaySuspense?: boolean;
}

function TransportControls({
  isPlaying,
  onTogglePlay,
  currentTime,
  onSeek,
  tracks,
  currentTrackIndex,
  onSelectTrackIndex,
  isMobile,
  accentColor,
  isSundaySuspense,
}: TransportControlsProps) {
  const [showTrackMenu, setShowTrackMenu] = useState(false);
  const [activeSeries, setActiveSeries] = useState<"taranath-tantrik" | "sherlock-holmes">(
    "taranath-tantrik"
  );

  // On Durga Pujo playlist, render ONLY the Play/Pause button
  if (!isSundaySuspense) {
    return (
      <div className="flex items-center justify-center">
        <button
          onClick={onTogglePlay}
          type="button"
          aria-label={isPlaying ? "Pause" : "Play"}
          className="flex h-11 w-11 items-center justify-center rounded-full text-white ring-1 ring-white/25 transition hover:scale-105 active:scale-95 shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, #d97706)`,
            boxShadow: `0 4px 16px ${accentColor}60`,
          }}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 fill-current" />
          ) : (
            <Play className="h-5 w-5 fill-current translate-x-0.5" />
          )}
        </button>
      </div>
    );
  }

  // Filter tracks for Sunday Suspense series
  const filteredTracks = tracks.filter((t) => !t.series || t.series === activeSeries);

  return (
    <div className="relative flex items-center gap-1.5">
      {/* Track Selector Choice Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowTrackMenu(!showTrackMenu)}
          type="button"
          aria-label="Choose Story Track"
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold border bg-rose-500/25 border-rose-400/50 text-rose-200 hover:bg-rose-500/40 shadow-[0_0_10px_rgba(225,29,72,0.3)] transition"
          title="Choose Story Track"
        >
          <ListMusic className="h-3.5 w-3.5 text-amber-300" />
          <span className="hidden sm:inline">গল্প বাছাই</span>
        </button>

        {/* Floating Music / Golpo Choice Dropdown */}
        {showTrackMenu && (
          <div className="absolute left-0 sm:right-0 sm:left-auto bottom-full mb-2 z-50 flex flex-col gap-2 rounded-2xl border border-white/15 bg-black/90 p-2.5 backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.9)] w-[calc(100vw-3rem)] sm:w-72 max-w-72 text-xs animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between px-1 py-1 border-b border-white/10 font-bold text-amber-300 text-[11px]">
              <div className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5 text-amber-400" />
                <span>পছন্দের গল্প নির্বাচন করুন</span>
              </div>
            </div>

            {/* Category Series Tabs: Taranath Tantrik & Sherlock Holmes */}
            <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
              <button
                type="button"
                onClick={() => setActiveSeries("taranath-tantrik")}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition text-center ${
                  activeSeries === "taranath-tantrik"
                    ? "bg-rose-600/80 text-white shadow"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                তারাণাথ তান্ত্রিক
              </button>
              <button
                type="button"
                onClick={() => setActiveSeries("sherlock-holmes")}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition text-center ${
                  activeSeries === "sherlock-holmes"
                    ? "bg-violet-600/80 text-white shadow"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                শার্লক হোমস্‌
              </button>
            </div>

            {/* Story List under selected Series */}
            <div className="max-h-48 overflow-y-auto flex flex-col gap-1 py-1">
              {filteredTracks.map((track) => {
                const originalIndex = tracks.findIndex((t) => t.id === track.id);
                const isSelected = originalIndex === currentTrackIndex;
                return (
                  <button
                    key={track.id}
                    onClick={() => {
                      onSelectTrackIndex(originalIndex >= 0 ? originalIndex : 0);
                      setShowTrackMenu(false);
                    }}
                    className={`flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition ${
                      isSelected
                        ? "bg-amber-500/20 text-amber-300 font-semibold border border-amber-400/30"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="truncate pr-2 font-medium">{track.title}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 shrink-0 text-amber-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 10 Seconds Rewind (-10s) */}
      <button
        onClick={() => onSeek(Math.max(0, currentTime - 10))}
        type="button"
        aria-label="Rewind 10 Seconds"
        className="flex items-center gap-1 rounded-full bg-white/10 border border-white/15 px-2.5 py-1.5 text-xs font-semibold text-white/90 hover:bg-white/20 hover:text-white transition active:scale-95 shadow-sm"
        title="Rewind 10 Seconds"
      >
        <RotateCcw className="h-3.5 w-3.5 text-amber-300" />
        <span>10s</span>
      </button>

      {/* Play / Pause — hidden on mobile since it's already in the main row */}
      {!isMobile && (
        <button
          onClick={onTogglePlay}
          type="button"
          aria-label={isPlaying ? "Pause" : "Play"}
          className="flex h-11 w-11 items-center justify-center rounded-full text-white ring-1 ring-white/25 transition hover:scale-105 active:scale-95 shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, #d97706)`,
            boxShadow: `0 4px 16px ${accentColor}60`,
          }}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 fill-current" />
          ) : (
            <Play className="h-5 w-5 fill-current translate-x-0.5" />
          )}
        </button>
      )}

      {/* 10 Seconds Fast Forward (+10s) */}
      <button
        onClick={() => onSeek(currentTime + 10)}
        type="button"
        aria-label="Forward 10 Seconds"
        className="flex items-center gap-1 rounded-full bg-white/10 border border-white/15 px-2.5 py-1.5 text-xs font-semibold text-white/90 hover:bg-white/20 hover:text-white transition active:scale-95 shadow-sm"
        title="Forward 10 Seconds"
      >
        <span>10s</span>
        <RotateCw className="h-3.5 w-3.5 text-amber-300" />
      </button>
    </div>
  );
}

interface PlaylistPickerProps {
  playlists: Playlist[];
  activePlaylistId: string;
  onSelectPlaylist: (playlist: Playlist) => void;
}

function PlaylistPicker({
  playlists,
  activePlaylistId,
  onSelectPlaylist,
}: PlaylistPickerProps) {
  return (
    <div className="mb-3 flex items-center justify-center gap-1.5 rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-md">
      {playlists.map((pl) => {
        const isActive = pl.id === activePlaylistId;
        return (
          <button
            key={pl.id}
            onClick={() => onSelectPlaylist(pl)}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold transition-all ${
              isActive
                ? "bg-white/20 text-white shadow-sm ring-1 ring-white/30"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            {pl.id === "sunday-suspense" ? (
              <Flame className="h-3.5 w-3.5 text-rose-400 animate-pulse" />
            ) : (
              <Sparkles
                className="h-3.5 w-3.5"
                style={{ color: isActive ? pl.accentColor : "currentColor" }}
              />
            )}
            <span>{pl.name}</span>
          </button>
        );
      })}
    </div>
  );
}

// ==========================================
// MAIN NOSTALGIA PLAYER COMPONENT
// ==========================================

interface NostalgiaPlayerProps {
  onPlaylistSelect?: (playlist: Playlist, currentTrack?: Track) => void;
  onTrackChange?: (track: Track, playlist: Playlist) => void;
  volume?: number;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export function NostalgiaPlayer({
  onPlaylistSelect,
  onTrackChange,
  volume = 80,
  isMuted = false,
  onToggleMute,
}: NostalgiaPlayerProps) {
  const [activePlaylist, setActivePlaylist] = useState<Playlist>(PLAYLISTS[0]);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const playerRef = useRef<any>(null);
  const progressIntervalRef = useRef<any>(null);

  const currentTrack: Track = activePlaylist.tracks[trackIndex] || activePlaylist.tracks[0];
  const accentColor = activePlaylist.accentColor;
  const isSundaySuspense =
    activePlaylist.id === "taranath-tantrik" ||
    activePlaylist.id === "sherlock-holmes" ||
    activePlaylist.id === "sunday-suspense" ||
    activePlaylist.id === "retro-gold";

  // Notify parent on track / playlist update
  useEffect(() => {
    onTrackChange?.(currentTrack, activePlaylist);
  }, [currentTrack, activePlaylist, onTrackChange]);

  // Next Track Logic
  const handleNextTrack = useCallback(() => {
    setTrackIndex((prev) => (prev + 1) % activePlaylist.tracks.length);
  }, [activePlaylist]);

  // Playlist Change Handler
  const handlePlaylistChange = useCallback((playlist: Playlist) => {
    setActivePlaylist(playlist);
    setTrackIndex(0);
    setCurrentTime(0);
    onPlaylistSelect?.(playlist, playlist.tracks[0]);
  }, [onPlaylistSelect]);

  // Sync external volume and mute state with YouTube Player
  useEffect(() => {
    if (playerRef.current) {
      if (typeof playerRef.current.setVolume === "function") {
        playerRef.current.setVolume(volume);
      }
      if (isMuted) {
        if (typeof playerRef.current.mute === "function") playerRef.current.mute();
      } else {
        if (typeof playerRef.current.unMute === "function") playerRef.current.unMute();
      }
    }
  }, [volume, isMuted]);

  // Initialize YouTube Player API
  useEffect(() => {
    let player: any = null;

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      const cleanVideoId = parseYouTubeId(currentTrack.videoId);

      player = new window.YT.Player("youtube-player-slot", {
        videoId: cleanVideoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event: any) => {
            playerRef.current = event.target;
            setDuration(event.target.getDuration() || currentTrack.duration);
            if (isPlaying) {
              event.target.playVideo();
            }
          },
          onStateChange: (event: any) => {
            if (event.data === 1) {
              setIsPlaying(true);
            } else if (event.data === 2) {
              setIsPlaying(false);
            } else if (event.data === 0) {
              setIsPlaying(false);
              handleNextTrack();
            }
          },
          onError: (event: any) => {
            console.warn("YouTube Video playback error code:", event.data, "for videoId:", currentTrack.videoId);
            handleNextTrack();
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [currentTrack.videoId, handleNextTrack]);

  // Track progress update interval (250ms)
  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
          const cur = playerRef.current.getCurrentTime() || 0;
          const dur = playerRef.current.getDuration() || currentTrack.duration;
          setCurrentTime(cur);
          if (dur > 0) setDuration(dur);
        }
      }, 250);
    } else {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, currentTrack.duration]);

  // Toggle Play / Pause
  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  // Seek Handler
  const handleSeek = (newTime: number) => {
    setCurrentTime(newTime);
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(newTime, true);
    }
  };

  return (
    <div className="w-full max-w-xl flex flex-col items-center px-2 sm:px-0">
      {/* Playlist Selector Pill */}
      <div className="w-full overflow-x-auto pb-2">
        <PlaylistPicker
          playlists={PLAYLISTS}
          activePlaylistId={activePlaylist.id}
          onSelectPlaylist={handlePlaylistChange}
        />
      </div>

      {/* ==========================================
          DESKTOP VIEW (hidden sm:flex)
          ========================================== */}
      <div className="hidden sm:flex glass-pill w-full rounded-full p-3 pr-5 items-center justify-between gap-4 transition-all duration-300">
        {/* Vinyl with YouTube Player */}
        <VinylDisc
          isPlaying={isPlaying}
          size="desktop"
          iframeContainerId="youtube-player-slot"
        />

        {/* Title, Artist, & Seek Bar Column */}
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 pr-2">
              <h2 className="text-[15px] font-semibold text-white truncate leading-tight">
                {currentTrack.title}
              </h2>
              <p className="text-[12.5px] text-white/70 truncate leading-tight mt-0.5">
                {currentTrack.artist} {currentTrack.film ? `• ${currentTrack.film}` : ""} ({currentTrack.year})
              </p>
            </div>
          </div>

          {/* Seek Bar */}
          <SeekBar
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
            accentColor={accentColor}
          />
        </div>

        {/* Transport Controls */}
        <TransportControls
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          currentTime={currentTime}
          onSeek={handleSeek}
          tracks={activePlaylist.tracks}
          currentTrackIndex={trackIndex}
          onSelectTrackIndex={(idx) => setTrackIndex(idx)}
          isMobile={false}
          accentColor={accentColor}
          isSundaySuspense={isSundaySuspense}
        />
      </div>

      {/* ==========================================
          MOBILE VIEW (sm:hidden)
          ========================================== */}
      <div className="sm:hidden glass-pill w-full rounded-[20px] p-3 flex flex-col gap-2 transition-all duration-300">
        {/* Row 1: Vinyl + Title/Artist + Play Button on right */}
        <div className="flex items-center gap-2.5">
          <VinylDisc
            isPlaying={isPlaying}
            size="mobile"
            iframeContainerId="youtube-player-slot-mobile"
          />

          <div className="min-w-0 flex-1 flex flex-col justify-center">
            <h2 className="text-[13px] font-semibold text-white leading-tight line-clamp-2">
              {currentTrack.title}
            </h2>
            <p className="text-[10px] text-white/70 leading-tight mt-0.5 line-clamp-1">
              {currentTrack.artist}
            </p>
            {currentTrack.film && (
              <p className="text-[9px] text-white/50 mt-0.5 line-clamp-1">
                {currentTrack.film} • {currentTrack.year}
              </p>
            )}
          </div>

          {/* Play/Pause button on the right side of text */}
          <button
            onClick={togglePlay}
            type="button"
            aria-label={isPlaying ? "Pause" : "Play"}
            className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full text-white ring-1 ring-white/25 transition hover:scale-105 active:scale-95 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${accentColor}, #d97706)`,
              boxShadow: `0 4px 16px ${accentColor}60`,
            }}
          >
            {isPlaying ? (
              <Pause className="h-4.5 w-4.5 fill-current" />
            ) : (
              <Play className="h-4.5 w-4.5 fill-current translate-x-0.5" />
            )}
          </button>
        </div>

        {/* Row 2: Seek Bar */}
        <div className="w-full px-1">
          <SeekBar
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
            accentColor={accentColor}
          />
        </div>

        {/* Row 3: Extra Transport Controls (only for Sunday Suspense with track selection/rewind/forward) */}
        {isSundaySuspense && (
          <div className="flex items-center justify-center gap-2 pt-0.5">
            <div className="w-full flex items-center justify-center">
              <TransportControls
                isPlaying={isPlaying}
                onTogglePlay={togglePlay}
                currentTime={currentTime}
                onSeek={handleSeek}
                tracks={activePlaylist.tracks}
                currentTrackIndex={trackIndex}
                onSelectTrackIndex={(idx) => setTrackIndex(idx)}
                isMobile={true}
                accentColor={accentColor}
                isSundaySuspense={isSundaySuspense}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
