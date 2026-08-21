"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react";

interface SpotlightVideoContextValue {
  registerPlaying: (video: HTMLVideoElement) => void;
}

const SpotlightVideoContext = createContext<SpotlightVideoContextValue | null>(
  null,
);

/**
 * Scopes "only one video plays at a time" to a single spotlight gallery —
 * wrap a group of SpotlightVideoPlayer instances that should pause each
 * other when one starts.
 */
export function SpotlightVideoProvider({ children }: { children: ReactNode }) {
  const activeRef = useRef<HTMLVideoElement | null>(null);

  const registerPlaying = useCallback((video: HTMLVideoElement) => {
    if (activeRef.current && activeRef.current !== video) {
      activeRef.current.pause();
    }
    activeRef.current = video;
  }, []);

  return (
    <SpotlightVideoContext.Provider value={{ registerPlaying }}>
      {children}
    </SpotlightVideoContext.Provider>
  );
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function SpotlightVideoPlayer({
  src,
  poster,
  title,
}: {
  src: string;
  poster?: string;
  title: string;
}) {
  const context = useContext(SpotlightVideoContext);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    const nextProgress = Number(event.target.value);
    video.currentTime = (nextProgress / 100) * video.duration;
    setProgress(nextProgress);
  };

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-[10px] bg-black">
      <video
        ref={videoRef}
        playsInline
        preload="metadata"
        poster={poster}
        className="h-full w-full object-contain"
        onClick={togglePlay}
        onPlay={(event) => {
          setIsPlaying(true);
          context?.registerPlaying(event.currentTarget);
        }}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => {
          const video = event.currentTarget;
          setCurrentTime(video.currentTime);
          setProgress(
            video.duration ? (video.currentTime / video.duration) * 100 : 0,
          );
        }}
      >
        <source src={src} />
        Your browser does not support video playback.
      </video>

      {!isPlaying ? (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={`Play ${title}`}
          className="absolute inset-0 grid place-items-center bg-black/25 transition-colors hover:bg-black/35"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-[#1a5c34] shadow-lg transition-transform group-hover:scale-105">
            <Play aria-hidden="true" className="ml-1 h-6 w-6 fill-current" />
          </span>
        </button>
      ) : null}

      <div
        className={`absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/85 to-transparent px-3 pb-2 pt-8 transition-opacity ${
          isPlaying
            ? "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
            : "opacity-100"
        }`}
      >
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="shrink-0 text-white/90 transition-colors hover:text-white"
        >
          {isPlaying ? (
            <Pause aria-hidden="true" className="h-4 w-4 fill-current" />
          ) : (
            <Play aria-hidden="true" className="h-4 w-4 fill-current" />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={progress}
          onChange={handleSeek}
          aria-label={`Seek ${title}`}
          className="h-1 flex-1 cursor-pointer accent-[#1a5c34]"
        />
        <span className="w-16 shrink-0 text-right text-[11px] tabular-nums text-white/80">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
          className="shrink-0 text-white/90 transition-colors hover:text-white"
        >
          {isMuted ? (
            <VolumeX aria-hidden="true" className="h-4 w-4" />
          ) : (
            <Volume2 aria-hidden="true" className="h-4 w-4" />
          )}
        </button>
        <button
          type="button"
          onClick={() => videoRef.current?.requestFullscreen?.()}
          aria-label="Enter fullscreen"
          className="shrink-0 text-white/90 transition-colors hover:text-white"
        >
          <Maximize aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
