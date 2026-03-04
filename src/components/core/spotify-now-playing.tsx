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
    const interval = setInterval(fetchNowPlaying, 10_000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return data;
}

function SpotifyNowPlaying() {
  const data = useSpotifyNowPlaying();

  if (!data) return null;

  return (
    <section id="spotify" className="pt-16 border-t border-border mt-16">
      <p className="text-muted-foreground text-sm mb-4">
        <span className="text-primary">$</span> spotify --now-playing
      </p>
      <iframe
        src={`https://open.spotify.com/embed/track/${data.trackId}?utm_source=generator&theme=0`}
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ borderRadius: "12px" }}
      />
    </section>
  );
}

export default SpotifyNowPlaying;
