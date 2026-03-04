import React from "react";

interface SpotifyData {
  isPlaying: boolean;
  trackId: string;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  songUrl: string;
  progressMs: number;
  durationMs: number;
}

function useSpotifyNowPlaying() {
  const [data, setData] = React.useState<SpotifyData | null>(null);
  const [progress, setProgress] = React.useState(0);
  const fetchedAt = React.useRef(0);
  const serverProgress = React.useRef(0);

  React.useEffect(() => {
    let mounted = true;

    async function fetchNowPlaying() {
      try {
        const res = await fetch("/.netlify/functions/spotify-now-playing");
        const json: SpotifyData = await res.json();
        if (mounted) {
          if (json.isPlaying) {
            setData(json);
            serverProgress.current = json.progressMs;
            fetchedAt.current = Date.now();
            setProgress(json.progressMs);
          } else {
            setData(null);
          }
        }
      } catch {
        if (mounted) setData(null);
      }
    }

    fetchNowPlaying();
    const pollInterval = setInterval(fetchNowPlaying, 10_000);
    return () => {
      mounted = false;
      clearInterval(pollInterval);
    };
  }, []);

  // Simulate progress between polls
  React.useEffect(() => {
    if (!data) return;

    const tick = setInterval(() => {
      const elapsed = Date.now() - fetchedAt.current;
      const simulated = serverProgress.current + elapsed;
      setProgress(Math.min(simulated, data.durationMs));
    }, 1000);

    return () => clearInterval(tick);
  }, [data]);

  return { data, progress };
}

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function EqualizerBars() {
  return (
    <span className="inline-flex items-end gap-[2px] h-3">
      <span className="w-[3px] bg-[#1DB954] animate-eq1 origin-bottom h-full" />
      <span className="w-[3px] bg-[#1DB954] animate-eq2 origin-bottom h-full" />
      <span className="w-[3px] bg-[#1DB954] animate-eq3 origin-bottom h-full" />
    </span>
  );
}

function SpotifyNowPlaying() {
  const { data, progress } = useSpotifyNowPlaying();

  if (!data) return null;

  const progressPercent =
    data.durationMs > 0 ? (progress / data.durationMs) * 100 : 0;

  return (
    <section id="spotify" className="pt-16 border-t border-border mt-16">
      <p className="text-muted-foreground text-sm mb-4">
        <span className="text-primary">$</span> spotify --now-playing
      </p>

      <a
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-lg border border-border p-4 hover:border-[#1DB954]/50 transition-colors group"
      >
        <div className="flex items-center gap-2 mb-3">
          <EqualizerBars />
          <span className="text-[#1DB954] text-xs font-bold uppercase tracking-wider">
            Now Playing on Spotify
          </span>
        </div>

        <div className="flex items-center gap-4">
          {data.albumArt && (
            <img
              src={data.albumArt}
              alt={data.album}
              className="w-16 h-16 rounded shadow-md flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-foreground font-bold truncate group-hover:text-[#1DB954] transition-colors">
              {data.title}
            </p>
            <p className="text-muted-foreground text-sm truncate">
              {data.artist}
            </p>
            <p className="text-muted-foreground text-xs truncate">
              {data.album}
            </p>
          </div>
        </div>

        <div className="mt-3">
          <div className="w-full h-1 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1DB954] rounded-full"
              style={{
                width: `${Math.min(progressPercent, 100)}%`,
                transition: "width 1s linear",
              }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(data.durationMs)}</span>
          </div>
        </div>
      </a>
    </section>
  );
}

export default SpotifyNowPlaying;
