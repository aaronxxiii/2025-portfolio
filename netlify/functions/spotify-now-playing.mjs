/**
 * Netlify Function (v2) — fetches the currently playing track from Spotify.
 * Uses a refresh token to obtain short-lived access tokens on each request.
 */

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
  process.env;

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

function notPlaying() {
  return new Response(JSON.stringify({ isPlaying: false }), {
    status: 200,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

export default async function handler(request) {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== "GET") {
    return new Response("Method not allowed.", {
      status: 405,
      headers: corsHeaders,
    });
  }

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    console.error("Missing required SPOTIFY_* environment variables.");
    return notPlaying();
  }

  try {
    // 1. Exchange refresh token for access token
    const tokenRes = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
          ).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: SPOTIFY_REFRESH_TOKEN,
      }),
    });

    if (!tokenRes.ok) {
      console.error("Spotify token exchange failed:", await tokenRes.text());
      return notPlaying();
    }

    const { access_token } = await tokenRes.json();

    // 2. Fetch currently playing track
    const playerRes = await fetch(NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    // 204 = nothing playing, 200 = track data
    if (playerRes.status === 204 || playerRes.status > 400) {
      return notPlaying();
    }

    const data = await playerRes.json();

    if (!data.is_playing || !data.item) {
      return notPlaying();
    }

    const track = data.item;
    const payload = {
      isPlaying: true,
      trackId: track.id,
      title: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      album: track.album.name,
      albumArt: track.album.images?.[0]?.url ?? "",
      songUrl: track.external_urls?.spotify ?? "",
      progressMs: data.progress_ms ?? 0,
      durationMs: track.duration_ms ?? 0,
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    console.error("Spotify now-playing error:", err);
    return notPlaying();
  }
}
