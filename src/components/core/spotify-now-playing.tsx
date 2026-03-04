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
        className="block no-underline rounded-lg border border-border p-4 hover:border-[#1DB954]/50 transition-colors group"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <EqualizerBars />
            <span className="text-[#1DB954] text-xs font-bold uppercase tracking-wider">
              Now Playing on Spotify
            </span>
          </div>
          <svg className="w-5 h-5 fill-[#1DB954]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
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
            <p className="text-muted-foreground text-xs">
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
