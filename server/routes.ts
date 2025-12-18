import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

let spotifyAccessToken: string | null = null;
let tokenExpiration: number = 0;

async function getSpotifyAccessToken(): Promise<string | null> {
  // Check if we have a valid token
  if (spotifyAccessToken && tokenExpiration > Date.now()) {
    return spotifyAccessToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.warn("Spotify credentials not configured - image fetching will be disabled");
    return null;
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    spotifyAccessToken = response.data.access_token;
    tokenExpiration = Date.now() + response.data.expires_in * 1000 - 60000; // Refresh 1 minute before expiry

    return spotifyAccessToken;
  } catch (error) {
    console.error("Error fetching Spotify access token:", error);
    return null;
  }
}

async function getArtistFromSpotify(artistName: string) {
  try {
    const token = await getSpotifyAccessToken();

    // If no token available, return basic data without images
    if (!token) {
      return {
        name: artistName,
        imageUrl: null,
        spotifyUrl: null,
        followers: 0,
        genres: [],
      };
    }

    const searchResponse = await axios.get(`${SPOTIFY_API_BASE}/search`, {
      params: {
        q: artistName,
        type: "artist",
        limit: 1,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const artists = searchResponse.data.artists?.items;
    if (!artists || artists.length === 0) {
      return {
        name: artistName,
        imageUrl: null,
        spotifyUrl: null,
        followers: 0,
        genres: [],
      };
    }

    const artist = artists[0];
    return {
      name: artist.name,
      imageUrl: artist.images[0]?.url || null,
      spotifyUrl: artist.external_urls?.spotify || null,
      followers: artist.followers?.total || 0,
      genres: artist.genres || [],
    };
  } catch (error) {
    console.error(`Error fetching Spotify data for ${artistName}:`, error);
    return {
      name: artistName,
      imageUrl: null,
      spotifyUrl: null,
      followers: 0,
      genres: [],
    };
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  app.get("/api/artists/:name", async (req, res) => {
    try {
      const artistName = decodeURIComponent(req.params.name);
      const artistData = await getArtistFromSpotify(artistName);

      if (!artistData) {
        return res.status(404).json({ error: "Artist not found" });
      }

      res.json(artistData);
    } catch (error) {
      console.error("Error in /api/artists route:", error);
      res.status(500).json({ error: "Failed to fetch artist data" });
    }
  });

  app.get("/api/search-track", async (req, res) => {
    try {
      const { title, artist } = req.query;

      if (!title || !artist) {
        return res.status(400).json({ error: "Title and artist are required" });
      }

      const token = await getSpotifyAccessToken();

      // If no token available, return basic track data without Spotify details
      if (!token) {
        const youtubeSearchUrl = `https://music.youtube.com/search?q=${encodeURIComponent(`${title} ${artist}`)}`;
        return res.json({
          name: title,
          artist: artist,
          previewUrl: null,
          spotifyUrl: null,
          youtubeUrl: youtubeSearchUrl,
          albumArt: null,
          duration: 0,
        });
      }

      const searchQuery = `track:${title} artist:${artist}`;

      const searchResponse = await axios.get(`${SPOTIFY_API_BASE}/search`, {
        params: {
          q: searchQuery,
          type: "track",
          limit: 1,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const tracks = searchResponse.data.tracks?.items;
      if (!tracks || tracks.length === 0) {
        const youtubeSearchUrl = `https://music.youtube.com/search?q=${encodeURIComponent(`${title} ${artist}`)}`;
        return res.json({
          name: title,
          artist: artist,
          previewUrl: null,
          spotifyUrl: null,
          youtubeUrl: youtubeSearchUrl,
          albumArt: null,
          duration: 0,
        });
      }

      const track = tracks[0];
      const youtubeSearchUrl = `https://music.youtube.com/search?q=${encodeURIComponent(`${track.name} ${track.artists[0]?.name || ""}`)}`;
      res.json({
        name: track.name,
        artist: track.artists[0]?.name || "Unknown",
        previewUrl: track.preview_url,
        spotifyUrl: track.external_urls?.spotify || null,
        youtubeUrl: youtubeSearchUrl,
        albumArt: track.album?.images[0]?.url || null,
        duration: Math.floor(track.duration_ms / 1000),
      });
    } catch (error) {
      console.error("Error searching track:", error);
      res.status(500).json({ error: "Failed to search for track" });
    }
  });

  return httpServer;
}
