import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

let spotifyAccessToken: string | null = null;
let tokenExpiration: number = 0;

async function getSpotifyAccessToken(): Promise<string> {
  // Check if we have a valid token
  if (spotifyAccessToken && tokenExpiration > Date.now()) {
    return spotifyAccessToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Spotify credentials not configured");
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
    throw new Error("Failed to authenticate with Spotify");
  }
}

async function getArtistFromSpotify(artistName: string) {
  try {
    const token = await getSpotifyAccessToken();

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
      return null;
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
    return null;
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

  return httpServer;
}
