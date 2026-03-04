import React from "react";

interface SpotifyData {
  isPlaying: boolean;
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

  React.useEffect(() => {
    let mounted = true;

    async function fetchNowPlaying() {
      try {
        const res = await fetch("/.netlify/functions/spotify-now-playing");
        const json: SpotifyData = await res.json();
        if (mounted) {
          setData(json.isPlaying ? json : null);
        }
      } catch {
        if (mounted) setData(null);
      }
    }

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30_000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return data;
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
      <span
        className="w-[3px] bg-[#1DB954] animate-eq1 origin-bottom"
        style={{ height: "100%" }}
      />
      <span
        className="w-[3px] bg-[#1DB954] animate-eq2 origin-bottom"
        style={{ height: "100%" }}
      />
      <span
        className="w-[3px] bg-[#1DB954] animate-eq3 origin-bottom"
        style={{ height: "100%" }}
      />
    </span>
  );
}

function SpotifyNowPlaying() {
  const data = useSpotifyNowPlaying();

  if (!data) return null;

  const progressPercent =
    data.durationMs > 0 ? (data.progressMs / data.durationMs) * 100 : 0;

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
              className="h-full bg-[#1DB954] rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>{formatTime(data.progressMs)}</span>
            <span>{formatTime(data.durationMs)}</span>
          </div>
        </div>
      </a>
    </section>
  );
}

export default SpotifyNowPlaying;
